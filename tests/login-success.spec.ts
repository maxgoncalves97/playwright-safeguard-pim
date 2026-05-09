import { test, expect } from '@playwright/test';
import { LoginOrangeHRM } from '../pages/login';

test('Successful login', async ({ page }) => {
  const loginPage = new LoginOrangeHRM(page);

  await loginPage.loginHomepage(process.env.TEST_USERNAME!, process.env.TEST_PASSWORD!);
  await loginPage.validLogin();
});
