import { mergeConfig } from 'vite';
import copy from 'rollup-plugin-copy';
import baseConfig from './vite.config.base';

export default mergeConfig(baseConfig, {
  build: {
    outDir: 'dist/topbar',
    emptyOutDir: true,
    rollupOptions: {
      input: { index: 'index.topbar.html' },
      plugins: [
        copy({
          targets: [
            { src: 'widgets/topbar/src/icons/*', dest: 'dist/topbar/assets/icons' },
            { src: 'widgets/topbar/src/scripts/*', dest: 'dist/topbar/assets/scripts' },
          ],
          verbose: true,
          hook: 'writeBundle',
        }),
      ],
    },
  },
});
