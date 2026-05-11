import { test, expect } from '@playwright/test';
import { LoginOrangeHRM } from '../pages/login';
import { PimPage } from '../pages/pimPage';

test.describe.configure({ mode: 'serial' });

test('Login and search for an existing employee by name', async ({ page }) => {
    const loginPage = new LoginOrangeHRM(page);
    const PIMPage = new PimPage(page);
    const randomNumber = Math.floor(10000 + Math.random() * 90000);
    const firstName = 'Max';
    const lastName = `SearchEmployee${randomNumber}`;

    await loginPage.loginHomepage(process.env.TEST_USERNAME!, process.env.TEST_PASSWORD!);
    await loginPage.validLogin();
    await PIMPage.gotoPIMPage();
    await PIMPage.gotoAddEmployee();
    await PIMPage.addEmployeeFullName(firstName, lastName);

    const employeeId = await PIMPage.getEmployeeId();

    await PIMPage.getEmployeeId();
    await PIMPage.saveCreatedEmployee();
    await PIMPage.successfulEmployeeCreation(firstName, lastName);
    await PIMPage.searchEmployeeByName(lastName);
    await expect(page.getByText(employeeId)).toBeVisible();
});

test('Login and search for an existing employee by id', async ({ page }) => {
    const loginPage = new LoginOrangeHRM(page);
    const PIMPage = new PimPage(page);
    const randomNumber = Math.floor(10000 + Math.random() * 90000);
    const firstName = 'Max';
    const lastName = `SearchEmployee${randomNumber}`;

    await loginPage.loginHomepage(process.env.TEST_USERNAME!, process.env.TEST_PASSWORD!);
    await loginPage.validLogin();
    await PIMPage.gotoPIMPage();
    await PIMPage.gotoAddEmployee();
    await PIMPage.addEmployeeFullName(firstName, lastName);

    const employeeId = await PIMPage.getEmployeeId();

    await PIMPage.getEmployeeId();
    await PIMPage.saveCreatedEmployee();
    await PIMPage.successfulEmployeeCreation(firstName, lastName);
    await PIMPage.searchEmployeeById(employeeId);
    await expect(page.getByText(employeeId)).toBeVisible();
    await expect(page.getByText(lastName)).toBeVisible();
});