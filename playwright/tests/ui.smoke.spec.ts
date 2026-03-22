import { test, expect } from '@playwright/test';

test.describe('OWASP Juice Shop - UI Smoke Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Dismiss welcome modal if present
    const dismiss = page.locator('button:has-text("Dismiss")');
    if (await dismiss.isVisible()) {
      await dismiss.click();
    }
  });

  test('homepage loads successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/OWASP Juice Shop/i);
  });

  test('product grid is visible', async ({ page }) => {
    const dismiss = page.locator('button:has-text("Dismiss")');
    if (await dismiss.isVisible()) await dismiss.click();
    await expect(page.locator('mat-grid-tile').first()).toBeVisible({ timeout: 10000 });
  });

  test('navigation menu is present', async ({ page }) => {
    await expect(page.locator('mat-toolbar.navbar-toolbar')).toBeVisible({ timeout: 10000 });
  });

  test('search bar is present', async ({ page }) => {
    await expect(page.locator('#searchQuery')).toBeVisible({ timeout: 10000 });
  });

  test('account menu is present', async ({ page }) => {
    await expect(page.locator('#navbarAccount')).toBeVisible();
  });

  test('search returns results', async ({ page }) => {
    await page.locator('#searchQuery').click();
    await page.keyboard.type('apple');
    await page.keyboard.press('Enter');
    await expect(page.locator('mat-card').first()).toBeVisible();
  });

  test('login page loads', async ({ page }) => {
    await page.goto('/#/login');
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
  });

  test('login form has submit button', async ({ page }) => {
    await page.goto('/#/login');
    await expect(page.locator('#loginButton')).toBeVisible();
  });

  test('registration page loads', async ({ page }) => {
    await page.goto('/#/register');
    await expect(page.locator('#emailControl')).toBeVisible();
  });

  test('about page loads', async ({ page }) => {
    await page.goto('/#/about');
    await expect(page.locator('app-about')).toBeVisible();
  });

});
