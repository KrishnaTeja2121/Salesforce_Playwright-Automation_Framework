import { BasePage } from '../../core/basePage';

export class LeadPage extends BasePage{
    async openLeadById(leadId: string) {
    await this.page.goto(`/lightning/r/Lead/${leadId}/view`);
    await this.waitForLightning();
  }

  async convertLead() {
    await this.page.click('button[name="Convert"]');
    await this.page.waitForSelector('button[name="confirmConvert"]');
    await this.page.click('button[name="confirmConvert"]');
    await this.waitForLightning();
  }

}