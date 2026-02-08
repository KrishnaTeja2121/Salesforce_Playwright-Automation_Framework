import { SalesforceApiClient } from '../api/salesforceClient';
import { LeadPage } from '../ui/salesCloud/lead.page';
import { Page } from '@playwright/test';


export class LeadToOpportunityFlow{
    private api:SalesforceApiClient;
    private leadPage:LeadPage;

    constructor(page:Page){
        this.api=new SalesforceApiClient();
        this.leadPage=new LeadPage(page);
    }

    async execute(){
        await this.api.init();
        const leadResponse = await this.api.createLead({
      FirstName: 'E2E',
      LastName: 'Flow',
      Company: 'Salesforce QA',
      Email: `e2e_${Date.now()}@test.com`,
    });
    const leadId = leadResponse.data.id;

    await this.leadPage.openLeadById(leadId);
    await this.leadPage.convertLead();

    return {leadId};
    }
}