// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Home page', () => {
  test.beforeAll(async ({page}) => {
    await page.goto('/');
  })
  test('has title', async ({ page }) => {
      await expect(page).toHaveTitle(/Home/);
  })
  test('has navbar', async ({ page }) => {
    await expect(page).toHaveTitle(/Home/);
  });
});


// test('implement someone to play last card', async ({ page }) => {
//   await page.goto('http://localhost:6969');
//   const locator = page.getByRole('button', { name: 'join' });
//   await locator.hover();
//   await locator.click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
