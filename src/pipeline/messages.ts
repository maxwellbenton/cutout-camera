import type { Box } from "./detector.ts";

export type WorkerRequest =
  | { type: "init"; appBase: string; modelPath: string; labelsPath: string }
  | { type: "analyze"; bitmap: ImageBitmap; minScore: number; ignore: string[] }
  | { type: "redecode"; minScore: number; ignore: string[] };

export type CutoutResult = {
  label: string;
  classId: number;
  score: number;
  box: Box;
  fill: number;
  alpha: Uint8ClampedArray;
  png: Blob;
  crop: Blob;
};

export type WorkerResponse =
  | { type: "status"; text: string }
  | { type: "progress"; loaded: number; total: number }
  | { type: "ready"; backend: string; classes: number }
  | { type: "result"; width: number; height: number; cutouts: CutoutResult[]; preview: Blob }
  | { type: "error"; message: string };
