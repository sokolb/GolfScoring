import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    define: {
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
        "process.env.REACT_APP_API_BASE_URL": JSON.stringify(process.env.VITE_API_BASE_URL || "http://localhost:8082"),
        "process.env.REACT_APP_USERNAME": JSON.stringify(process.env.VITE_USERNAME || ""),
        "process.env.REACT_APP_PASSWORD": JSON.stringify(process.env.VITE_PASSWORD || ""),
    },
    esbuild: {
        loader: "jsx",
        include: /src\/.*\.jsx?$/,
        exclude: [],
    },
    optimizeDeps: {
        esbuildOptions: {
            loader: {
                ".js": "jsx",
            },
        },
    },
    server: {
        host: "0.0.0.0",
        port: 3000,
        open: true,
    },
    build: {
        outDir: "build",
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./src/setupTests.js",
        css: true,
    },
});
