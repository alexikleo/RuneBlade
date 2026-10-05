import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/postcss';
import { defineConfig } from 'vite';

// GitHub Pages serves the game as a browser app without a server runtime.
export default defineConfig({
  root: fileURLToPath(new URL('./web-pages', import.meta.url)),
  base: `${process.env.PAGES_BASE_PATH || ''}/`,
  publicDir: fileURLToPath(new URL('./public', import.meta.url)),
  resolve: { alias: { '@': fileURLToPath(new URL('.', import.meta.url)) } },
  plugins: [react()],
  css: { postcss: { plugins: [tailwindcss()] } },
  build: {
    outDir: fileURLToPath(new URL('./dist/pages', import.meta.url)),
    emptyOutDir: true,
    target: 'es2020',
  },
});
