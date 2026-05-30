import { Page, Locator } from '@playwright/test'

export class SignUpPage {

    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly singupButton: Locator;
    readonly invalidEmailText: string;
    readonly emptyEmail: Locator;
    readonly emptyPassword: Locator;

    constructor(page: Page) {
        this.page = page;
        this.username = page.locator('#email');
        this.password = page.locator('#password');
        this.singupButton = page.locator("//button[@type='submit']");
        this.invalidEmailText = 'Bad Request Exception';
        this.emptyPassword = page.locator("//div[contains(text(),'Password is required !!')]");
        this.emptyEmail = page.locator("//div[contains(text(),'Email is required !!')]");


    }
    async gotoSingnupPage() {
        await this.page.goto('/signup');
    }


    async getIncorrectEmailErrorMessage() {
        return this.page.getByText(this.invalidEmailText);
    }

    async signup(user: string, pass: string) {
        await this.username.fill(user);
        await this.password.fill(pass);
        await this.singupButton.click();
    }

    getEmptyPasswordErrorMessage() {
        return this.emptyPassword;
    }
    getEmptyEmailErrorMessage() {
        return this.emptyEmail;
    }



}