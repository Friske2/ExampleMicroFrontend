import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import qiankun from "vite-plugin-qiankun";

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  plugins: [
    vue(),
    qiankun("sub-app-vue", {
      useDevMode: !isProduction,
    }),
  ],
  server: {
    port: 3001,
    cors: true,
    origin: "http://localhost:3001",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  preview: {
    port: 3001,
    cors: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  base: "http://localhost:3001/",
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
