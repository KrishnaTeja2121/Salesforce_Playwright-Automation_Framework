import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import { getSalesforceAccessToken } from './salesforceAuth.api';
import type {
    SalesforceCreateResponse,
    SalesforceLeadPayload,
    SalesforceQueryResponse,
} from './types';

export class SalesforceApiClient {
    private client!: AxiosInstance;

    async init() {
        const auth = await getSalesforceAccessToken();
        this.client = axios.create({
            baseURL: `${auth.instance_url}/services/data/v59.0`,
            headers: {
                Authorization: `Bearer ${auth.access_token}`,
                'Content-Type': 'application/json',
            },
        });
    }

    async createLead(payload: SalesforceLeadPayload): Promise<AxiosResponse<SalesforceCreateResponse>> {
        return this.client.post<SalesforceCreateResponse>('/sobjects/Lead', payload);
    }

    async getLead(id: string): Promise<AxiosResponse> {
        return this.client.get(`/sobjects/Lead/${id}`);
    }

    async updateLead(id: string, payload: Partial<SalesforceLeadPayload>): Promise<AxiosResponse> {
        return this.client.patch(`/sobjects/Lead/${id}`, payload);
    }

    async deleteLead(id: string): Promise<AxiosResponse> {
        return this.client.delete(`/sobjects/Lead/${id}`);
    }

    async deleteOpportunity(id: string): Promise<AxiosResponse> {
        return this.client.delete(`/sobjects/Opportunity/${id}`);
    }

    async query<TRecord>(soql: string): Promise<AxiosResponse<SalesforceQueryResponse<TRecord>>> {
        return this.client.get<SalesforceQueryResponse<TRecord>>(`/query?q=${encodeURIComponent(soql)}`);
    }
}
