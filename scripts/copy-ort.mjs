// Copies ONNX Runtime Web's wasm + loader files into public/ort so the app
// (and the OCR SDK) load them from our own origin. That keeps the PWA working
// offline once the service worker has cached them.
import { cpSync, mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";

const src = join("node_modules", "onnxruntime-web", "dist");
const dest = join("public", "ort");
mkdirSync(dest, { recursive: true });

const wanted = readdirSync(src).filter((f) =>
  /^ort-wasm-simd-threaded(\.jsep)?\.(mjs|wasm)$/.test(f),
);
for (const f of wanted) cpSync(join(src, f), join(dest, f));
console.log(`copy-ort: ${wanted.length} files → ${dest}`);
