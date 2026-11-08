// Runs the same detection + cutout code the browser uses, under Node, on real
// photos. Handy for tuning thresholds without a phone.
//
//   ONNXRUNTIME_NODE_INSTALL=skip npm i -D onnxruntime-node sharp
//   node scripts/node-check.mjs photo1.jpg photo2.jpg --out check-out --score 0.25
import * as ort from "onnxruntime-node";
import sharp from "sharp";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, extname, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  letterbox,
  decodeDetections,
  buildAlpha,
  trimToAlpha,
  isWholeFrame,
  defaultDecodeOptions,
} from "../src/pipeline/detector.ts";
import { assignNames } from "../src/pipeline/naming.ts";
import { IGNORE_TAGS } from "../src/pipeline/ignore.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const opt = (name, def) => {
  const i = args.indexOf(name);
  if (i < 0) return def;
  const v = args[i + 1];
  args.splice(i, 2);
  return v;
};
const outDir = opt("--out", "check-out");
const minScore = Number(opt("--score", "0.25"));
const modelPath = opt("--model", join(root, "public/models/yoloe-26s-seg.onnx"));
const labels = JSON.parse(readFileSync(opt("--labels", join(root, "public/models/labels.json")), "utf8"));
const session = await ort.InferenceSession.create(modelPath);
const size = session.inputMetadata?.[0]?.shape?.[2] ?? 640;

for (const file of args) {
  const { data, info } = await sharp(file)
    .rotate()
    .resize({ width: 3072, height: 3072, fit: "inside", withoutEnlargement: true })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;

  const t0 = performance.now();
  const lb = letterbox(data, w, h, size);
  const res = await session.run({ images: new ort.Tensor("float32", lb.tensor, [1, 3, size, size]) });
  const t1 = performance.now();
  const raw = decodeDetections(res.output0.data, res.output0.dims, lb, w, h, labels, {
    ...defaultDecodeOptions,
    minScore,
    ignore: new Set(IGNORE_TAGS),
  });
  const dets = raw
    .map((d) => trimToAlpha(buildAlpha(d, res.output1.data, res.output1.dims, lb)))
    .filter((d) => d.fill > 0.04)
    .filter((d) => !isWholeFrame(d, w, h));
  const t2 = performance.now();

  const names = assignNames(dets.map((d) => ({ label: d.label, box: d.box, text: { kind: "none" } })));
  const dir = join(outDir, basename(file, extname(file)));
  mkdirSync(dir, { recursive: true });

  const overlays = [];
  for (const [i, d] of dets.entries()) {
    const { x, y, w: bw, h: bh } = d.box;
    const px = Buffer.alloc(bw * bh * 4);
    for (let r = 0; r < bh; r++) data.copy(px, r * bw * 4, ((y + r) * w + x) * 4, ((y + r) * w + x + bw) * 4);
    for (let k = 0; k < bw * bh; k++) px[k * 4 + 3] = d.alpha[k];
    await sharp(px, { raw: { width: bw, height: bh, channels: 4 } }).png().toFile(join(dir, `${names[i]}.png`));

    const tint = Buffer.alloc(bw * bh * 4);
    const [cr, cg, cb] = [(i * 97) % 255, (i * 57 + 120) % 255, (i * 151 + 60) % 255];
    for (let k = 0; k < bw * bh; k++) {
      tint[k * 4] = cr; tint[k * 4 + 1] = cg; tint[k * 4 + 2] = cb; tint[k * 4 + 3] = d.alpha[k] * 0.5;
    }
    overlays.push({ input: await sharp(tint, { raw: { width: bw, height: bh, channels: 4 } }).png().toBuffer(), left: x, top: y });
  }
  const composed = await sharp(data, { raw: { width: w, height: h, channels: 4 } }).composite(overlays).png().toBuffer();
  await sharp(composed)
    .resize({ width: 1024, height: 1024, fit: "inside" })
    .jpeg({ quality: 80 })
    .toFile(join(dir, "_overlay.jpg"));

  const summary = dets.map((d, i) => ({
    file: `${names[i]}.png`,
    label: d.label,
    score: +d.score.toFixed(3),
    box: d.box,
    fill: +d.fill.toFixed(2),
  }));
  writeFileSync(join(dir, "_summary.json"), JSON.stringify(summary, null, 2));
  console.log(
    `\n${basename(file)} ${w}×${h} — inference ${(t1 - t0).toFixed(0)} ms, masks ${(t2 - t1).toFixed(0)} ms, ${dets.length} objects` +
      ` (raw above threshold: ${raw.length})`,
  );
  for (const s of summary) console.log(`  ${s.score.toFixed(2)}  ${s.file.padEnd(32)} ${s.box.w}×${s.box.h} fill ${s.fill}`);
}
