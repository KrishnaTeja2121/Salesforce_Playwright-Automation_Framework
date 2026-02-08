import test, { expect } from "@playwright/test";
import{SalesforceLoginPage} from '../../src/ui/salesCloud/login.page'
import {env} from '../../src/core/env';


test('Salesforce home page loads (authenticated)', async ({ page }) => {
  await page.goto('/lightning/page/home');
  await expect(page).toHaveURL(/lightning/);
});