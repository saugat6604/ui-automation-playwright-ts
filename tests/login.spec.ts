import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import loginData from '../test-data/loginDataNew.json';

loginData.forEach((data) => {

  if (data.run !== 'yes') return;

  test(`Login Test - ${data.username || 'empty fields'}`, async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.gotoLoginPage();

    await loginPage.login(data.username, data.password);

    //  SUCCESS CASE
    if (data.expected === 'success') {
      await expect(page).toHaveURL(/dashboard/);
    }

    //  WRONG PASSWORD / LOGIN ERROR
    else if (data.expected === 'error') {
      await expect(await loginPage.getIncorrectPasswordErrorMessage()).toBeVisible();
    }

    // EMPTY EMAIL + PASSWORD CASE
    else if (data.expected === 'empty_fields') {
      await loginPage.login("", ""); // click without filling anything

      await expect(await loginPage.getEmptyEmailErrorMessage()).toBeVisible();
      await expect(await loginPage.getEmptyPasswordErrorMessage()).toBeVisible();
    }

  });

});