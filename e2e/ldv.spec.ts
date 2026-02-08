import { test, expect } from '@playwright/test';

test.describe('LDV Figma designs', () => {
  test('logo screen (1:17): shows LDV logo, est. MMXV, and background', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('img', { name: 'LDV' })).toBeVisible();
    await expect(page.getByText('est. MMXV').first()).toBeVisible();
    await expect(page.getByText('est. MMXV').last()).toBeVisible();

    const bgStrokes = page.locator('.ldv-logo-screen__bg-strokes');
    await expect(bgStrokes).toHaveAttribute('style', /ldv-bg-strokes\.svg/);
    await expect(page.getByText('Click or press Enter')).toBeVisible();
  });

  test('logo screen: Enter navigates to coming soon', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('img', { name: 'LDV' })).toBeVisible();
    await page.keyboard.press('Enter');

    await expect(page.getByText('COMING SOON')).toBeVisible();
    await expect(page.getByText('LA DOLCE VITA')).toBeVisible();
    await expect(page.getByText('The good life is forever alive')).toBeVisible();
  });

  test('logo screen: click navigates to coming soon', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('img', { name: 'LDV' })).toBeVisible();
    await page.getByRole('button', { name: 'Enter LDV' }).click();

    await expect(page.getByText('COMING SOON')).toBeVisible();
    await expect(page.getByText('LA DOLCE VITA')).toBeVisible();
  });

  test('coming soon page (1:53): hero and email CTA match design', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('img', { name: 'LDV' })).toBeVisible();
    await page.keyboard.press('Enter');

    await expect(page.getByText('COMING SOON')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('LA DOLCE VITA')).toBeVisible();
    await expect(page.getByText('The good life is forever alive')).toBeVisible();

    const emailInput = page.getByPlaceholder('Enter email');
    await expect(emailInput).toBeVisible();
    await expect(emailInput).toBeEditable();
    await expect(page.getByRole('button', { name: 'Submit email' })).toBeVisible();
  });

  test('coming soon (1:53): layout has hero and CTA sections', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('img', { name: 'LDV' })).toBeVisible();
    await page.keyboard.press('Enter');

    const content = page.locator('.coming-soon-page__content');
    await expect(content).toBeVisible({ timeout: 10000 });
    await expect(content.locator('.coming-soon-page__hero')).toBeVisible();
    await expect(content.locator('.coming-soon-page__cta-wrap')).toBeVisible();
    await expect(content.getByPlaceholder('Enter email')).toBeVisible();
  });
});
