import { test, expect } from '@playwright/test';
import axios from 'axios';
import { SalesforceApiClient } from '../../src/api/salesforceClient';
import { getStandardUser } from '../../src/security/userContext';
import type { SalesforceOAuthResponse } from '../../src/api/types';

test('Standard user cannot delete Lead', async () => {
  test.skip(
    !process.env.SF_BASE_URL ||
      !process.env.SF_USERNAME ||
      !process.env.SF_PASSWORD ||
      !process.env.SF_SECURITY_TOKEN ||
      !process.env.SF_CLIENT_ID ||
      !process.env.SF_CLIENT_SECRET ||
      !process.env.SF_STD_USERNAME ||
      !process.env.SF_STD_PASSWORD ||
      !process.env.SF_STD_TOKEN,
    'Skipping: Salesforce API credentials are not fully configured.'
  );

  const standardUser = getStandardUser();
  const adminClient = new SalesforceApiClient();
  await adminClient.init();

  const createResponse = await adminClient.createLead({
    FirstName: 'Security',
    LastName: 'User',
    Company: 'Playwright QA',
    Email: `security_${Date.now()}@test.com`,
  });

  expect(createResponse.status).toBe(201);
  const leadId = createResponse.data.id;

  const tokenResponse = await axios.post<SalesforceOAuthResponse>(
    `${process.env.SF_BASE_URL}/services/oauth2/token`,
    new URLSearchParams({
      grant_type: 'password',
      client_id: process.env.SF_CLIENT_ID!,
      client_secret: process.env.SF_CLIENT_SECRET!,
      username: standardUser.username,
      password: standardUser.password + standardUser.securityToken,
    })
  );

  const client = axios.create({
    baseURL: `${tokenResponse.data.instance_url}/services/data/v59.0`,
    headers: {
      Authorization: `Bearer ${tokenResponse.data.access_token}`,
    },
  });

  try {
    const response = await client.delete(`/sobjects/Lead/${leadId}`, {
      validateStatus: () => true,
    });

    expect(response.status).toBe(403);
  } finally {
    await adminClient.deleteLead(leadId);
  }
});
