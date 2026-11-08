/// <reference lib="webworker" />
// Everything heavy happens here, off the UI thread:
//   1. load the detector (YOLOE-26 seg, ONNX) — WebGPU if available, else WASM
//   2. detect + build alpha mattes + encode one transparent PNG per object
//   3. read text on each object (PP-OCRv5) and stream results back
import * as ort from "onnxruntime-web";
import {
  buildAlpha,
  decodeDetections,
  defaultDecodeOptions,
  isWholeFrame,
  letterbox,
  trimToAlpha,
  type Letterbox,
  type MaskedDetection,
} from "./detector.ts";
import { loadOcr, readText, MIN_CROP_SIDE } from "./ocr.ts";
import type { TextLine } from "./naming.ts";
import type { WorkerRequest, WorkerResponse, CutoutResult } from "./messages.ts";

declare const self: DedicatedWorkerGlobalScope;

/** Longest side we work at. Phone photos are ~4000px; this keeps memory sane. */
const MAX_SIDE = 3072;
const PREVIEW_SIDE = 1280;

let appBase = "";
let session: ort.InferenceSession | null = null;
let labels: string[] = [];
let inputSize = 640;
let backend = "";
let run = 0;

// Kept from the last inference so threshold changes don't need a new one.
let last: {
  src: ImageData;
  lb: Letterbox;
  out: { data: Float32Array; dims: readonly number[] };
  protos: { data: Float32Array; dims: readonly number[] };
} | null = null;
// OCR results by cutout key, for the current photo.
const textCache = new Map<string, TextLine[]>();

const post = (msg: WorkerResponse, transfer: Transferable[] = []) => self.postMessage(msg, transfer);

self.onmessage = async (e: MessageEvent<WorkerRequest>) => {
  const msg = e.data;
  try {
    if (msg.type === "init") await init(msg.appBase, msg.modelPath, msg.labelsPath, msg.backend);
    else if (msg.type === "analyze") await analyze(msg.bitmap, msg.minScore, msg.ignore, msg.ocr);
    else if (msg.type === "redecode") await finish(++run, msg.minScore, msg.ignore, msg.ocr);
  } catch (err) {
    post({ type: "error", message: err instanceof Error ? err.message : String(err) });
  }
};

async function init(base: string, modelPath: string, labelsPath: string, force?: "webgpu" | "wasm") {
  if (session) return post({ type: "ready", backend, classes: labels.length });
  appBase = base;
  // Shared by the detector and the OCR library (same onnxruntime-web instance).
  ort.env.wasm.wasmPaths = new URL("ort/", appBase).href;
  ort.env.logLevel = "error";

  const [model, names] = await Promise.all([
    fetchWithProgress(new URL(modelPath, appBase).href),
    fetch(new URL(labelsPath, appBase).href).then((r) => r.json() as Promise<string[]>),
  ]);
  labels = names;

  const hasGpu = "gpu" in navigator && !!(await (navigator as any).gpu.requestAdapter().catch(() => null));
  const order = force ? [force] : hasGpu ? ["webgpu", "wasm"] : ["wasm"];
  let lastErr: unknown;
  for (const ep of order) {
    try {
      post({ type: "status", text: `Starting model (${ep})…` });
      session = await ort.InferenceSession.create(model, { executionProviders: [ep], graphOptimizationLevel: "all" });
      backend = ep;
      break;
    } catch (err) {
      lastErr = err;
    }
  }
  if (!session) throw lastErr;
  const dims = (session.inputMetadata?.[0] as any)?.shape as number[] | undefined;
  if (dims && typeof dims[2] === "number") inputSize = dims[2];
  post({ type: "ready", backend, classes: labels.length });
}

async function fetchWithProgress(url: string): Promise<Uint8Array> {
  const res = await fetch(url);
  if (!res.ok || !res.body) throw new Error(`Could not download model (${res.status})`);
  const total = Number(res.headers.get("content-length")) || 0;
  const reader = res.body.getReader();
  const chunks: Uint8Array[] = [];
  let loaded = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    loaded += value.length;
    post({ type: "progress", loaded, total });
  }
  const buf = new Uint8Array(loaded);
  let o = 0;
  for (const c of chunks) (buf.set(c, o), (o += c.length));
  return buf;
}

