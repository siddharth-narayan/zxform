import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import path from 'path';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vite.dev/config/
export default defineConfig({
  // root: "./preview",
  plugins: [svelte(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') }
  }
});
