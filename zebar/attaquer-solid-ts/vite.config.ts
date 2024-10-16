import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import copy from 'rollup-plugin-copy';

export default defineConfig({
  plugins: [solidPlugin(),
    copy({
      targets: [
        {src: 'src/icons/*', dest: './dist/assets/icons' },
        {src: 'src/scripts/*', dest: './dist/assets/scripts' }
      ],
      verbose: true,
      hook: 'writeBundle',
    })
  ],
  build: { target: 'esnext' },
  base: './',
});
