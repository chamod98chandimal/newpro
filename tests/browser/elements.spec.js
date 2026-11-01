import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';

async function insert(page, type) {
  await page.getByRole('button', { name: '+ Browse elements', exact: true }).click();
  await page.locator(`[data-insert="${type}"]`).click();
}
const project = page => page.evaluate(() => JSON.parse(localStorage.getItem('folio.project.v1')));

test('element library search, column building, preview selection, and export round trip', async ({ page }) => {
  await page.goto('/#/builder');
  await page.getByRole('button', { name: '+ Browse elements', exact: true }).click();
  await expect(page.locator('[data-insert]:visible')).toHaveCount(25);
  await page.getByLabel('Search elements').fill('photo with a description');
  await expect(page.locator('[data-insert]:visible')).toHaveCount(1);
  await expect(page.locator('[data-insert="image"]')).toBeVisible();
  await page.getByLabel('Search elements').fill('');
  await page.getByRole('button', { name: 'Layout', exact: true }).click();
  await expect(page.locator('[data-insert]:visible')).toHaveCount(3);
  await page.locator('[data-insert="row"]').click();
  await expect(page.getByLabel('Columns', { exact: true })).toHaveValue('2');
  await page.getByLabel('Columns', { exact: true }).selectOption('3');
  await page.getByRole('button', { name: 'Add element to column 3', exact: true }).click();
  await expect(page.locator('[data-insert="row"]')).toBeHidden();
  await page.locator('[data-insert="heading"]').click();
  await page.getByLabel('Heading', { exact: true }).fill('Inside my third column');
  await page.getByLabel('Alignment').selectOption('center');
  await expect(page.frameLocator('#preview').getByRole('heading', { name: 'Inside my third column' })).toBeVisible();
  const saved = await project(page);
  expect(saved.pages[0].sections[1].columns[2].children[0].title).toBe('Inside my third column');
  await page.frameLocator('#preview').getByRole('heading', { name: 'Good things start with a little curiosity.' }).click();
  await expect(page.getByLabel('Heading', { exact: true })).toHaveValue('Good things start with a little curiosity.');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export page' }).click();
  const download = await downloadPromise;
  const html = await readFile(await download.path(), 'utf8');
  expect(html).toContain('Inside my third column');
  expect(html).toContain('row-grid');
  expect(html).not.toContain('<script');
  expect(html).not.toContain('data-element-path');
  await page.reload();
  await expect(page.locator('[data-element="1.2.0"]')).toContainText('Inside my third column');
});

test('image, button, banner, spacer, and duplicate controls work', async ({ page }) => {
  await page.goto('/#/builder');
  // Serve an image locally so the test does not depend on an external image host.
  await page.route('https://images.example.test/photo.svg', route => route.fulfill({ contentType: 'image/svg+xml', body: '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100"><rect width="200" height="100" fill="green"/></svg>' }));
  await insert(page, 'image');
  await page.getByLabel('Image URL (https://)', { exact: true }).fill('https://images.example.test/photo.svg');
  await page.getByLabel('Image description', { exact: true }).fill('A green landscape');
  const image = page.frameLocator('#preview').getByRole('img', { name: 'A green landscape' });
  await expect(image).toBeVisible();
  await expect.poll(() => image.evaluate(img => img.naturalWidth)).toBe(200);
  await insert(page, 'button');
  await page.getByLabel('Button text', { exact: true }).fill('Visit our studio');
  await page.getByLabel('Button link (https://, mailto:, tel: or #)', { exact: true }).fill('https://example.com/studio');
  await expect(page.frameLocator('#preview').getByRole('link', { name: 'Visit our studio' })).toHaveAttribute('href', 'https://example.com/studio');
  await insert(page, 'banner');
  await expect(page.getByLabel('Heading', { exact: true })).toHaveValue('Your next chapter starts here.');
  await insert(page, 'spacer');
  await page.getByLabel('Height (8–240 px)').fill('96');
  await page.getByRole('button', { name: 'Duplicate element', exact: true }).click();
  const state = await project(page);
  expect(state.pages[0].sections.filter(s => s.type === 'spacer')).toHaveLength(2);
  expect(state.pages[0].sections.find(s => s.type === 'spacer').size).toBe(96);
});

test('drag elements between columns and reorder page elements', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto('/#/builder');
  await insert(page, 'row');
  await page.locator('[data-element="1.0.0"]').dragTo(page.locator('[data-column="1.1"] > .column-add'));
  let state = await project(page);
  expect(state.pages[0].sections[1].columns[0].children).toHaveLength(0);
  expect(state.pages[0].sections[1].columns[1].children).toHaveLength(2);
  await page.locator('[data-element="1"]').dragTo(page.locator('[data-element="0"]'));
  state = await project(page);
  expect(state.pages[0].sections[0].type).toBe('row');
  // Move a root leaf into a later row; its root index must remain correct after removal.
  await page.locator('[data-element="1"]').dragTo(page.locator('[data-column="0.0"] > .column-add'));
  state = await project(page);
  expect(state.pages[0].sections[0].columns[0].children[0].type).toBe('hero');
  await expect(page.getByLabel('Heading', { exact: true })).toHaveValue('Good things start with a little curiosity.');
});
