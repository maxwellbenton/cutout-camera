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
  const [minScore, setMinScore] = useState(0.3);
  const [ocrOn, setOcrOn] = useState(true);
  const [camera, setCamera] = useState(false);
  const [dragging, setDragging] = useState(false);
  const currentRun = useRef(-1);
  // Edits survive a re-decode (threshold change) when the same object comes back.
  const keep = useRef(new Map<string, Pick<Item, "name" | "edited" | "include" | "lines" | "text" | "ocr">>());

  useEffect(() => {
    worker.onmessage = (e: MessageEvent<WorkerResponse>) => {
      const m = e.data;
      switch (m.type) {
        case "progress":
          setProgress(m.total ? m.loaded / m.total : null);
          setStatus(`Downloading object model… ${mb(m.loaded)}${m.total ? ` of ${mb(m.total)}` : ""}`);
          break;
        case "status":
          setStatus(m.text);
          break;
        case "ready":
          setBackend(m.backend);
          setProgress(null);
          setPhase((p) => (p === "loading" ? "idle" : p));
          setStatus("");
          void takeShared();
          break;
        case "result":
          currentRun.current = m.run;
          onResult(m.cutouts, m.preview);
          break;
        case "text":
          if (m.run !== currentRun.current) return;
          setItems((cur) =>
            rename(cur.map((c) => (c.key === m.key ? { ...c, lines: m.lines, text: summarizeText(m.lines), ocr: "done" } : c))),
          );
          break;
        case "text-done":
          if (m.run !== currentRun.current) return;
          setItems((cur) => cur.map((c) => (c.ocr === "pending" ? { ...c, ocr: "off" } : c)));
          setStatus(m.error ? `Text reader unavailable: ${m.error}` : "");
          break;
        case "error":
          setPhase("error");
          setStatus(m.message);
          break;
      }
    };
    // ?backend=wasm (or webgpu) forces a runtime, useful if a GPU driver misbehaves.
    const forced = new URLSearchParams(location.search).get("backend");
    send({
      type: "init",
      appBase,
      modelPath: MODEL_PATH,
      labelsPath: LABELS_PATH,
      backend: forced === "wasm" || forced === "webgpu" ? forced : undefined,
    });
    // Not in dev, so Vite's hot reload isn't cached.
    if ("serviceWorker" in navigator && !import.meta.env.DEV) {
      navigator.serviceWorker.register("./sw.js").catch(() => {});
    }
  }, []);

  // Remember per-object state so a threshold change doesn't lose edits or text.
  useEffect(() => {
    for (const it of items) keep.current.set(it.key, it);
  }, [items]);

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
    keep.current.clear();
    setItems((old) => (old.forEach((i) => URL.revokeObjectURL(i.url)), []));
    setPreview((old) => (old && URL.revokeObjectURL(old), URL.createObjectURL(file)));
    setPhase("working");
    setStatus("Reading photo…");
    try {
      const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
      send({ type: "analyze", bitmap, minScore, ignore: IGNORE_TAGS, ocr: ocrOn }, [bitmap]);
    } catch {
      setPhase("error");
      setStatus("Couldn't read that image. (HEIC photos may need converting to JPEG first.)");
    }
  }

  function redecode(score: number) {
    setMinScore(score);
    if (phase === "done") send({ type: "redecode", minScore: score, ignore: IGNORE_TAGS, ocr: ocrOn });
  }

  function onResult(cutouts: CutoutResult[], previewBlob: Blob) {
    setPreview((old) => (old && URL.revokeObjectURL(old), URL.createObjectURL(previewBlob)));
    const next: Item[] = cutouts
      .map((c) => {
        const prev = keep.current.get(c.key);
        return {
          ...c,
          url: URL.createObjectURL(c.png),
          lines: prev?.lines ?? [],
          text: prev?.text ?? ({ kind: "none" } as TextSummary),
          ocr: prev?.ocr === "done" ? "done" : ocrOn ? "pending" : "off",
          name: prev?.name ?? "",
          edited: prev?.edited ?? false,
          include: prev?.include ?? true,
        } as Item;
      })
      .sort((a, b) => b.box.w * b.box.h - a.box.w * a.box.h);
    setItems((old) => (old.forEach((i) => URL.revokeObjectURL(i.url)), rename(next)));
    setPhase("done");
    setStatus(cutouts.length ? "" : "No objects found. Try lowering the confidence in Settings.");
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
    if (navigator.canShare?.({ files })) await navigator.share({ files }).catch(() => {});
    else await downloadZip();
  }

  const busy = phase === "loading" || phase === "working";
  const reading = items.some((i) => i.ocr === "pending");

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
          {(busy || reading) && <span class="spinner" />}
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
                <span class="chip" key={label}>
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
            {typeof navigator.canShare === "function" && (
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
              <article class={"card" + (it.include ? "" : " off")} key={it.key}>
                <div class="thumb" onClick={() => toggle(it.key)}>
                  <img src={it.url} alt={it.label} loading="lazy" />
                  <input
                    type="checkbox"
                    checked={it.include}
                    onClick={(e) => e.stopPropagation()}
                    onChange={() => toggle(it.key)}
                  />
                </div>
                <div class="meta">
                  <input class="name" value={it.name} aria-label="File name" onChange={(e) => editName(it.key, e.currentTarget.value)} />
                  <span class="ext">.png{it.text.kind === "long" && " + .txt"}</span>
                  <div class="facts">
                    <span>{it.label}</span>
                    <span>{Math.round(it.score * 100)}%</span>
                    <span>
                      {it.box.w}×{it.box.h}
                    </span>
                  </div>
                  {it.ocr === "pending" && <div class="text muted">reading text…</div>}
                  {textOf(it) && (
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

  function toggle(key: string) {
    setItems(items.map((i) => (i.key === key ? { ...i, include: !i.include } : i)));
  }
  function editName(key: string, raw: string) {
    const name = raw.replace(/[\\/:*?"<>|]+/g, "-").trim() || "object";
    setItems(items.map((i) => (i.key === key ? { ...i, name, edited: true } : i)));
  }
}

const textOf = (it: Item) => (it.text.kind === "none" ? "" : it.text.text);
const mb = (n: number) => `${(n / 1e6).toFixed(0)} MB`;

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
        return onCapture(await new IC(track).takePhoto());
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
