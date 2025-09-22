import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('@mui')) {
              return 'mui-vendor';
            }
            if (id.includes('three') || id.includes('@react-three')) {
              return 'three-vendor';
            }
            if (id.includes('@supabase')) {
              return 'supabase-vendor';
            }
            return 'vendor';
          }
        },
      },
    },
    sourcemap: true,
    minify: 'esbuild',
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      '@mui/material',
      '@emotion/react',
      '@emotion/styled',
      'three'
    ],
    exclude: ['@emotion/use-insertion-effect-with-fallbacks']
  },
  server: {
    port: 3000,
    open: true,
    cors: true,
  },
  preview: {
    port: 4173,
    open: true,
  },
});