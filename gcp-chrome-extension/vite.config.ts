import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'public/manifest.json',
          dest: '.',
        }
      ],
    }),
  ],
  build: {
    outDir: 'build',
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
    watch:{
      include:'src/**'
    }
  },
});