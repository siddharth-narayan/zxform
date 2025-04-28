import { defineConfig } from 'vite'
import tsconfigPaths from "vite-tsconfig-paths"
import path from 'path';

import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  root: "./preview",
  plugins: [svelte()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
