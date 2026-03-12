import { defineConfig } from '@playwright/test';
import { getOptionalUiEnv, loadEnv } from './src/core/env';

loadEnv();
const uiEnv = getOptionalUiEnv();

export default defineConfig({
  testDir: './tests',
  timeout: 60 * 1000,
  globalSetup: './src/auth/globalSetup.ts',
  expect: {
    timeout: 10 * 1000,
  },
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
  ],
  use: {
    baseURL: uiEnv?.baseUrl,
    storageState: 'src/auth/storageState.json',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: process.env.CI
    ? [
        {
          name: 'chromium',
          use: { browserName: 'chromium' },
        },
      ]
    : [
        {
          name: 'chromium',
          use: { browserName: 'chromium' },
        },
        {
          name: 'firefox',
          use: { browserName: 'firefox' },
        },
        {
          name: 'webkit',
          use: { browserName: 'webkit' },
        },
      ],
});
