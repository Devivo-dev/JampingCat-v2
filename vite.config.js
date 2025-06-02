import { defineConfig } from 'vite';
import glob from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig({
  root: 'src',
  base: './',
  build: {
    rollupOptions: {
      input: glob.sync('./src/*.html'),
    },
    outDir: 'dist', // 🟢 Без ../ — Vite і Netlify краще це розуміють
    emptyOutDir: true, // 🧹 очищення перед білдом
  },
  plugins: [injectHTML(), FullReload(['./src/**/*.html'])],
});