async function analyze(bitmap: ImageBitmap, minScore: number, ignore: string[], ocr: boolean) {
  if (!session) throw new Error("Model not loaded");
  const myRun = ++run;
  textCache.clear();
  const t0 = performance.now();

  const s = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  const w = Math.round(bitmap.width * s);
  const h = Math.round(bitmap.height * s);
  const canvas = new OffscreenCanvas(w, h);
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();
  const src = ctx.getImageData(0, 0, w, h);

  post({ type: "status", text: "Finding objects…" });
  const lb = letterbox(src.data, w, h, inputSize);
  const input = new ort.Tensor("float32", lb.tensor, [1, 3, inputSize, inputSize]);
  const results = await session.run({ [session.inputNames[0]]: input });
  const [outName, protoName] = session.outputNames;
  const out = results[outName];
  const protos = results[protoName];
  last = {
    src,
    lb,
    out: { data: (await out.getData()) as Float32Array, dims: out.dims },
    protos: { data: (await protos.getData()) as Float32Array, dims: protos.dims },
  };
  post({ type: "status", text: `Found objects in ${Math.round(performance.now() - t0)} ms — cutting out…` });
  await finish(myRun, minScore, ignore, ocr);
}

async function finish(myRun: number, minScore: number, ignore: string[], ocr: boolean) {
  if (!last) return;
  const { src, lb, out, protos } = last;
  const masked = decodeDetections(out.data, out.dims, lb, src.width, src.height, labels, {
    ...defaultDecodeOptions,
    minScore,
    ignore: new Set(ignore),
  })
    .map((d) => trimToAlpha(buildAlpha(d, protos.data, protos.dims, lb)))
    .filter((d) => d.fill > 0.04) // empty mask → bad box
    .filter((d) => !isWholeFrame(d, src.width, src.height)); // "the photo itself"

  const cutouts: CutoutResult[] = [];
  for (const d of masked) {
    cutouts.push({
      key: keyOf(d),
      label: d.label,
      classId: d.classId,
      score: d.score,
      box: d.box,
      fill: d.fill,
      png: await cutoutPng(src, d),
    });
  }
  const preview = await overlay(src, masked);
  if (myRun !== run) return;
  post({ type: "result", run: myRun, width: src.width, height: src.height, cutouts, preview });

  if (ocr) await readAll(myRun, src, masked);
}

async function readAll(myRun: number, src: ImageData, dets: MaskedDetection[]) {
  const todo = dets.filter((d) => Math.min(d.box.w, d.box.h) >= MIN_CROP_SIDE);
  for (const d of dets) if (!todo.includes(d)) post({ type: "text", run: myRun, key: keyOf(d), lines: [] });
  if (!todo.length) return post({ type: "text-done", run: myRun });

  let service;
  try {
    post({ type: "status", text: "Loading text reader…" });
    // The PP-OCR graphs hit unsupported WebGPU kernels; WASM is reliable and quick for crops.
    service = await loadOcr(appBase, ["wasm"]);
  } catch (err) {
    return post({ type: "text-done", run: myRun, error: err instanceof Error ? err.message : String(err) });
  }

  // Small objects first: they're quick, and they're where short names come from.
  todo.sort((a, b) => a.box.w * a.box.h - b.box.w * b.box.h);
  for (const [i, d] of todo.entries()) {
    if (myRun !== run) return;
    const key = keyOf(d);
    let lines = textCache.get(key);
    if (!lines) {
      post({ type: "status", text: `Reading text ${i + 1}/${todo.length}…` });
      try {
        const { canvas, offsetX, offsetY } = rectCrop(src, d);
        lines = await readText(service, canvas, offsetX, offsetY, d.alpha, d.box.w, d.box.h);
      } catch {
        lines = []; // one bad crop shouldn't stop the rest
      }
      textCache.set(key, lines);
    }
    if (myRun !== run) return;
    post({ type: "text", run: myRun, key, lines });
  }
  post({ type: "text-done", run: myRun });
}

