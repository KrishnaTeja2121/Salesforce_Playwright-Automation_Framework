import { test, expect } from '@playwright/test';
import { SalesforceApiClient } from '../../src/api/salesforceClient';
import { soql } from '../../src/api/soqlQueries';
import type { LeadQueryRecord } from '../../src/api/types';

test.describe('Salesforce Lead API tests', () => {
    let api: SalesforceApiClient;
    let leadId: string | null = null;
    const leadEmail = `api.user.${Date.now()}@test.com`;

    test.beforeAll(async () => {
        api = new SalesforceApiClient();
        await api.init();
    });

    test.afterAll(async () => {
        if (leadId) {
            await api.deleteLead(leadId);
        }
    });

    test('Create Lead via API', async () => {
        const response = await api.createLead({
            FirstName: 'API',
            LastName: 'User',
            Company: 'Playwright Inc',
            Email: leadEmail,
        });

        expect(response.status).toBe(201);
        leadId = response.data.id;
    });

    test('Validate Lead using SOQL', async () => {
        const response = await api.query<LeadQueryRecord>(
            soql.leadByEmail(leadEmail)
        );

        expect(response.data.records.length).toBe(1);
        expect(response.data.records[0]?.Status).toBeDefined();
    });

    test('Update Lead via API', async () => {
        expect(leadId).toBeTruthy();

        const response = await api.updateLead(leadId!, {
            Company: 'Updated Company',
        });

        expect(response.status).toBe(204);
    });

    test('Delete Lead via API', async () => {
        expect(leadId).toBeTruthy();

        const response = await api.deleteLead(leadId!);
        expect(response.status).toBe(204);
        leadId = null;
    });
});
