import axios, { AxiosInstance } from 'axios';
import { getSalesforceAccessToken } from './salesforceAuth.api';

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

    async createLead(payload:any){
        return this.client.post('/sobjects/Lead',payload);
    }

    async getLead(id:string){
        return this.client.get(`/sobjects/Lead/${id}`);
    }

    async updateLead(id:string, payload:any){
        return this.client.patch(`/sobjects/Lead/${id}`,payload);
    }
    async deleteLead(id:string){
        return this.client.delete(`/sobjects/Lead/${id}`);
    }
    async query(soql:string){
        return this.client.get(`/query?q=${encodeURIComponent(soql)}`);
    }
}
