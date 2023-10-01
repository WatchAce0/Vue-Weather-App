// vite.config.js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  root: "./", // set this to the root directory
  build: {
    rollupOptions: {
      input: "./index.html", // specify the input file
    },
  },
});
