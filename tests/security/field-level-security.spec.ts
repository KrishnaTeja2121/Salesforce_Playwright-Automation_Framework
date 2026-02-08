import { test, expect } from '@playwright/test';

test('Standard user cannot see Annual Revenue field', async ({ page }) => {
  await page.goto('/lightning/r/Account/new');

  const annualRevenue = page.locator(
    'input[name="AnnualRevenue"]'
  );

  await expect(annualRevenue).toHaveCount(0);
});


