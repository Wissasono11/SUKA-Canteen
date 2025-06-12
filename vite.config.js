import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.jsx",
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "resources/js"),
        },
    },
    server: {
        host: '127.0.0.1', // samakan dengan backend
        port: 5173, // port frontend, pastikan tidak bentrok
        proxy: {
            '/api': 'http://127.0.0.1:8000',
            '/sanctum': 'http://127.0.0.1:8000',
        },
    },
});
