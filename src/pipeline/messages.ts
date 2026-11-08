import type { Box } from "./detector.ts";
import type { TextLine } from "./naming.ts";

export type WorkerRequest =
  | { type: "init"; appBase: string; modelPath: string; labelsPath: string; backend?: "webgpu" | "wasm" }
  | { type: "analyze"; bitmap: ImageBitmap; minScore: number; ignore: string[]; ocr: boolean }
  | { type: "redecode"; minScore: number; ignore: string[]; ocr: boolean };

export type CutoutResult = {
  /** Stable for a given label + box, so OCR results survive a re-decode. */
  key: string;
  label: string;
  classId: number;
  score: number;
  box: Box;
  fill: number;
  png: Blob;
};

export type WorkerResponse =
  | { type: "status"; text: string }
  | { type: "progress"; loaded: number; total: number }
  | { type: "ready"; backend: string; classes: number }
  | { type: "result"; run: number; width: number; height: number; cutouts: CutoutResult[]; preview: Blob }
  | { type: "text"; run: number; key: string; lines: TextLine[] }
  | { type: "text-done"; run: number; error?: string }
  | { type: "error"; message: string };
