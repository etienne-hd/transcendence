import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3001,
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "http://backend:3000/",
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
        changeOrigin: true,
        ws: true
      },
    },
  },
  preview: {
    allowedHosts: ["unicord.fr"],
  },
});
