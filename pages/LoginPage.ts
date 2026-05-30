import { Page, Locator } from '@playwright/test'

export class LoginPage {

    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly invalidPasswordText: string;
    readonly emptyEmail: Locator;
    readonly emptyPassword: Locator;

    constructor(page: Page) {
        this.page = page;
        this.username = page.locator('#email');
        this.password = page.locator('#password');
        this.loginButton = page.locator("//button[@type='submit']");
        this.invalidPasswordText = 'Invalid password!';
        this.emptyEmail = page.locator("//div[contains(text(),'Please enter valid email !!')]");
        this.emptyPassword = page.locator("//div[contains(text(),'Please enter valid email !!')]")
    }

    async gotoLoginPage() {
        await this.page.goto('/login');
    }

    async login(user: string, pass: string) {
        await this.username.fill(user);
        await this.password.fill(pass);
        await this.loginButton.click();
    }

    async getIncorrectPasswordErrorMessage() {
        return this.page.getByText(this.invalidPasswordText);
    }

    async getEmptyEmailErrorMessage() {
        return this.emptyEmail;
    }
    async getEmptyPasswordErrorMessage() {
        return this.emptyPassword;
    }
}