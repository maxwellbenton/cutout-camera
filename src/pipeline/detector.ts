// Pure detection math for a YOLOE-26 prompt-free segmentation model exported
// to ONNX (end-to-end / NMS-free head). No DOM or browser APIs in here so the
// exact same code runs in the browser worker and in the Node test harness.
//
// Model I/O (verified against the export in scripts/export_model.py):
//   input  images  float32 [1, 3, S, S]  RGB 0..1, letterboxed with gray 114
//   output0        float32 [1, N, 6 + M] x1 y1 x2 y2 score classId, M mask coeffs
//   output1        float32 [1, M, S/4, S/4] mask prototypes

export type Box = { x: number; y: number; w: number; h: number };

export type Letterbox = {
  tensor: Float32Array; // CHW
  size: number;
  scale: number; // source px → model px
  padX: number;
  padY: number;
};

export type RawDetection = {
  classId: number;
  label: string;
  score: number;
  box: Box; // source-image pixels
  coeffs: Float32Array;
};

export type MaskedDetection = Omit<RawDetection, "coeffs"> & {
  /** Alpha (0..255) covering `box`, row-major, box.w * box.h. */
  alpha: Uint8ClampedArray;
  /** Fraction of the box covered by the mask (0..1). */
  fill: number;
};

/** Resize (keep aspect) + pad an RGBA image into the model's square input. */
export function letterbox(rgba: Uint8ClampedArray | Uint8Array, w: number, h: number, size: number): Letterbox {
  const scale = Math.min(size / w, size / h);
  const nw = Math.round(w * scale);
  const nh = Math.round(h * scale);
  const padX = Math.floor((size - nw) / 2);
  const padY = Math.floor((size - nh) / 2);
  const plane = size * size;
  const t = new Float32Array(3 * plane).fill(114 / 255);

  // Area-average downsample (box filter) so fine detail isn't aliased away.
  const inv = 1 / scale;
  for (let y = 0; y < nh; y++) {
    const sy0 = y * inv;
    const sy1 = Math.min(h, (y + 1) * inv);
    for (let x = 0; x < nw; x++) {
      const sx0 = x * inv;
      const sx1 = Math.min(w, (x + 1) * inv);
      let r = 0, g = 0, b = 0, n = 0;
      for (let sy = Math.floor(sy0); sy < Math.ceil(sy1); sy++) {
        for (let sx = Math.floor(sx0); sx < Math.ceil(sx1); sx++) {
          const i = (sy * w + sx) * 4;
          r += rgba[i]; g += rgba[i + 1]; b += rgba[i + 2]; n++;
        }
      }
      const o = (y + padY) * size + (x + padX);
      t[o] = r / n / 255;
      t[plane + o] = g / n / 255;
      t[2 * plane + o] = b / n / 255;
    }
  }
  return { tensor: t, size, scale, padX, padY };
}

export type DecodeOptions = {
  minScore: number;
  /** Class-agnostic duplicate suppression threshold on box IoU. */
  dupIou: number;
  /** Ignore detections smaller than this fraction of the image area. */
  minAreaFrac: number;
  /** Labels to drop entirely (scene-level tags that aren't "objects"). */
  ignore: Set<string>;
};

export const defaultDecodeOptions: DecodeOptions = {
  minScore: 0.3,
  dupIou: 0.85,
  minAreaFrac: 0.0004,
  ignore: new Set(),
};

export function decodeDetections(
  out: Float32Array,
  dims: readonly number[],
  lb: Letterbox,
  srcW: number,
  srcH: number,
  labels: string[],
  opts: DecodeOptions = defaultDecodeOptions,
): RawDetection[] {
  const [, n, stride] = dims;
  const m = stride - 6;
  const dets: RawDetection[] = [];
  const minArea = opts.minAreaFrac * srcW * srcH;

  for (let i = 0; i < n; i++) {
    const o = i * stride;
    const score = out[o + 4];
    if (!(score >= opts.minScore)) continue;
    const classId = Math.round(out[o + 5]);
    const label = labels[classId] ?? `class-${classId}`;
    if (opts.ignore.has(label)) continue;

    const x1 = clamp((out[o] - lb.padX) / lb.scale, 0, srcW);
    const y1 = clamp((out[o + 1] - lb.padY) / lb.scale, 0, srcH);
    const x2 = clamp((out[o + 2] - lb.padX) / lb.scale, 0, srcW);
    const y2 = clamp((out[o + 3] - lb.padY) / lb.scale, 0, srcH);
    const box = { x: Math.floor(x1), y: Math.floor(y1), w: Math.ceil(x2 - x1), h: Math.ceil(y2 - y1) };
    if (box.w < 4 || box.h < 4 || box.w * box.h < minArea) continue;

    dets.push({ classId, label, score, box, coeffs: out.slice(o + 6, o + 6 + m) });
  }

  // The NMS-free head can still emit near-identical boxes under different
  // (often synonymous) tags, e.g. "tree" and "plant". Keep the best one.
  dets.sort((a, b) => b.score - a.score);
  const kept: RawDetection[] = [];
  for (const d of dets) {
    if (kept.some((k) => iou(k.box, d.box) > opts.dupIou)) continue;
    kept.push(d);
  }
  return kept;
}

