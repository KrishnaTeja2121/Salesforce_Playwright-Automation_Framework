import { test, expect } from '@playwright/test';
import { SalesforceApiClient } from '../../src/api/salesforceClient';
import { soql } from '../../src/api/soqlQueries';


test.describe('Salesforce Lead API tests', () => {
    let api: SalesforceApiClient;
    let leadId: string;

    test.beforeAll(async () => {
        api = new SalesforceApiClient();
        await api.init();
    });

    test('Create Lead via API', async () => {

        const response = await api.createLead({
            FirstName: 'API',
            LastName: 'User',
            Company: 'Playwright Inc',
            Email: 'api.user@test.com',
        });

        expect(response.status).toBe(201);
        leadId = response.data.id;
    });

    test('Validate Lead using SOQL', async () => {
        const response = await api.query(
            soql.leadByEmail('api.user@test.com')
        );

        expect(response.data.records.length).toBe(1);
        expect(response.data.records[0].Status).toBeDefined();

    });

    test('Update Lead via API', async () => {
        const response = await api.updateLead(leadId, {
            Company: 'Updated Company',
        });

        expect(response.status).toBe(204);
    });

    test('Delete Lead via API', async () => {
        const response = await api.deleteLead(leadId);
        expect(response.status).toBe(204);
    });
});