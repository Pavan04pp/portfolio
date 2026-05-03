import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // Serve assets under /portfolio/ so the site works at pavancodes.me/portfolio/.
  base: '/portfolio/',
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    proxy: {
      // Proxy requests from /api/* to the backend at http://localhost:3000 during dev
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
