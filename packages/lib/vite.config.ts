import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import dts from 'vite-plugin-dts';

// https://vite.dev/config/
export default defineConfig({
  plugins: [dts()],
  build: {
    lib: {
      name: 'sigma-components',
      entry: [
        fileURLToPath(new URL('./src/playwright', import.meta.url)),
        fileURLToPath(new URL('./src/experimental-ct-react.ts', import.meta.url)),
        fileURLToPath(new URL('./src/experimental-ct-vue.ts', import.meta.url)),
      ],
    },
    rollupOptions: {
      external: [
        'monocart-reporter',
        '@playwright/experimental-ct-vue',
        '@playwright/experimental-ct-react',
        '@playwright/test',
      ],
      output: {
        globals: {
          'monocart-reporter': 'MonocartReporter',
          '@playwright/experimental-ct-vue': 'PlaywrightExperimentalCtVue',
          '@playwright/experimental-ct-react': 'PlaywrightExperimentalCtVueReact',
          '@playwright/test': 'PlaywrightTest',
        },
      },
    },
  },
});
