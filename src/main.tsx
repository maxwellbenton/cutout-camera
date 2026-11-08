import { render } from "preact";
import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import { zip, strToU8 } from "fflate";
import type { CutoutResult, WorkerRequest, WorkerResponse } from "./pipeline/messages.ts";
import { assignNames, summarizeText, type TextLine, type TextSummary } from "./pipeline/naming.ts";
import { IGNORE_TAGS } from "./pipeline/ignore.ts";
import "./style.css";

const MODEL_PATH = "models/yoloe-26s-seg.onnx";
const LABELS_PATH = "models/labels.json";

type Item = CutoutResult & {
  id: string;
  url: string;
  lines: TextLine[];
  text: TextSummary;
  ocr: "pending" | "done" | "off";
  name: string;
  edited: boolean;
  include: boolean;
};

type Phase = "loading" | "idle" | "working" | "done" | "error";

const appBase = new URL(".", document.baseURI).href;
const worker = new Worker(new URL("./pipeline/detect.worker.ts", import.meta.url), { type: "module" });
const send = (m: WorkerRequest, t: Transferable[] = []) => worker.postMessage(m, t);

function App() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [status, setStatus] = useState("Downloading object model…");
  const [progress, setProgress] = useState<number | null>(0);
  const [backend, setBackend] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const [minScore, setMinScore] = useState(0.25);
  const [ocrOn, setOcrOn] = useState(true);
  const [camera, setCamera] = useState(false);
  const [dragging, setDragging] = useState(false);
  const runId = useRef(0);
  const ocrCache = useRef(new Map<string, TextLine[]>());

  useEffect(() => {
    worker.onmessage = (e: MessageEvent<WorkerResponse>) => {
      const m = e.data;
      if (m.type === "progress") {
        setProgress(m.total ? m.loaded / m.total : null);
        setStatus(`Downloading object model… ${(m.loaded / 1e6).toFixed(0)} MB${m.total ? ` of ${(m.total / 1e6).toFixed(0)}` : ""}`);
      } else if (m.type === "status") setStatus(m.text);
      else if (m.type === "ready") {
        setBackend(m.backend);
        setProgress(null);
        setPhase((p) => (p === "loading" ? "idle" : p));
        setStatus("");
        void takeShared();
      } else if (m.type === "result") onResult(m.cutouts, m.preview);
      else if (m.type === "error") {
        setPhase("error");
        setStatus(m.message);
      }
    };
    send({ type: "init", appBase, modelPath: MODEL_PATH, labelsPath: LABELS_PATH });
    // Service workers only register on https or localhost; skip in dev so Vite's HMR isn't cached.
    if ("serviceWorker" in navigator && !import.meta.env.DEV) {
      navigator.serviceWorker.register("./sw.js").catch(() => {});
    }
  }, []);

  // Paste an image from the clipboard anywhere on the page.
  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      const f = [...(e.clipboardData?.files ?? [])].find((f) => f.type.startsWith("image/"));
      if (f) void analyze(f);
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  });

  async function takeShared() {
    if (!new URLSearchParams(location.search).has("shared")) return;
    const cache = await caches.open("cutout-shared");
    const res = await cache.match("./shared/0");
    await Promise.all((await cache.keys()).map((k) => cache.delete(k)));
    history.replaceState(null, "", location.pathname);
    if (res) void analyze(await res.blob());
  }

  async function analyze(file: Blob) {
    if (phase === "loading") return;
    setCamera(false);
    runId.current++;
    ocrCache.current.clear();
    items.forEach((i) => URL.revokeObjectURL(i.url));
    setItems([]);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(file));
    setPhase("working");
    setStatus("Reading photo…");
    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
    send({ type: "analyze", bitmap, minScore, ignore: IGNORE_TAGS }, [bitmap]);
  }

  function redecode(score: number) {
    setMinScore(score);
    if (phase === "done") {
      runId.current++;
      send({ type: "redecode", minScore: score, ignore: IGNORE_TAGS });
    }
  }

  function onResult(cutouts: CutoutResult[], previewBlob: Blob) {
    const run = runId.current;
    setPreview((old) => {
      if (old) URL.revokeObjectURL(old);
      return URL.createObjectURL(previewBlob);
    });
    const next: Item[] = cutouts
      .map((c, i) => {
        const key = `${c.label}@${c.box.x},${c.box.y},${c.box.w},${c.box.h}`;
        const cached = ocrCache.current.get(key);
        return {
          ...c,
          id: key + "#" + i,
          url: URL.createObjectURL(c.png),
          lines: cached ?? [],
          text: cached ? summarizeText(cached) : ({ kind: "none" } as TextSummary),
          ocr: (ocrOn ? (cached ? "done" : "pending") : "off") as Item["ocr"],
          name: "",
          edited: false,
          include: true,
        };
      })
      .sort((a, b) => b.box.w * b.box.h - a.box.w * a.box.h);
    setItems((old) => {
      old.forEach((i) => URL.revokeObjectURL(i.url));
      return rename(next);
    });
    setPhase("done");
    setStatus(cutouts.length ? "" : "No objects found — try lowering the confidence threshold.");
    if (ocrOn) void runOcr(next, run);
  }

  async function runOcr(list: Item[], run: number) {
    const todo = list.filter((i) => i.ocr === "pending");
    if (!todo.length) return;
    setStatus("Loading text reader…");
    // Lazy: the OCR SDK bundles OpenCV (~10 MB), so only fetch it when needed.
    const { loadOcr, readCutoutText } = await import("./pipeline/ocr.ts");
    let ocr;
    try {
      ocr = await loadOcr(appBase);
    } catch (err) {
      setStatus(`Text reader unavailable: ${err instanceof Error ? err.message : err}`);
      setItems((cur) => cur.map((i) => ({ ...i, ocr: "off" })));
      return;
    }
    // Small objects first: they finish fast and are where short names come from.
    const order = [...todo].sort((a, b) => a.box.w * a.box.h - b.box.w * b.box.h);
    let n = 0;
    for (const it of order) {
      if (run !== runId.current) return;
      setStatus(`Reading text ${++n}/${order.length}…`);
      let lines: TextLine[] = [];
      try {
        lines = await readCutoutText(ocr, it);
      } catch {
        /* one bad crop shouldn't stop the rest */
      }
      ocrCache.current.set(it.id.split("#")[0], lines);
      if (run !== runId.current) return;
      setItems((cur) =>
        rename(cur.map((c) => (c.id === it.id ? { ...c, lines, text: summarizeText(lines), ocr: "done" } : c))),
      );
    }
    setStatus("");
  }

  const included = items.filter((i) => i.include);
  const counts = useMemo(() => {
    const m = new Map<string, number>();
    items.forEach((i) => m.set(i.label, (m.get(i.label) ?? 0) + 1));
    return [...m].sort((a, b) => b[1] - a[1]);
  }, [items]);

  async function downloadZip() {
    const files: Record<string, [Uint8Array, { level: 0 | 6 }]> = {};
    for (const it of included) {
      files[`${it.name}.png`] = [new Uint8Array(await it.png.arrayBuffer()), { level: 0 }];
      if (it.text.kind === "long") files[`${it.name}.txt`] = [strToU8(it.text.text + "\n"), { level: 6 }];
    }
    files["cutouts.json"] = [strToU8(JSON.stringify(manifest(included), null, 2)), { level: 6 }];
    const data = await new Promise<Uint8Array>((res, rej) => zip(files, (err, out) => (err ? rej(err) : res(out))));
    saveBlob(new Blob([data as BlobPart], { type: "application/zip" }), `cutouts-${stamp()}.zip`);
  }

  async function share() {
    const files: File[] = [];
    for (const it of included) {
      files.push(new File([it.png], `${it.name}.png`, { type: "image/png" }));
      if (it.text.kind === "long") files.push(new File([it.text.text], `${it.name}.txt`, { type: "text/plain" }));
    }
    if (navigator.canShare?.({ files })) {
      await navigator.share({ files }).catch(() => {});
    } else {
      await downloadZip();
    }
  }

  const busy = phase === "loading" || phase === "working";
  const canShareFiles = typeof navigator.canShare === "function";

  return (
    <main
      class={dragging ? "dragging" : ""}
      onDragOver={(e) => (e.preventDefault(), setDragging(true))}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        const f = [...(e.dataTransfer?.files ?? [])].find((f) => f.type.startsWith("image/"));
        if (f) void analyze(f);
      }}
    >
      <header>
        <h1>Cutout Camera</h1>
        <p class="sub">Every object in a photo, as its own transparent PNG.</p>
      </header>

      <section class="actions">
        <button class="primary" disabled={busy} onClick={() => setCamera(true)}>
          Camera
        </button>
        <label class={"button" + (busy ? " disabled" : "")}>
          Choose photo
          <input
            type="file"
            accept="image/*"
            hidden
            disabled={busy}
            onChange={(e) => {
              const f = e.currentTarget.files?.[0];
              e.currentTarget.value = "";
              if (f) void analyze(f);
            }}
          />
        </label>
      </section>

      <details class="settings">
        <summary>Settings</summary>
        <label>
          Confidence <b>{minScore.toFixed(2)}</b>
          <input
            type="range"
            min="0.05"
            max="0.8"
            step="0.05"
            value={minScore}
            onChange={(e) => redecode(Number(e.currentTarget.value))}
          />
        </label>
        <label class="check">
          <input type="checkbox" checked={ocrOn} onChange={(e) => setOcrOn(e.currentTarget.checked)} /> Read text on
          objects
        </label>
        {backend && <p class="muted">Running on {backend === "webgpu" ? "GPU (WebGPU)" : "CPU (WebAssembly)"}</p>}
      </details>

      {(status || progress !== null) && (
        <div class={"status" + (phase === "error" ? " error" : "")}>
          {busy && <span class="spinner" />}
          <span>{status}</span>
          {progress !== null && progress > 0 && <progress value={progress} />}
        </div>
      )}

      {phase === "idle" && !items.length && <p class="hint">Take a photo, choose one, drop one here, or paste one.</p>}

      {preview && (
        <figure class="preview">
          <img src={preview} alt="Analyzed photo with detected objects highlighted" />
          {counts.length > 0 && (
            <figcaption>
              {counts.map(([label, n]) => (
                <span class="chip">
                  {label}
                  {n > 1 && <b> ×{n}</b>}
                </span>
              ))}
            </figcaption>
          )}
        </figure>
      )}

      {items.length > 0 && (
        <>
          <section class="bar">
            <span>
              {included.length} of {items.length} selected
            </span>
            <button onClick={() => setItems(items.map((i) => ({ ...i, include: included.length !== items.length })))}>
              {included.length === items.length ? "Select none" : "Select all"}
            </button>
            {canShareFiles && (
              <button disabled={!included.length} onClick={share}>
                Share
              </button>
            )}
            <button class="primary" disabled={!included.length} onClick={downloadZip}>
              Download .zip
            </button>
          </section>

          <section class="grid">
            {items.map((it) => (
              <article class={"card" + (it.include ? "" : " off")} key={it.id}>
                <div class="thumb" onClick={() => toggle(it.id)}>
                  <img src={it.url} alt={it.label} loading="lazy" />
                  <input type="checkbox" checked={it.include} onClick={(e) => e.stopPropagation()} onChange={() => toggle(it.id)} />
                </div>
                <div class="meta">
                  <input
                    class="name"
                    value={it.name}
                    aria-label="File name"
                    onChange={(e) => editName(it.id, e.currentTarget.value)}
                  />
                  <span class="ext">.png{it.text.kind === "long" && " + .txt"}</span>
                  <div class="facts">
                    <span>{it.label}</span>
                    <span>{Math.round(it.score * 100)}%</span>
                    <span>
                      {it.box.w}×{it.box.h}
                    </span>
                  </div>
                  {it.ocr === "pending" && <div class="text muted">reading text…</div>}
                  {it.text.kind !== "none" && (
                    <div class="text" title={textOf(it)}>
                      “{textOf(it).length > 120 ? textOf(it).slice(0, 120) + "…" : textOf(it)}”
                    </div>
                  )}
                  <button class="small" onClick={() => saveBlob(it.png, `${it.name}.png`)}>
                    Save PNG
                  </button>
                  {it.text.kind === "long" && (
                    <button class="small" onClick={() => saveBlob(new Blob([textOf(it)]), `${it.name}.txt`)}>
                      Save .txt
                    </button>
                  )}
                </div>
              </article>
            ))}
          </section>
        </>
      )}

      {camera && <Camera onCapture={(b) => void analyze(b)} onClose={() => setCamera(false)} />}
    </main>
  );

  function toggle(id: string) {
    setItems(items.map((i) => (i.id === id ? { ...i, include: !i.include } : i)));
  }
  function editName(id: string, raw: string) {
    const name = raw.replace(/[\\/:*?"<>|]+/g, "-").trim() || "object";
    setItems(items.map((i) => (i.id === id ? { ...i, name, edited: true } : i)));
  }
}

const textOf = (it: Item) => (it.text.kind === "none" ? "" : it.text.text);

/** Recompute automatic names (manually edited names are left alone). */
function rename(list: Item[]): Item[] {
  const names = assignNames(list);
  return list.map((it, i) => (it.edited ? it : { ...it, name: names[i] }));
}

function manifest(list: Item[]) {
  return list.map((i) => ({
    file: `${i.name}.png`,
    textFile: i.text.kind === "long" ? `${i.name}.txt` : undefined,
    label: i.label,
    confidence: Number(i.score.toFixed(3)),
    box: i.box,
    text: i.text.kind === "none" ? undefined : i.text.text,
  }));
}

function Camera({ onCapture, onClose }: { onCapture: (b: Blob) => void; onClose: () => void }) {
  const video = useRef<HTMLVideoElement>(null);
  const stream = useRef<MediaStream | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    navigator.mediaDevices
      ?.getUserMedia({
        video: { facingMode: { ideal: "environment" }, width: { ideal: 4096 }, height: { ideal: 3072 } },
        audio: false,
      })
      .then((s) => {
        stream.current = s;
        if (video.current) video.current.srcObject = s;
      })
      .catch((e) => setError(e instanceof Error ? e.message : String(e)));
    return () => stream.current?.getTracks().forEach((t) => t.stop());
  }, []);

  async function capture() {
    const track = stream.current?.getVideoTracks()[0];
    // ImageCapture.takePhoto gives full sensor resolution where supported (Chrome/Android).
    const IC = (window as any).ImageCapture;
    if (track && IC) {
      try {
        const blob: Blob = await new IC(track).takePhoto();
        return onCapture(blob);
      } catch {
        /* fall back to a video frame */
      }
    }
    const v = video.current!;
    const c = document.createElement("canvas");
    c.width = v.videoWidth;
    c.height = v.videoHeight;
    c.getContext("2d")!.drawImage(v, 0, 0);
    c.toBlob((b) => b && onCapture(b), "image/jpeg", 0.95);
  }

  return (
    <div class="camera">
      {error ? <p class="status error">Camera unavailable: {error}</p> : <video ref={video} autoplay playsInline muted />}
      <div class="camera-controls">
        <button onClick={onClose}>Cancel</button>
        <button class="shutter" aria-label="Take photo" disabled={!!error} onClick={capture} />
        <span />
      </div>
    </div>
  );
}

function saveBlob(blob: Blob, filename: string) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}

function stamp() {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}`;
}

render(<App />, document.getElementById("app")!);
