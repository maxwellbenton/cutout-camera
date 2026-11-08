// Text reading for cutouts with PP-OCRv5 (English) via ppu-paddle-ocr.
// Runs inside the detection worker. Models are self-hosted under
// public/models/ocr so the PWA works offline once cached (~13 MB).
import { PaddleOcrService } from "ppu-paddle-ocr/web";
import type { TextLine } from "./naming.ts";

let service: PaddleOcrService | null = null;
let loading: Promise<PaddleOcrService> | null = null;

export function loadOcr(appBase: string, executionProviders: string[]): Promise<PaddleOcrService> {
  if (service) return Promise.resolve(service);
  loading ??= (async () => {
    const base = new URL("models/ocr/", appBase).href;
    const s = new PaddleOcrService({
      model: {
        detection: base + "PP-OCRv5_mobile_det_infer.ort",
        recognition: base + "en_PP-OCRv5_mobile_rec_infer.ort",
        charactersDictionary: base + "ppocrv5_en_dict.txt",
      },
      session: { executionProviders },
    });
    await s.initialize();
    service = s;
    return s;
  })().catch((err) => {
    loading = null;
    throw err;
  });
  return loading;
}

export const MIN_LINE_CONFIDENCE = 0.6;
export const MIN_CROP_SIDE = 24;

/**
 * OCR one rectangular crop. `offsetX/Y` is where the cutout's box starts inside
 * the crop; returned line boxes are relative to the cutout box. Lines whose
 * centre isn't on the object's mask are dropped (that's text on whatever is
 * behind the object).
 */
export async function readText(
  ocr: PaddleOcrService,
  crop: OffscreenCanvas,
  offsetX: number,
  offsetY: number,
  alpha: Uint8ClampedArray,
  boxW: number,
  boxH: number,
): Promise<TextLine[]> {
  const result = await ocr.recognize(crop as any, { flatten: true });
  const lines: TextLine[] = [];
  for (const r of result.results) {
    if (r.confidence < MIN_LINE_CONFIDENCE || !r.text.trim()) continue;
    const box = { x: r.box.x - offsetX, y: r.box.y - offsetY, w: r.box.width, h: r.box.height };
    if (onMask(alpha, boxW, boxH, box.x + box.w / 2, box.y + box.h / 2, Math.max(4, box.h / 2))) {
      lines.push({ text: r.text.trim(), score: r.confidence, box });
    }
  }
  return lines;
}

/** Is there mask coverage within r px of (x, y)? Coordinates are box-local. */
export function onMask(alpha: Uint8ClampedArray, w: number, h: number, x: number, y: number, r: number): boolean {
  const step = Math.max(1, Math.floor(r / 3));
  for (let dy = -r; dy <= r; dy += step) {
    for (let dx = -r; dx <= r; dx += step) {
      const px = Math.round(x + dx);
      const py = Math.round(y + dy);
      if (px < 0 || py < 0 || px >= w || py >= h) continue;
      if (alpha[py * w + px] > 96) return true;
    }
  }
  return false;
}
