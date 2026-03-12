import path from 'path';
import { chromium } from '@playwright/test';
import { getUiEnv } from '../core/env';

const STORAGE_STATE = path.resolve(__dirname, 'storageState.json');

export async function createSalesforceSession() {
    const env = getUiEnv();
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(env.baseUrl);
    await page.fill('#username', env.username);
    await page.fill('#password', env.password + env.securityToken);
    await page.click('#Login');
    await page.waitForURL(/lightning/);
    await page.waitForLoadState('networkidle');

    await context.storageState({ path: STORAGE_STATE });
    await browser.close();

    console.log('Salesforce session stored');
}
