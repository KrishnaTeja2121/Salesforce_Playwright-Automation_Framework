import fs from 'fs';
import path from 'path';
import { chromium, type FullConfig } from '@playwright/test';
import { getOptionalUiEnv } from '../core/env';

const STORAGE_STATE = path.resolve(__dirname, 'storageState.json');

async function globalSetup(config: FullConfig) {
  void config;
  const env = getOptionalUiEnv();
  if (!env) {
    fs.writeFileSync(STORAGE_STATE, JSON.stringify({ cookies: [], origins: [] }), 'utf8');
    console.warn('Skipping Salesforce UI login in global setup: required env vars are missing.');
    return;
  }

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(env.baseUrl);
    await page.fill('#username', env.username);
    await page.fill('#password', `${env.password}${env.securityToken}`);
    await page.click('#Login');
    await page.waitForURL(/lightning/);
    await page.waitForLoadState('networkidle');
    await context.storageState({ path: STORAGE_STATE });
  } finally {
    await browser.close();
  }
}

export default globalSetup;
