import { BasePage } from "../../core/basePage";

export class SalesforceLoginPage extends BasePage{

    async login(username:string, password:string){
        await this.page.fill('#username', username);
        await this.page.fill('#password', password);
        await this.page.click('#Login');
        await this.waitForLightning();
    }
}