// Text reading for cutouts, using PaddleOCR's browser SDK (PP-OCRv6, English).
// Models download from PaddleOCR's CDN on first use; the service worker caches them.
import { PaddleOCR } from "@paddleocr/paddleocr-js";
import type { CutoutResult } from "./messages.ts";
import type { TextLine } from "./naming.ts";

type Ocr = Awaited<ReturnType<typeof PaddleOCR.create>>;
let ocrPromise: Promise<Ocr> | null = null;

export function loadOcr(appBase: string): Promise<Ocr> {
  ocrPromise ??= PaddleOCR.create({
    lang: "en",
    ocrVersion: "PP-OCRv6",
    worker: true,
    ortOptions: { backend: "auto", wasmPaths: new URL("ort/", appBase).href },
  }).catch((err) => {
    ocrPromise = null;
    throw err;
  });
  return ocrPromise!;
}

const MIN_LINE_SCORE = 0.6;
const MIN_CROP_SIDE = 24;

/**
 * Read text on one cutout. OCR runs on a plain rectangular crop (so letters at
 * the mask edge aren't clipped), then lines are kept only if they sit on the
 * object's mask — text on whatever is behind the object is dropped.
 */
export async function readCutoutText(ocr: Ocr, cut: CutoutResult): Promise<TextLine[]> {
  if (Math.min(cut.box.w, cut.box.h) < MIN_CROP_SIDE) return [];
  const bmp = await createImageBitmap(cut.crop);
  // rectCrop() padded the box; recover the crop's origin in source coords.
  const padX = Math.round((bmp.width - cut.box.w) / 2);
  const padY = Math.round((bmp.height - cut.box.h) / 2);
  bmp.close();

  const [result] = await ocr.predict(cut.crop);
  const lines: TextLine[] = [];
  for (const item of result?.items ?? []) {
    if (item.score < MIN_LINE_SCORE || !item.text.trim()) continue;
    const xs = item.poly.map((p) => p[0] - padX);
    const ys = item.poly.map((p) => p[1] - padY);
    const box = {
      x: Math.min(...xs),
      y: Math.min(...ys),
      w: Math.max(...xs) - Math.min(...xs),
      h: Math.max(...ys) - Math.min(...ys),
    };
    if (onMask(cut, box.x + box.w / 2, box.y + box.h / 2, Math.max(4, box.h / 2))) {
      lines.push({ text: item.text, score: item.score, box });
    }
  }
  return lines;
}

/** Is there mask coverage near (x, y) in box-local coords? */
function onMask(cut: CutoutResult, x: number, y: number, r: number): boolean {
  const { w, h } = cut.box;
  const step = Math.max(1, Math.floor(r / 3));
  for (let dy = -r; dy <= r; dy += step) {
    for (let dx = -r; dx <= r; dx += step) {
      const px = Math.round(x + dx);
      const py = Math.round(y + dy);
      if (px < 0 || py < 0 || px >= w || py >= h) continue;
      if (cut.alpha[py * w + px] > 96) return true;
    }
  }
  return false;
}
