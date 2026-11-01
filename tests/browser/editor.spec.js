import { test, expect } from '@playwright/test';
test('edit, save, reload, add sections, switch previews, and export', async ({ page }) => {
  await page.goto('/');
  await expect(page.frameLocator('#preview').getByRole('heading', { level: 1 })).toContainText('Good things');
  await page.getByLabel('Heading', { exact: true }).fill('A website of my own.');
  await expect(page.frameLocator('#preview').getByRole('heading', { level: 1 })).toHaveText('A website of my own.');
  await page.reload();
  await expect(page.getByLabel('Heading', { exact: true })).toHaveValue('A website of my own.');
  await page.getByRole('button', { name: '+ Add section', exact: true }).click();
  await expect(page.getByLabel('Heading', { exact: true })).toHaveValue('Make room for your next idea.');
  await page.getByRole('button', { name: 'Mobile', exact: true }).click();
  await expect(page.locator('.preview-frame')).toHaveClass(/mobile/);
  const download = page.waitForEvent('download'); await page.getByRole('button', { name: 'Export page' }).click();
  expect((await download).suggestedFilename()).toBe('index.html');
  const project = page.waitForEvent('download'); await page.getByRole('button', { name: 'Export project' }).click();
  expect((await project).suggestedFilename()).toBe('folio-project.json');
});
test('create a page, edit styles, and apply a template', async ({ page }) => {
  await page.goto('/');
  page.once('dialog', d => d.accept('About us'));
  await page.getByRole('button', { name: 'Add page', exact: true }).click();
  await expect(page.getByLabel('Page name')).toHaveValue('About us');
  await page.getByRole('button', { name: 'Design', exact: true }).click();
  page.once('dialog', d => d.accept());
  await page.getByRole('button', { name: /Personal portfolio/ }).click();
  await expect(page.frameLocator('#preview').getByRole('heading', { level: 1 })).toContainText('Making everyday');
  await page.getByRole('button', { name: 'Settings', exact: true }).click();
  await page.getByLabel('Website name').fill('My studio');
  await expect(page.frameLocator('#preview').locator('.brand')).toHaveText('My studio.');
  await expect(page.getByText('COMING LATER')).toBeVisible();
});
test('import rejects malformed files and restores a valid backup', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Settings', exact: true }).click();
  await page.locator('#import-file').setInputFiles({ name: 'bad.json', mimeType: 'application/json', buffer: Buffer.from('{"version":1}') });
  await expect(page.locator('#toast')).toContainText('Could not import');
  // A fresh starter isn't written until edited. Save a setting to create a backup.
  await page.getByLabel('Website name').fill('Backup studio');
  const backup = await page.evaluate(() => JSON.parse(localStorage.getItem('folio.project.v1')));
  backup.name = 'Restored studio';
  page.once('dialog', d => d.accept());
  await page.locator('#import-file').setInputFiles({ name: 'backup.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(backup)) });
  await expect(page.getByLabel('Website name')).toHaveValue('Restored studio');
  await expect(page.frameLocator('#preview').locator('.brand')).toHaveText('Restored studio.');
});
test('section ordering, deletion, and narrow editor layout', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await page.getByRole('button', { name: '↓ Move down' }).click();
  await expect(page.locator('.section-row').nth(1)).toHaveClass(/chosen/);
  page.once('dialog', d => d.accept());
  await page.getByRole('button', { name: 'Remove section' }).click();
  await expect(page.locator('.section-row')).toHaveCount(2);
  await page.screenshot({ path: 'test-results/editor-desktop.png', fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByRole('button', { name: 'Export page' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: 'test-results/editor-mobile.png', fullPage: true });
});
