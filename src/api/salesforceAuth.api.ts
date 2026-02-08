import axios from 'axios';
import { env } from '../core/env';

interface oAuthResponse {
    access_token: string;
    instance_url: string;
}

export async function getSalesforceAccessToken(): Promise<oAuthResponse> {
    const url = `${env.sfBaseUrl}/services/oauth2/token`;

    const params = new URLSearchParams({
        grant_type: 'password',
        client_id: process.env.SF_CLIENT_ID!,
        client_secret: process.env.SF_CLIENT_SECRET!,
        username: env.sfUsername,
        password: env.sfPassword + env.sfSecurityToken,

    });

    const response = await axios.post(url, params);
    return response.data;
}