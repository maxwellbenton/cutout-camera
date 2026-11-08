# Cutout Camera

A PWA that takes a photo (camera, upload, drag-drop, paste, or the OS share sheet) and gives back **one transparent PNG per object** in it, named by what it is, with any text on the object read off and used in the name or saved as a `.txt`.

Everything runs on the device. No server, and it works offline after the first load.

```
npm install
npm run dev        # http://localhost:5173
npm run build      # → dist/, deployable as static files (GitHub Pages workflow included)
```

## What you get

| In the photo | Files |
|---|---|
| one tree | `tree.png` |
| three trees | `tree-1.png`, `tree-2.png`, `tree-3.png` (numbered left → right) |
| a sign that says OPEN | `sign-open.png` |
| a bag with lots of text and one big brand line | e.g. `packet-kerrygold.png` + `packet-kerrygold.txt` |
| a page of text | `book.png` + `book.txt` |

Names are editable before export. **Download .zip** bundles the selected PNGs, any `.txt` files, and `cutouts.json` (label, confidence, box, and text for each). On phones, **Share** sends the files straight to another app.

## How it works

```
photo ─► detect.worker.ts
          ├─ YOLOE-26s-seg (ONNX, 44 MB) ── boxes + per-object mask coefficients
          │    WebGPU if available, else WebAssembly
          ├─ detector.ts: decode, mask → full-res alpha matte, trim, de-dupe
          ├─ one transparent PNG per object
          └─ PP-OCRv5 (ppu-paddle-ocr, 13 MB) on each object's crop
               └─ keep only text lines that sit on the object's mask
main.tsx ◄── cutouts stream in, then text; naming.ts assigns file names
```

Why this works better than the old garden pipeline (SegFormer + watershed in `ground-view`): SegFormer is *semantic* segmentation, so it labels every tree pixel "tree" and can't tell where one tree ends. Watershed was guessing. YOLOE is *instance* segmentation, so each object gets its own mask. On the grape plate in `an-incomplete-gardening-companion/src/assets/images/vitis-01.jpg` it separates 27 individual grapes.

## Tuning

- **Vocabulary.** The model can only output names in `scripts/vocab.txt` (1,658 names: LVIS + Objects365 + Open Images, plus yard, garden, and text-bearing things from `scripts/vocab_extra.txt`). To add names, edit `vocab_extra.txt`, then:
  ```
  pip install ultralytics onnx onnxslim "git+https://github.com/ultralytics/CLIP.git"
  python scripts/build_vocab.py
  python scripts/export_model.py        # or: export_model.py m  (medium, ~100 MB, more accurate)
  ```
  The name embeddings are baked into the ONNX, so the browser never runs a text encoder.
- **Confidence** is in Settings (default 0.30). Changing it re-filters instantly without re-running the model.
- **Skipped tags** are in `src/pipeline/ignore.ts`. **Naming thresholds** (what counts as "short" text, headline rules) are in `src/pipeline/naming.ts`.
- `?backend=wasm` or `?backend=webgpu` in the URL forces a runtime.

## Testing without a phone

`scripts/node-check.mjs` runs the same detection and cutout code under Node and writes the PNGs plus an overlay:

```
ONNXRUNTIME_NODE_INSTALL=skip npm i      # skip ORT's CUDA download
node scripts/node-check.mjs photo.jpg --out check-out --score 0.3
```

## Known limits

- **Names are categories, not species.** "packet", "tree stump", "wild bird", and "apple" are reliable. Fine-grained identity often isn't: a squirrel was called "raccoon", a chip bag "crocodile". Text on the object usually rescues product shots. For plants, a second-stage classifier would be the next step (see below).
- **Mask edges are soft.** Masks come from a 160×160 grid, so thin things (twigs, glasses frames) can include some background.
- **Dense groups.** Separate objects separate well. A tree line where crowns truly merge may still come out as one "tree", or as both one big mask and several smaller ones.
- **OCR is English (Latin script) only.** Other recognizers exist in the same model repo.
- **Share target** (sharing a photo *into* the app) works on Android Chrome but not iOS.
- **HEIC** files from iPhones only decode in Safari.
- Ultralytics YOLOE weights are **AGPL-3.0**.

## Next steps worth trying

1. **Edge refinement**: run EdgeTAM or SAM 2.1 tiny (Transformers.js v4) with each box as a prompt for crisp masks.
2. **Better names**: classify each cutout with a small CLIP/SigLIP, or a plant-specific classifier, or (desktop Chrome) the built-in Prompt API with image input.
3. **Medium model**: `export_model.py m` for accuracy, if download size is OK.
