import { Page } from "@playwright/test";

export abstract class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async naviagate(path:string){
        await this.page.goto(path);
    }

    async waitForLightning(){
        await this.page.waitForLoadState('networkidle');
    }
}