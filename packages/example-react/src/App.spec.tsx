import { test, expect } from 'playwright-monocart-coverage/experimental-ct-react';
import App from './App';

test.describe('App Component', () => {
    test('renders Vite + React heading and logos', async ({ mount }) => {
        const component = await mount(<App />);

        await expect(component).toContainText('Vite + React');
        await expect(component.getByRole('link', { name: /vite/i })).toBeVisible();
        await expect(component.getByRole('link', { name: /react/i })).toBeVisible();
    });

    test('increments count when button is clicked', async ({ mount }) => {
        const component = await mount(<App />);

        const button = component.getByRole('button', { name: /count is 0/i });
        await expect(button).toBeVisible();

        await button.click();
        await expect(component).toHaveText(/count is 1/i);
    });

    test('renders HMR instructions', async ({ mount }) => {
        const component = await mount(<App />);

        await expect(component).toContainText('Edit src/App.tsx and save to test HMR');
        await expect(component.getByText('Click on the Vite and React logos to learn more')).toBeVisible();
    });
});
