import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

// Relative base so the build works from GitHub Pages sub-paths or any folder.
export default defineConfig({
  base: "./",
  plugins: [preact()],
  worker: { format: "es" },
  optimizeDeps: {
    // ORT and the OCR SDK ship their own wasm/worker loaders; don't pre-bundle them.
    exclude: ["onnxruntime-web", "@paddleocr/paddleocr-js"],
  },
  build: {
    target: "es2022",
    chunkSizeWarningLimit: 4000,
  },
});
