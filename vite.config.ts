import path from 'path';
import { defineConfig } from 'vite';

import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  // root: "./preview",
  plugins: [svelte(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve('src') }
  },
  
  build: {
    lib: {
      name: 'ZxForms',
      entry: {
        svelte: path.resolve('src/svelte/index.ts'),
      }
    },
    rollupOptions: {
      external: ['svelte', 'react'], // optional
    },
  },
});