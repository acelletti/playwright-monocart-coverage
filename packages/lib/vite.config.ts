import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import dts from 'vite-plugin-dts';

// https://vite.dev/config/
export default defineConfig({
  plugins: [dts({ tsconfigPath: 'tsconfig.app.json' })],
  build: {
    lib: {
      name: 'sigma-components',
      entry: [
        fileURLToPath(new URL('./src/playwright', import.meta.url)),
        fileURLToPath(new URL('./src/experimental-ct-react.ts', import.meta.url)),
        fileURLToPath(new URL('./src/experimental-ct-svelte.ts', import.meta.url)),
        fileURLToPath(new URL('./src/experimental-ct-vue.ts', import.meta.url)),
      ],
    },
    rollupOptions: {
      external: [
        'monocart-reporter',
        '@playwright/experimental-ct-react',
        '@playwright/experimental-ct-svelte',
        '@playwright/experimental-ct-vue',
        '@playwright/test',
      ],
      output: {
        globals: {
          'monocart-reporter': 'MonocartReporter',
          '@playwright/experimental-ct-react': 'PlaywrightExperimentalCtVueReact',
          '@playwright/experimental-ct-svelte': 'PlaywrightExperimentalCtVueSvelte',
          '@playwright/experimental-ct-vue': 'PlaywrightExperimentalCtVue',
          '@playwright/test': 'PlaywrightTest',
        },
      },
    },
  },
});
