import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const isVercel = !!process.env.VERCEL;
const isGitHubAction = !!process.env.GITHUB_ACTIONS;

export default defineConfig({
  base: process.env.VITE_BASE_URL || (isVercel ? '/' : isGitHubAction ? '/Cleaning-Duck/' : '/'),
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router-dom')) {
            return 'vendor';
          }
          if (id.includes('node_modules/framer-motion')) return 'animations';
          if (id.includes('node_modules/swiper')) return 'swiper';
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
