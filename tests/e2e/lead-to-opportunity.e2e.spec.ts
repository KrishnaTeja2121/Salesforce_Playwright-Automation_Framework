import { test, expect } from '@playwright/test';
import { LeadToOpportunityFlow } from '../../src/flows/leadToOpportunity.flow';
import { SalesforceApiClient } from '../../src/api/salesforceClient';


test('Lead to Opportunity E2E flow', async({page})=>{

    const flow = new LeadToOpportunityFlow(page);
  const api = new SalesforceApiClient();

  const { leadId } = await flow.execute();

   // 3️⃣ API – Validate Opportunity
  await api.init();
  const response = await api.query(
    `SELECT Id, Name FROM Opportunity WHERE Lead__c='${leadId}'`
  );

  expect(response.data.records.length).toBeGreaterThan(0);

});