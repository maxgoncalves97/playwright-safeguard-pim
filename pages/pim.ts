import { test, expect, Locator, Page } from '@playwright/test';

export class PimPage {
  readonly page: Page;
  readonly pim: Locator;
  readonly PIMHeader: Locator;
  readonly photoReqs: Locator;
  readonly addEmployeeButton: Locator;
  readonly employeeFirstName: Locator;
  readonly employeeMiddleName: Locator;
  readonly employeeLastName: Locator;
  readonly saveButton: Locator;
  readonly savedEmployeeMessage: Locator;
  readonly mandatoryFieldRequired: Locator;

  readonly searchName: Locator;
  readonly searchButton: Locator;
  readonly searchId: Locator;


  constructor(page: Page) {
    this.page = page;
    this.pim = page.getByText('PIM', { exact: true });
    this.PIMHeader = page.getByRole('heading', { name: 'PIM' })
    this.photoReqs = page.getByText('Accepts jpg, .png, .gif up to 1MB. Recommended dimensions: 200px X 200px', { exact: true })
    this.addEmployeeButton = page.getByText('Add Employee', { exact: true })
    this.employeeFirstName = page.getByRole('textbox', { name: 'First Name' });
    this.employeeMiddleName = page.getByRole('textbox', { name: 'Middle Name' });
    this.employeeLastName = page.getByRole('textbox', { name: 'Last Name' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.savedEmployeeMessage = page.getByText('Successfully saved');
    this.mandatoryFieldRequired = page.getByText('Required', { exact: true })

    this.searchName = page.locator("//div[@class='oxd-grid-4 orangehrm-full-width-grid']//div[1]//div[1]//div[2]//div[1]//div[1]//input[1]");
    this.searchId = page.locator("//div[@class='oxd-input-group oxd-input-field-bottom-space']//div//input[@class='oxd-input oxd-input--active']");
    this.searchButton = page.getByRole('button', { name: 'Search' });
  }

  async gotoPIMPage() {
    await expect(this.pim).toBeVisible();
    await this.pim.click();
    await expect(this.PIMHeader).toBeVisible();
  }

  async gotoAddEmployee() {
    await expect(this.addEmployeeButton).toBeVisible();
    await this.addEmployeeButton.click();
    await expect(this.photoReqs).toBeVisible();
  }

  async addEmployeeFullName(firstName: string, middleName: string, lastName: string) {
    await this.gotoAddEmployee();

    await this.employeeFirstName.fill(firstName);
    await this.employeeMiddleName.fill(middleName);
    await this.employeeLastName.fill(lastName);
    await this.saveButton.click();
  }

  async successfulEmployeeCreation(firstName: string, lastName: string) {
    await expect(this.page.getByRole('heading', { name: `${firstName} ${lastName}` })).toBeVisible();
  }

  async fieldRequired() {
    await expect(this.mandatoryFieldRequired).toBeVisible();
  }

  async searchEmployeeByName(employeeName: string, employeeFullName: string, employeeId: string) {
    const employeeResult = this.page.getByText(employeeFullName);
    const resultFound = this.page.getByText('(1) Record Found', { exact: true });
    const employeeIdNumber = this.page.getByText(employeeId);

    await this.searchName.fill(employeeName);
    await expect(employeeResult).toBeVisible();
    await employeeResult.click();
    await this.searchButton.click();
    await expect(resultFound).toBeVisible();
    await expect(employeeIdNumber).toBeVisible();
  }

  async searchEmployeeById(employeeId: string) {
    const resultFound = this.page.getByText('(1) Record Found', { exact: true });
    const employeeIdNumber = this.page.getByText(employeeId);


    await this.searchId.fill(employeeId);
    await this.searchButton.click();
    await expect(resultFound).toBeVisible();
    await expect(employeeIdNumber).toBeVisible();
  }
}