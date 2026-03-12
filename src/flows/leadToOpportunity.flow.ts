import { Page } from '@playwright/test';
import { SalesforceApiClient } from '../api/salesforceClient';
import type { SalesforceLeadPayload } from '../api/types';
import { LeadPage } from '../ui/salesCloud/lead.page';

export class LeadToOpportunityFlow {
    private readonly api: SalesforceApiClient;
    private readonly leadPage: LeadPage;

    constructor(page: Page) {
        this.api = new SalesforceApiClient();
        this.leadPage = new LeadPage(page);
    }

    async execute(leadPayload?: SalesforceLeadPayload) {
        await this.api.init();
        const payload: SalesforceLeadPayload = leadPayload ?? {
            FirstName: 'E2E',
            LastName: 'Flow',
            Company: `Salesforce QA ${Date.now()}`,
            Email: `e2e_${Date.now()}@test.com`,
        };
        const leadResponse = await this.api.createLead(payload);
        const leadId = leadResponse.data.id;

        await this.leadPage.openLeadById(leadId);
        await this.leadPage.convertLead();

        return { leadId, email: payload.Email };
    }
}
