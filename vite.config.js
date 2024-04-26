import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
// import wasm from 'vite-plugin-wasm';
// import topLevelAwait from 'vite-plugin-top-level-await';

export default defineConfig({
    plugins: [
    // wasm(),
    // topLevelAwait(),
        react(),
        eslint(),
    ],
    server: {
        port: 3001,
    },

    build: {
        outDir: 'build',
    },
});
