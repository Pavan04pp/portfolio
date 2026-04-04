import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/portfolio/', // Use your repo name here if deploying to GitHub Pages
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    proxy: {
      // Proxy requests from /portfolio/api/* to the backend at http://localhost:3000/api/*
      '/portfolio/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/portfolio\/api/, '/api')
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
