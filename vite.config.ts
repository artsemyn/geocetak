import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    // Base public path when served in production
    base: mode === 'production' ? '' : '/',
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
      exclude: ['@emotion/is-prop-valid']
    },
    server: {
      port: 3000,
      open: true,
      cors: true,
      strictPort: true
    },
    preview: {
      port: 4173,
      open: true,
      cors: true
    }
  };
});