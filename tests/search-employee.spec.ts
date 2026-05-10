import { test, expect } from '@playwright/test';
import { LoginOrangeHRM } from '../pages/login';
import { PimPage } from '../pages/pim';

test.describe.configure({ mode: 'serial' });

test('Login and search for an existing employee by name', async ({ page }) => {
  const loginPage = new LoginOrangeHRM(page);
  const PIMPage = new PimPage(page);
  const employeeId = page.getByText('0424');

  await loginPage.loginHomepage(process.env.TEST_USERNAME!, process.env.TEST_PASSWORD!);
  await loginPage.validLogin();
  await PIMPage.gotoPIMPage();
  await PIMPage.searchEmployeeByName('SearchEmployee', 'Max SearchEmployee', '0424');
  await expect(employeeId).toBeVisible();
});

test('Login and search for an existing employee by id', async ({ page }) => {
  const loginPage = new LoginOrangeHRM(page);
  const PIMPage = new PimPage(page);
  const employeeId = page.getByText('0424');

  await loginPage.loginHomepage(process.env.TEST_USERNAME!, process.env.TEST_PASSWORD!);
  await loginPage.validLogin();
  await PIMPage.gotoPIMPage();
  await PIMPage.searchEmployeeById('0424');
  await expect(employeeId).toBeVisible();
});