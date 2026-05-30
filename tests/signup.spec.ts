import { expect, test } from '@playwright/test';
import { SignUpPage } from '../pages/SignupPage';
import loginData from '../test-data/signupData.json';

loginData.forEach((data) => {

  if (data.run !== 'yes') return;

  test(`Signup Test - ${data.username || 'empty fields'}`, async ({ page }) => {

    const signupPage = new SignUpPage(page);

    await signupPage.gotoSingnupPage();

    await signupPage.signup(data.username, data.password);

     if (data.expected === 'success') {
      await expect(page).toHaveURL(/choose-tags/);
    }

    //  Invalid email / SIGNUP ERROR
    else if (data.expected === 'error') {
      await expect(await signupPage.getIncorrectEmailErrorMessage()).toBeVisible();
    }

    // EMPTY EMAIL + PASSWORD CASE
    else if (data.expected === 'empty_fields') {
      await signupPage.signup("", ""); // click without filling anything

      await expect(await signupPage.getEmptyEmailErrorMessage()).toBeVisible();
      await expect(await signupPage.getEmptyPasswordErrorMessage()).toBeVisible();
    }


   });

});