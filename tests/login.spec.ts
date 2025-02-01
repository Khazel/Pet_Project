import { test, expect } from '@playwright/test';
import { describe } from 'node:test';
import { LoginPage } from '../page-objects/loginPage';

describe('Login Page Tests', () => {

  test('Successful login with valid credentials', async ( {page} ) => {

    const login = new LoginPage(page);

    await login.goToLoginPage();
    await login.login("standard_user", "secret_sauce");

    await expect(page.locator(".app_logo")).toHaveText("Swag Labs");

  });

  test('Login attempt with locked user', async ( {page} ) => {

    const login = new LoginPage(page);

    await login.goToLoginPage();
    await login.login("locked_out_user", "secret_sauce");

    await expect(page.locator('.error-message-container h3')).toHaveText('Epic sadface: Sorry, this user has been locked out.');

  });

  test('Failed login attempt with empty credentials', async ( {page} ) => {

    const login = new LoginPage(page);

    await login.goToLoginPage();
    await login.login("", "");

    await expect(page.locator('.error-message-container h3')).toHaveText('Epic sadface: Username is required');

  });

  test('Failed login attempt with empty username', async ( {page} ) => {

    const login = new LoginPage(page);

    await login.goToLoginPage();
    await login.login("", "secret_sauce");

    await expect(page.locator('.error-message-container h3')).toHaveText('Epic sadface: Username is required');

  });

  test('Failed login attempt with empty password', async ( {page} ) => {

    const login = new LoginPage(page);

    await login.goToLoginPage();
    await login.login("standard_user", "");

    await expect(page.locator('.error-message-container h3')).toHaveText('Epic sadface: Password is required');

  });

  test('Failed login attempt with invalid credentials', async ( {page} ) => {

    const login = new LoginPage(page);

    await login.goToLoginPage();
    await login.login("test_user", "test_password");

    await expect(page.locator('.error-message-container h3')).toHaveText('Epic sadface: Username and password do not match any user in this service');

  });

  test('Failed login attempt with invalid username', async ( {page} ) => {

    const login = new LoginPage(page);

    await login.goToLoginPage();
    await login.login("test_user", "secret_sauce");

    await expect(page.locator('.error-message-container h3')).toHaveText('Epic sadface: Username and password do not match any user in this service');

  });

  test('Failed login attempt with invalid password', async ( {page} ) => {

    const login = new LoginPage(page);

    await login.goToLoginPage();
    await login.login("standard_user", "test_password");

    await expect(page.locator('.error-message-container h3')).toHaveText('Epic sadface: Username and password do not match any user in this service');

  });

})
