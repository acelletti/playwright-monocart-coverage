import { test, expect } from 'playwright-monocart-coverage/experimental-ct-vue';
import HelloWorld from '../components/HelloWorld.vue';

test.describe('HelloWorld.vue', () => {
  test('renders the passed msg prop', async ({ mount }) => {
    const component = await mount(HelloWorld, {
      props: {
        msg: 'Hello Playwright Vue!',
      },
    });

    await expect(component).toContainText('Hello Playwright Vue!');
  });

  test('increments count when button is clicked', async ({ mount }) => {
    const component = await mount(HelloWorld, {
      props: {
        msg: 'Hello Playwright Vue!',
      },
    });

    const button = component.getByRole('button', { name: /count is 0/i });

    await expect(button).toBeVisible();
    await button.click();

    await expect(component).toHaveText(/count is 1/i);
  });
});