const keyOf = (d: MaskedDetection) => `${d.label}@${d.box.x},${d.box.y},${d.box.w},${d.box.h}`;

/** Source pixels inside the box with the mask as alpha → PNG. */
async function cutoutPng(src: ImageData, d: MaskedDetection): Promise<Blob> {
  const { x, y, w, h } = d.box;
  const px = new Uint8ClampedArray(w * h * 4);
  for (let r = 0; r < h; r++) {
    const so = ((y + r) * src.width + x) * 4;
    px.set(src.data.subarray(so, so + w * 4), r * w * 4);
  }
  for (let i = 0; i < w * h; i++) px[i * 4 + 3] = d.alpha[i];
  const c = new OffscreenCanvas(w, h);
  c.getContext("2d")!.putImageData(new ImageData(px, w, h), 0, 0);
  return c.convertToBlob({ type: "image/png" });
}

/** Plain rectangular crop with a little padding, so letters at the mask edge survive OCR. */
function rectCrop(src: ImageData, d: MaskedDetection) {
  const pad = Math.round(Math.max(d.box.w, d.box.h) * 0.03);
  const x = Math.max(0, d.box.x - pad);
  const y = Math.max(0, d.box.y - pad);
  const w = Math.min(src.width - x, d.box.w + pad * 2);
  const h = Math.min(src.height - y, d.box.h + pad * 2);
  const canvas = new OffscreenCanvas(w, h);
  canvas.getContext("2d", { willReadFrequently: true })!.putImageData(src, -x, -y, x, y, w, h);
  return { canvas, offsetX: d.box.x - x, offsetY: d.box.y - y };
}

/** Downscaled photo with each mask tinted, for the results header. */
async function overlay(src: ImageData, dets: MaskedDetection[]): Promise<Blob> {
  const s = Math.min(1, PREVIEW_SIDE / Math.max(src.width, src.height));
  const full = new OffscreenCanvas(src.width, src.height);
  full.getContext("2d")!.putImageData(src, 0, 0);
  const c = new OffscreenCanvas(Math.round(src.width * s), Math.round(src.height * s));
  const ctx = c.getContext("2d")!;
  ctx.drawImage(full, 0, 0, c.width, c.height);

  // Paint larger objects first so small ones stay visible on top.
  const order = dets.map((d, i) => ({ d, i })).sort((a, b) => b.d.box.w * b.d.box.h - a.d.box.w * a.d.box.h);
  for (const { d, i } of order) {
    const [r, g, b] = hue(i);
    const m = new OffscreenCanvas(d.box.w, d.box.h);
    const px = new Uint8ClampedArray(d.box.w * d.box.h * 4);
    for (let k = 0; k < d.alpha.length; k++) {
      px[k * 4] = r; px[k * 4 + 1] = g; px[k * 4 + 2] = b; px[k * 4 + 3] = d.alpha[k] * 0.45;
    }
    m.getContext("2d")!.putImageData(new ImageData(px, d.box.w, d.box.h), 0, 0);
    ctx.drawImage(m, d.box.x * s, d.box.y * s, d.box.w * s, d.box.h * s);
    ctx.strokeStyle = `rgb(${r},${g},${b})`;
    ctx.lineWidth = 2;
    ctx.strokeRect(d.box.x * s, d.box.y * s, d.box.w * s, d.box.h * s);
  }
  return c.convertToBlob({ type: "image/jpeg", quality: 0.85 });
}

function hue(i: number): [number, number, number] {
  const h = (i * 137.508) % 360;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    return Math.round(255 * (0.55 - 0.45 * Math.max(-1, Math.min(k - 3, 9 - k, 1))));
  };
  return [f(0), f(8), f(4)];
}
