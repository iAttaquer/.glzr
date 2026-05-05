import { mergeConfig } from 'vite';
import copy from 'rollup-plugin-copy';
import baseConfig from './vite.config.base';

export default mergeConfig(baseConfig, {
  build: {
    outDir: 'dist/topbar-old',
    emptyOutDir: true,
    rollupOptions: {
      input: { index: 'index.topbar-old.html' },
      plugins: [
        copy({
          targets: [
            { src: 'widgets/topbar-old/src/icons/*', dest: 'dist/topbar-old/assets/icons' },
            { src: 'widgets/topbar-old/src/scripts/*', dest: 'dist/topbar-old/assets/scripts' },
          ],
          verbose: true,
          hook: 'writeBundle',
        }),
      ],
    },
  },
});
