import { test, expect } from '@playwright/test';
import axios from 'axios';
import { users } from '../../src/security/userContext';

test('Standard user cannot delete Lead', async () => {
  const tokenResponse = await axios.post(
    `${process.env.SF_BASE_URL}/services/oauth2/token`,
    new URLSearchParams({
      grant_type: 'password',
      client_id: process.env.SF_CLIENT_ID!,
      client_secret: process.env.SF_CLIENT_SECRET!,
      username: users.standard.username,
      password: users.standard.password + users.standard.securityToken,
    })
  );

  const client = axios.create({
    baseURL: `${tokenResponse.data.instance_url}/services/data/v59.0`,
    headers: {
      Authorization: `Bearer ${tokenResponse.data.access_token}`,
    },
  });

  const response = await client.delete('/sobjects/Lead/FAKE_LEAD_ID', {
    validateStatus: () => true,
  });

  expect(response.status).toBe(403);
});
