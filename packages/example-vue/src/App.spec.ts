import { test, expect } from 'playwright-monocart-coverage/experimental-ct-vue';
import App from './App.vue';

test('App should work', async ({ mount }) => {
    const component = await mount(App);
    await expect(component).toContainText('Vite + Vue');
});
