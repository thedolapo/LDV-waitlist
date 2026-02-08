import { test, expect } from '@playwright/test';

/**
 * Visual regression: frontend must match Figma design.
 * Fixed viewport for consistent screenshots. Run once to create baselines:
 *   npx playwright test visual-regression.spec.ts
 * Then commit e2e/visual-regression.spec.ts-snapshots/
 * Subsequent runs compare against baselines. Update baselines after design changes:
 *   npx playwright test visual-regression.spec.ts --update-snapshots
 */
const VIEWPORT = { width: 1280, height: 720 };

test.describe('Visual regression vs Figma design', () => {
  test.use({ viewport: VIEWPORT });

  test('logo screen (1:17) matches design', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('img', { name: 'LDV' })).toBeVisible();
    await page.waitForTimeout(400);

    await expect(page.locator('.ldv-logo-screen')).toHaveScreenshot('logo-screen-1-17.png', {
      maxDiffPixels: 500,
    });
  });

  test('coming soon page (1:53) matches design', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('img', { name: 'LDV' })).toBeVisible();
    await page.keyboard.press('Enter');
    await expect(page.getByText('COMING SOON')).toBeVisible({ timeout: 10000 });
    await page.waitForTimeout(600);

    await expect(page.locator('.coming-soon-page')).toHaveScreenshot('coming-soon-1-53.png', {
      maxDiffPixels: 1000,
    });
  });
});
