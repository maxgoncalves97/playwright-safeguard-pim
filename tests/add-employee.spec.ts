import { test, expect } from '@playwright/test';
import { LoginOrangeHRM } from '../pages/login';
import { PimPage } from '../pages/pim';

test.describe.configure({ mode: 'serial' });

test('Login and add an employee on PIM page', async ({ page }) => {
  const loginPage = new LoginOrangeHRM(page);
  const PIMPage = new PimPage(page);
  const firstName = 'Max';
  const lastName = 'Last';

  await loginPage.loginHomepage(process.env.TEST_USERNAME!, process.env.TEST_PASSWORD!);
  await loginPage.validLogin();
  await PIMPage.gotoPIMPage();
  await PIMPage.addEmployeeFullName(firstName, 'Middle', lastName);
  await PIMPage.successfulEmployeeCreation(firstName, lastName);
});

test('Login and add an employee with no first name', async ({ page }) => {
  const loginPage = new LoginOrangeHRM(page);
  const PIMPage = new PimPage(page);
  const lastName = 'LastName';

  await loginPage.loginHomepage(process.env.TEST_USERNAME!, process.env.TEST_PASSWORD!);
  await loginPage.validLogin();
  await PIMPage.gotoPIMPage();
  await PIMPage.addEmployeeFullName('', 'Middle', lastName);
  await PIMPage.fieldRequired();
});

test('Login and add an employee with no last name', async ({ page }) => {
  const loginPage = new LoginOrangeHRM(page);
  const PIMPage = new PimPage(page);
  const firstName = 'FirstName';

  await loginPage.loginHomepage(process.env.TEST_USERNAME!, process.env.TEST_PASSWORD!);
  await loginPage.validLogin();
  await PIMPage.gotoPIMPage();
  await PIMPage.addEmployeeFullName(firstName, 'Middle', '');
  await PIMPage.fieldRequired();
});