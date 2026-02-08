import { chromium } from "@playwright/test";
import { env } from '../core/env';
import path from 'path';

const STORAGE_STATE = path.resolve(__dirname, 'storageState.json');

export async function createSalesforceSession() {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(env.sfBaseUrl);

    await page.fill('#username', env.sfUsername);
    await page.fill('#password', env.sfPassword + env.sfSecurityToken);
    await page.click('#Login');

    // Wait for Lightning to fully load
    await page.waitForURL(/lightning/);
    await page.waitForLoadState('networkidle');

    await context.storageState({ path: STORAGE_STATE });
    await browser.close();

    console.log('✅ Salesforce session stored');

}