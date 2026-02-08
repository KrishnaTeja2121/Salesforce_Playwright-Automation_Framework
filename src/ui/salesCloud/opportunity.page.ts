import { BasePage } from '../../core/basePage';

export class OpportunityPage extends BasePage {

  async isOpportunityVisible() {
    return this.page.locator('records-record-layout').isVisible();
  }
}

