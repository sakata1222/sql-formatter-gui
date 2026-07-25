import { test, expect } from '@playwright/test';

const RAW_SQL = 'select a,b from t where a=1';
const FORMATTED_SQL = 'select\n  a,\n  b\nfrom\n  t\nwhere\n  a = 1';
const MINIFIED_SQL = 'select a, b from t where a = 1';

test('loads cleanly with no console or page errors', async ({ page }) => {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', (error) => pageErrors.push(error.message));

  await page.goto('/');

  await expect(page.getByText('SQL Formatter')).toBeVisible();
  expect(consoleErrors).toEqual([]);
  expect(pageErrors).toEqual([]);
});

test('formats SQL entered in the input box', async ({ page }) => {
  await page.goto('/');

  await page.getByPlaceholder('Please input SQL').fill(RAW_SQL);

  await expect(page.locator('.formatted-area textarea')).toHaveValue(
    FORMATTED_SQL,
  );
});

test('minifies the formatted SQL', async ({ page }) => {
  await page.goto('/');

  await page.getByPlaceholder('Please input SQL').fill(RAW_SQL);

  await expect(page.locator('.minified-area textarea')).toHaveValue(
    MINIFIED_SQL,
  );
});

test('empty input yields empty formatted and minified outputs', async ({
  page,
}) => {
  await page.goto('/');

  const input = page.getByPlaceholder('Please input SQL');
  await input.fill(RAW_SQL);
  await expect(page.locator('.formatted-area textarea')).toHaveValue(
    FORMATTED_SQL,
  );

  await input.fill('');

  await expect(page.locator('.formatted-area textarea')).toHaveValue('');
  await expect(page.locator('.minified-area textarea')).toHaveValue('');
});

test('"<<" button copies the formatted SQL back into the input box', async ({
  page,
}) => {
  await page.goto('/');

  await page.getByPlaceholder('Please input SQL').fill(RAW_SQL);
  await page.getByRole('button', { name: '<<' }).click();

  await expect(page.getByPlaceholder('Please input SQL')).toHaveValue(
    FORMATTED_SQL,
  );
});

test('copy buttons write the formatted and minified SQL to the clipboard', async ({
  page,
  context,
  browserName,
}) => {
  test.skip(
    browserName !== 'chromium',
    'clipboard permissions are only reliably grantable on Chromium',
  );
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);

  await page.goto('/');
  await page.getByPlaceholder('Please input SQL').fill(RAW_SQL);

  await page
    .locator('.formatted-area')
    .getByRole('button', { name: 'copy' })
    .click();
  await expect
    .poll(() => page.evaluate(() => navigator.clipboard.readText()))
    .toBe(FORMATTED_SQL);

  await page
    .locator('.minified-area')
    .getByRole('button', { name: 'copy' })
    .click();
  await expect
    .poll(() => page.evaluate(() => navigator.clipboard.readText()))
    .toBe(MINIFIED_SQL);
});
