/// <reference lib="webworker" />
// Runs the detector off the main thread: model load, inference, alpha mattes
// and PNG encoding all happen here.
import * as ort from "onnxruntime-web/webgpu";
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
import type { WorkerRequest, WorkerResponse, CutoutResult } from "./messages.ts";

declare const self: DedicatedWorkerGlobalScope;

/** Longest side we work at. Phone photos are ~4000px; this keeps memory sane. */
const MAX_SIDE = 3072;
const PREVIEW_SIDE = 1280;

let session: ort.InferenceSession | null = null;
let labels: string[] = [];
let inputSize = 640;
let backend = "";

// Kept from the last run so threshold changes don't need a new inference.
let last: {
  src: ImageData;
  lb: Letterbox;
  out: { data: Float32Array; dims: readonly number[] };
  protos: { data: Float32Array; dims: readonly number[] };
} | null = null;

const post = (msg: WorkerResponse, transfer: Transferable[] = []) => self.postMessage(msg, transfer);

self.onmessage = async (e: MessageEvent<WorkerRequest>) => {
  const msg = e.data;
  try {
    if (msg.type === "init") await init(msg.appBase, msg.modelPath, msg.labelsPath);
    else if (msg.type === "analyze") await analyze(msg.bitmap, msg.minScore, msg.ignore);
    else if (msg.type === "redecode") await finish(msg.minScore, msg.ignore);
  } catch (err) {
    post({ type: "error", message: err instanceof Error ? err.message : String(err) });
  }
};

async function init(appBase: string, modelPath: string, labelsPath: string) {
  if (session) return post({ type: "ready", backend, classes: labels.length });
  ort.env.wasm.wasmPaths = new URL("ort/", appBase).href;
  ort.env.logLevel = "error";

  const [model, names] = await Promise.all([
    fetchWithProgress(new URL(modelPath, appBase).href),
    fetch(new URL(labelsPath, appBase).href).then((r) => r.json() as Promise<string[]>),
  ]);
  labels = names;

  const hasGpu = "gpu" in navigator && !!(await (navigator as any).gpu.requestAdapter().catch(() => null));
  const attempts: string[][] = hasGpu ? [["webgpu"], ["wasm"]] : [["wasm"]];
  let lastErr: unknown;
  for (const providers of attempts) {
    try {
      post({ type: "status", text: `Starting model (${providers[0]})…` });
      session = await ort.InferenceSession.create(model, {
        executionProviders: providers,
        graphOptimizationLevel: "all",
      });
      backend = providers[0];
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

async function analyze(bitmap: ImageBitmap, minScore: number, ignore: string[]) {
  if (!session) throw new Error("Model not loaded");
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
  post({ type: "status", text: `Inference ${Math.round(performance.now() - t0)} ms — cutting out…` });
  await finish(minScore, ignore);
}

async function finish(minScore: number, ignore: string[], keepWholeFrame = false) {
  if (!last) return;
  const { src, lb, out, protos } = last;
  const raw = decodeDetections(out.data, out.dims, lb, src.width, src.height, labels, {
    ...defaultDecodeOptions,
    minScore,
    ignore: new Set(ignore),
  });

  const masked = raw
    .map((d) => trimToAlpha(buildAlpha(d, protos.data, protos.dims, lb)))
    // Drop detections whose mask is basically empty — usually a bad box.
    .filter((d) => d.fill > 0.04)
    .filter((d) => keepWholeFrame || !isWholeFrame(d, src.width, src.height));

  const cutouts: CutoutResult[] = [];
  const transfer: Transferable[] = [];
  for (const d of masked) {
    const png = await cutoutPng(src, d);
    const crop = await rectCrop(src, d);
    cutouts.push({
      label: d.label,
      classId: d.classId,
      score: d.score,
      box: d.box,
      fill: d.fill,
      alpha: d.alpha,
      png,
      crop,
    });
    transfer.push(d.alpha.buffer);
  }

  const preview = await overlay(src, masked);
  post({ type: "result", width: src.width, height: src.height, cutouts, preview }, transfer);
}

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

/** Plain rectangular crop (a little padding) for OCR — text near mask edges survives. */
async function rectCrop(src: ImageData, d: MaskedDetection): Promise<Blob> {
  const pad = Math.round(Math.max(d.box.w, d.box.h) * 0.03);
  const x = Math.max(0, d.box.x - pad);
  const y = Math.max(0, d.box.y - pad);
  const w = Math.min(src.width - x, d.box.w + pad * 2);
  const h = Math.min(src.height - y, d.box.h + pad * 2);
  const c = new OffscreenCanvas(w, h);
  c.getContext("2d")!.putImageData(src, -x, -y, x, y, w, h);
  return c.convertToBlob({ type: "image/jpeg", quality: 0.92 });
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

export function hue(i: number): [number, number, number] {
  const h = (i * 137.508) % 360;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    return Math.round(255 * (0.55 - 0.45 * Math.max(-1, Math.min(k - 3, 9 - k, 1))));
  };
  return [f(0), f(8), f(4)];
}
