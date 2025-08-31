import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174, 
  },
  build: {
    outDir: 'dist',
  },
  base: '/admin/',  // 👈 IMPORTANT: ensures assets load from /admin
})
