import { test, expect } from '@playwright/test';
import { LeadToOpportunityFlow } from '../../src/flows/leadToOpportunity.flow';
import { SalesforceApiClient } from '../../src/api/salesforceClient';


test('Lead to Opportunity E2E flow', async({page})=>{

    const flow = new LeadToOpportunityFlow(page);
  const api = new SalesforceApiClient();

  const { leadId } = await flow.execute();

   // 3️⃣ API – Validate Opportunity
  await api.init();
  const leadResponse = await api.query(
    `SELECT Id, IsConverted, ConvertedOpportunityId FROM Lead WHERE Id='${leadId}'`
  );

  expect(leadResponse.data.records.length).toBe(1);
  expect(leadResponse.data.records[0].IsConverted).toBe(true);

  const opportunityId = leadResponse.data.records[0].ConvertedOpportunityId;
  expect(opportunityId).toBeTruthy();

  const opportunityResponse = await api.query(
    `SELECT Id, Name FROM Opportunity WHERE Id='${opportunityId}'`
  );
  expect(opportunityResponse.data.records.length).toBe(1);

});
