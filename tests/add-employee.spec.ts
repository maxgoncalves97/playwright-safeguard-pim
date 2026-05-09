import { test, expect } from '@playwright/test';
import { LoginOrangeHRM } from '../pages/login';

test('Login and add an employee on PIM page', async ({ page }) => {
  const loginPage = new LoginOrangeHRM(page);

  await loginPage.loginHomepage(process.env.TEST_USERNAME!, process.env.TEST_PASSWORD!);
  await loginPage.validLogin();
});
