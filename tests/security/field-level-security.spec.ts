import { test, expect } from '@playwright/test';

test('Standard user cannot see Annual Revenue field', async ({ browser, baseURL }) => {
  const hasStandardUserUiEnv =
    Boolean(baseURL) &&
    Boolean(process.env.SF_STD_USERNAME) &&
    Boolean(process.env.SF_STD_PASSWORD) &&
    Boolean(process.env.SF_STD_TOKEN);

  test.skip(
    !hasStandardUserUiEnv,
    'Skipping: Salesforce standard-user UI credentials are not configured.'
  );

  const salesforceBaseUrl = baseURL;
  if (!salesforceBaseUrl) {
    test.fail(true, 'Expected Salesforce base URL to be available for the security test.');
    return;
  }

  const standardUsername = process.env.SF_STD_USERNAME;
  const standardPassword = process.env.SF_STD_PASSWORD;
  const standardToken = process.env.SF_STD_TOKEN;

  if (!standardUsername || !standardPassword || !standardToken) {
    test.fail(true, 'Expected standard-user credentials to be available for the security test.');
    return;
  }

  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(salesforceBaseUrl);
    await page.fill('#username', standardUsername);
    await page.fill(
      '#password',
      `${standardPassword}${standardToken}`
    );
    await page.click('#Login');
    await page.waitForURL(/lightning/);
    await page.goto('/lightning/r/Account/new');

    const annualRevenue = page.locator('input[name="AnnualRevenue"]');
    await expect(annualRevenue).toHaveCount(0);
  } finally {
    await context.close();
  }
});
