import { defineConfig } from "vite";
import qiankun from "vite-plugin-qiankun";

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  plugins: [
    qiankun("sub-app-react", {
      useDevMode: !isProduction,
    }),
  ],
  esbuild: {
    jsx: "automatic",
  },
  server: {
    port: 3002,
    cors: true,
    origin: "http://localhost:3002",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  preview: {
    port: 3002,
    cors: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  base: "http://localhost:3002/",
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
