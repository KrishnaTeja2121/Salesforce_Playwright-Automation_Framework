import axios from 'axios';
import { getApiEnv } from '../core/env';
import type { SalesforceOAuthResponse } from './types';

export async function getSalesforceAccessToken(): Promise<SalesforceOAuthResponse> {
    const env = getApiEnv();
    const url = `${env.baseUrl}/services/oauth2/token`;

    const params = new URLSearchParams({
        grant_type: 'password',
        client_id: env.clientId,
        client_secret: env.clientSecret,
        username: env.username,
        password: env.password + env.securityToken,
    });

    const response = await axios.post<SalesforceOAuthResponse>(url, params);
    return response.data;
}
