import test, { expect } from '@playwright/test';

test('Salesforce home page loads (authenticated)', async ({ page, baseURL }) => {
  test.skip(!baseURL, 'Skipping: SF_BASE_URL is not configured.');

  await page.goto('/lightning/page/home');
  await expect(page).toHaveURL(/lightning/);
});
