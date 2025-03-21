import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["react-bootstrap"],
  },
  build: {
    outDir: "build",
    chunkSizeWarningLimit: 1000,
  },
});