import { test, expect } from '@playwright/test';
import { LeadToOpportunityFlow } from '../../src/flows/leadToOpportunity.flow';
import { SalesforceApiClient } from '../../src/api/salesforceClient';
import type { LeadQueryRecord, OpportunityQueryRecord } from '../../src/api/types';

test('Lead to Opportunity E2E flow', async ({ page }) => {
  const flow = new LeadToOpportunityFlow(page);
  const api = new SalesforceApiClient();
  let leadId: string | null = null;
  let opportunityId: string | null = null;

  await api.init();

  try {
    const flowResult = await flow.execute();
    leadId = flowResult.leadId;

    const leadResponse = await api.query<LeadQueryRecord>(
      `SELECT Id, IsConverted, ConvertedOpportunityId FROM Lead WHERE Id='${leadId}'`
    );

    expect(leadResponse.data.records.length).toBe(1);
    expect(leadResponse.data.records[0]?.IsConverted).toBe(true);

    opportunityId = leadResponse.data.records[0]?.ConvertedOpportunityId ?? null;
    expect(opportunityId).toBeTruthy();

    const opportunityResponse = await api.query<OpportunityQueryRecord>(
      `SELECT Id, Name FROM Opportunity WHERE Id='${opportunityId}'`
    );
    expect(opportunityResponse.data.records.length).toBe(1);
  } finally {
    if (opportunityId) {
      await api.deleteOpportunity(opportunityId).catch(() => undefined);
    }

    if (leadId) {
      await api.deleteLead(leadId).catch(() => undefined);
    }
  }
});
