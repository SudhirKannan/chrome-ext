import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname for ES module context
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // ✅ Tailwind plugin for Vite
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  publicDir: 'public', // Static files folder
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        popup: path.resolve(__dirname, 'index.html'),           // Your React app entry (popup)
        background: path.resolve(__dirname, 'public/background.js'), // Background script
        content: path.resolve(__dirname, 'public/content.js'),       // Content script
      },
      output: {
        entryFileNames: (chunkInfo) => {
          // Keep background.js and content.js at root, others hashed in assets
          if (chunkInfo.name === 'background' || chunkInfo.name === 'content') {
            return '[name].js';
          }
          return 'assets/[name]-[hash].js';
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          // Place manifest.json at root, icons in icons folder, others in assets
          if (assetInfo.name === 'manifest.json') {
            return 'manifest.json';
          }
          if (assetInfo.name && assetInfo.name.endsWith('.png')) {
            return 'icons/[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
});
