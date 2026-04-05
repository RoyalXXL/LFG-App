import { test, expect } from '@playwright/test';

test('landing has main CTA', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Browse game hubs' })).toBeVisible();
});