/**
 * Turn a detection's mask coefficients into a full-resolution alpha matte for
 * its box. Logits are bilinearly sampled from the prototype grid (so edges are
 * smooth instead of blocky) then squashed with a steep sigmoid for a ~1px
 * anti-aliased edge.
 */
export function buildAlpha(
  det: RawDetection,
  protos: Float32Array,
  protoDims: readonly number[],
  lb: Letterbox,
): MaskedDetection {
  const [, m, ph, pw] = protoDims;
  const ratio = pw / lb.size; // model px → proto px (1/4)
  const { box } = det;

  // Proto-space window covering the box (+1 cell margin for interpolation).
  const toPX = (sx: number) => (sx * lb.scale + lb.padX) * ratio - 0.5;
  const toPY = (sy: number) => (sy * lb.scale + lb.padY) * ratio - 0.5;
  const gx0 = Math.max(0, Math.floor(toPX(box.x)) - 1);
  const gy0 = Math.max(0, Math.floor(toPY(box.y)) - 1);
  const gx1 = Math.min(pw - 1, Math.ceil(toPX(box.x + box.w)) + 1);
  const gy1 = Math.min(ph - 1, Math.ceil(toPY(box.y + box.h)) + 1);
  const gw = gx1 - gx0 + 1;
  const gh = gy1 - gy0 + 1;

  // Logit grid = coeffs · protos over the window.
  const grid = new Float32Array(gw * gh);
  const plane = ph * pw;
  for (let k = 0; k < m; k++) {
    const c = det.coeffs[k];
    if (c === 0) continue;
    const base = k * plane;
    for (let y = 0; y < gh; y++) {
      const row = base + (gy0 + y) * pw + gx0;
      const gr = y * gw;
      for (let x = 0; x < gw; x++) grid[gr + x] += c * protos[row + x];
    }
  }

  const alpha = new Uint8ClampedArray(box.w * box.h);
  // Edge sharpness: logit units per source pixel shrink as the image grows,
  // so scale the sigmoid by how many source px one proto cell spans.
  const pxPerCell = 1 / (lb.scale * ratio);
  const k = Math.max(1, Math.min(6, pxPerCell / 2));
  let on = 0;
  for (let y = 0; y < box.h; y++) {
    const py = toPY(box.y + y + 0.5) - gy0;
    const y0 = clamp(Math.floor(py), 0, gh - 1);
    const y1 = Math.min(gh - 1, y0 + 1);
    const fy = clamp(py - y0, 0, 1);
    for (let x = 0; x < box.w; x++) {
      const px = toPX(box.x + x + 0.5) - gx0;
      const x0 = clamp(Math.floor(px), 0, gw - 1);
      const x1 = Math.min(gw - 1, x0 + 1);
      const fx = clamp(px - x0, 0, 1);
      const top = grid[y0 * gw + x0] * (1 - fx) + grid[y0 * gw + x1] * fx;
      const bot = grid[y1 * gw + x0] * (1 - fx) + grid[y1 * gw + x1] * fx;
      const logit = top * (1 - fy) + bot * fy;
      const a = 255 / (1 + Math.exp(-logit * k));
      alpha[y * box.w + x] = a;
      if (a >= 128) on++;
    }
  }

  const { coeffs: _c, ...rest } = det;
  return { ...rest, alpha, fill: on / (box.w * box.h) };
}

/** Tighten a box to the opaque region of its alpha matte. */
export function trimToAlpha(d: MaskedDetection, threshold = 24): MaskedDetection {
  const { w, h } = d.box;
  let minX = w, minY = h, maxX = -1, maxY = -1;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (d.alpha[y * w + x] > threshold) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < 0) return d;
  if (minX === 0 && minY === 0 && maxX === w - 1 && maxY === h - 1) return d;
  const nw = maxX - minX + 1;
  const nh = maxY - minY + 1;
  const alpha = new Uint8ClampedArray(nw * nh);
  for (let y = 0; y < nh; y++) alpha.set(d.alpha.subarray((y + minY) * w + minX, (y + minY) * w + minX + nw), y * nw);
  return { ...d, alpha, box: { x: d.box.x + minX, y: d.box.y + minY, w: nw, h: nh } };
}

/**
 * "Detections" that are really the whole picture (tags like "old photo",
 * "watercolor painting", "document" on a flat scan). Their cutout would just
 * be the input photo again.
 */
export function isWholeFrame(d: MaskedDetection, w: number, h: number): boolean {
  return d.box.w * d.box.h >= 0.88 * w * h && d.fill >= 0.9;
}

export function iou(a: Box, b: Box): number {
  const ix = Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x));
  const iy = Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
  const inter = ix * iy;
  return inter / (a.w * a.h + b.w * b.h - inter || 1);
}

function clamp(v: number, lo: number, hi: number) {
  return v < lo ? lo : v > hi ? hi : v;
}
