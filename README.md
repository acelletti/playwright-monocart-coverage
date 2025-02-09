# Playwright Monocart Coverage

![License](https://img.shields.io/github/license/acelletti/playwright-monocart-coverage)
![GitHub Stars](https://img.shields.io/github/stars/acelletti/playwright-monocart-coverage)

A **Playwright plugin** that integrates **Monocart Reporter** to generate **JavaScript coverage reports** for your Playwright tests.

## :pushpin: Features
- :wrench: **Seamless Integration** – Works with Playwright test suites effortlessly.
- :chart_with_upwards_trend: **Detailed Coverage Reports** – Utilizes `monocart-reporter` for visual and structured coverage reports.
- :repeat: **Supports Component & E2E Testing** – Works with both `playwright` and `experimental-ct-*` for framework-specific component testing.
- :zap: Chromium Required – Uses Playwright’s built-in coverage API, which is only supported in Chromium-based browsers. You can still test across multiple browsers, but only Chromium will generate coverage.

## :rocket: Installation
Install via npm or yarn:

```sh
npm install playwright-monocart-coverage --save-dev
# OR
yarn add -D playwright-monocart-coverage
```

## :wrench: Usage

###  1⃣ Extend Playwright with Coverage
Modify your **Playwright config (`playwright.config.ts`)** to add `monocart-reporter` 

```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
    ...
    reporter: [
        ['html'],
        [
            'monocart-reporter',
            {
                name: 'Playwright Report',
                outputFile: 'docs/index.html',
                coverage: {
                    entryFilter: () => true,
                    sourceFilter: (sourcePath: string) => sourcePath.search(/src\//) !== -1,
                    lcov: true,
                },
            },
        ],
    ],
});
```

###  2⃣ Write a Test with Coverage

#### React Example
See a working example in [`package/example-react`](./package/example-react)

```tsx
import { test, expect } from 'playwright-monocart-coverage/experimental-ct-react';
import App from './App';

test('should work', async ({ mount }) => {
    const component = await mount(<App />);
    await expect(component).toContainText('Learn React');
});
```

#### Vue Example
See a working example in [`package/example-vue`](./package/example-vue)

```ts
import { test, expect } from 'playwright-monocart-coverage/experimental-ct-vue';
import App from './App.vue';

test('should work', async ({ mount }) => {
    const component = await mount(App);
    await expect(component).toContainText('Learn Vue');
});
```

#### Svelte Example
```ts
import { test, expect } from 'playwright-monocart-coverage/experimental-ct-svelte';
import App from './App.svelte';

test('should work', async ({ mount }) => {
    const component = await mount(App);
    await expect(component).toContainText('Learn Svelte');
});
```

### Combine custom fixtures

You can combine the coverage fixtures with other fixtures:

```ts
import { mergeTests } from '@playwright/test';
import { test as coverageTest } from 'playwright-monocart-coverage/experimental-ct-react';
import { test as dbTest } from 'database-test-utils';

export const test = mergeTests(coverageTest, dbTest);
```

###  3⃣ Run Tests & Generate Coverage
Run Playwright tests with coverage enabled:

```sh
npx playwright test
```

After running the tests, **Monocart Reporter** generates the **coverage report** inside the `coverage/` folder.

## :bar_chart: Viewing Coverage Reports
To view the generated **HTML coverage report**, open:

```sh
open docs/coverage/index.html
```

## :star: Supported Frameworks
| Framework  | Module |
|------------|-----------|
| Playwright E2E | `playwright-monocart-coverage` |
| Playwright Component Testing (React) | `playwright-monocart-coverage/experimental-ct-react` |
| Playwright Component Testing (Vue) | `playwright-monocart-coverage/experimental-ct-vue` |
| Playwright Component Testing (Svelte) | `playwright-monocart-coverage/experimental-ct-svelte` |

## :wrench: Configuration Options
Monocart Reporter can be customized in `playwright.config.ts`:

```ts
reporter: [['monocart-reporter', { outputFolder: 'custom-coverage-folder' }]]
```

## :handshake: Contributing
Contributions are welcome! Feel free to submit issues and PRs.
