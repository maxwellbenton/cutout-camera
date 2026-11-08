"""Export a YOLOE-26 segmentation model to ONNX for the browser.

    pip install ultralytics onnx onnxslim
    python scripts/build_vocab.py           # (re)build scripts/vocab.txt
    python scripts/export_model.py          # small model, curated vocab
    python scripts/export_model.py m        # medium: slower, more accurate
    python scripts/export_model.py s pf     # prompt-free 4,585-tag model instead

Writes public/models/yoloe-26<size>-seg.onnx + public/models/labels.json.
The vocabulary's text embeddings are baked into the ONNX graph, so the browser
never needs a text encoder. Ultralytics models are AGPL-3.0.
"""
import json
import shutil
import sys
from pathlib import Path

from ultralytics import YOLOE

size = sys.argv[1] if len(sys.argv) > 1 else "s"
mode = sys.argv[2] if len(sys.argv) > 2 else "vocab"
here = Path(__file__).resolve().parent
out_dir = here.parent / "public" / "models"
out_dir.mkdir(parents=True, exist_ok=True)

if mode == "pf":
    model = YOLOE(f"yoloe-26{size}-seg-pf.pt")
    names = [model.names[i] for i in range(len(model.names))]
else:
    names = [l.strip() for l in (here / "vocab.txt").read_text().splitlines() if l.strip()]
    model = YOLOE(f"yoloe-26{size}-seg.pt")
    model.set_classes(names)  # embeds the class names with MobileCLIP, once, here

print(f"{len(names)} classes; first few: {names[:8]}")

# nms=False selects the one-to-one (end2end, NMS-free) head:
#   output0 [1, 300, 6 + 32]  (x1 y1 x2 y2 score class, mask coeffs)
#   output1 [1, 32, 160, 160] mask prototypes
path = model.export(format="onnx", imgsz=640, opset=17, simplify=True, dynamic=False, nms=False)
dest = out_dir / f"yoloe-26{size}-seg.onnx"
shutil.move(path, dest)
(out_dir / "labels.json").write_text(json.dumps(names))
print("wrote", dest, f"{dest.stat().st_size / 1e6:.1f} MB")
