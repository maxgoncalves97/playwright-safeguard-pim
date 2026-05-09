import { test, expect } from '@playwright/test';
import { LoginOrangeHRM } from '../pages/login';

test('Invalid login - Username', async ({ page }) => {
  const loginPage = new LoginOrangeHRM(page);

  await loginPage.loginHomepage('wrongUsername', process.env.TEST_PASSWORD!);
  await loginPage.invalidLogin();
});

test('Invalid login - Password', async ({ page }) => {
  const loginPage = new LoginOrangeHRM(page);

  await loginPage.loginHomepage(process.env.TEST_USERNAME!, 'wrongPassword');
  await loginPage.invalidLogin();
});