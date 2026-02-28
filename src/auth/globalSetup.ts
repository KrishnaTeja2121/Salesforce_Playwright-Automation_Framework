import type { FullConfig } from '@playwright/test';
import { chromium } from '@playwright/test';
import path from 'path';
import fs from 'fs';

const STORAGE_STATE = path.resolve(__dirname, 'storageState.json');

function hasUiAuthEnv(): boolean {
  return Boolean(
    process.env.SF_BASE_URL &&
      process.env.SF_USERNAME &&
      process.env.SF_PASSWORD &&
      process.env.SF_SECURITY_TOKEN
  );
}

async function globalSetup(_config: FullConfig) {
  if (!hasUiAuthEnv()) {
    fs.writeFileSync(STORAGE_STATE, JSON.stringify({ cookies: [], origins: [] }), 'utf8');
    console.warn('Skipping Salesforce UI login in global setup: required env vars are missing.');
    return;
  }

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(process.env.SF_BASE_URL!);
    await page.fill('#username', process.env.SF_USERNAME!);
    await page.fill('#password', `${process.env.SF_PASSWORD!}${process.env.SF_SECURITY_TOKEN!}`);
    await page.click('#Login');
    await page.waitForURL(/lightning/);
    await page.waitForLoadState('networkidle');
    await context.storageState({ path: STORAGE_STATE });
  } finally {
    await browser.close();
  }
}

export default globalSetup;
