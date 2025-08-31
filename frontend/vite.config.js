import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // frontend dev server
  },
  build: {
    outDir: 'dist',
  },
  base: '/', // 👈 ensures assets load from root
})
