import { expect, Locator, Page } from '@playwright/test';

export class LoginOrangeHRM {
    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly invalidCredentials: Locator;

    constructor(page: Page) {
        this.page = page;
        this.username = page.getByRole('textbox', { name: 'Username' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.invalidCredentials = page.getByText('Invalid credentials', { exact: true });
    }

    async loginHomepage(user: string, pass: string) {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        await this.username.fill(user);
        await this.password.fill(pass);
        await this.loginButton.click();
    }

    async validLogin() {
        await expect(this.page).toHaveTitle('OrangeHRM');
    }

    async invalidLogin() {
        await expect(this.invalidCredentials).toBeVisible();
    }
}
