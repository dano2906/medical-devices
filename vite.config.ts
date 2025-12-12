import path from "node:path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "./src/index.ts"),
      name: "medical-devices",
      fileName: (format) => `index.${format}.js`,
      formats: ["es", "cjs"],
    },
    copyPublicDir: false,
    sourcemap: true,
    rollupOptions: {
      external: [
        "vue",
        "tailwindcss",
        "@tailwindcss/vite",
        "reka-ui",
        "lucide-vue-next",
        "clsx",
        "class-variance-authority",
        "tailwind-merge",
      ],
      output: {
        globals: { vue: "Vue" },
      },
    },
  },
  plugins: [
    vue(),
    tailwindcss(),
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
      tsconfigPath: "./tsconfig.app.json",
      include: ["src"],
    }),
  ],
});
