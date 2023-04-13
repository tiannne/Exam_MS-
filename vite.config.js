import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
//mock
import { viteMockServe } from "vite-plugin-mock";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), viteMockServe()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    // server: {
    //   // hmr: true,
    //   port: "8081",
    //   proxy: {
    //     "/api": {
    //       target: "http://localhost:3000",
    //       changeOrigin: true, //开启代理，允许跨域
    //       rewrite: (path) => path.replace(/^\/api/, ""), //标识替换，使用 '/api' 代替真实的接口地址
    //     },
    //   },
    // },
  },
});
