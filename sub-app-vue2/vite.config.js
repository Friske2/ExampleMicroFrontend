import { defineConfig } from "vite";
import vue2 from "@vitejs/plugin-vue2";
import qiankun from "vite-plugin-qiankun";

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  plugins: [
    vue2(),
    qiankun("sub-app-vue2", {
      useDevMode: !isProduction,
    }),
  ],
  server: {
    port: 3003,
    cors: true,
    origin: "http://localhost:3003",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  preview: {
    port: 3003,
    cors: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  base: "http://localhost:3003/",
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
