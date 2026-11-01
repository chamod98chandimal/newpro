import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';

async function insert(page, type) {
  await page.getByRole('button', { name: '+ Browse elements', exact: true }).click();
  await page.locator(`[data-insert="${type}"]`).click();
}

test('showcase has real component previews and inserts into the builder', async ({ page }) => {
  await page.goto('/#/elements');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('A building block');
  await expect(page.locator('[data-showcase-type]')).toHaveCount(25);
  await page.getByLabel('Find an element').fill('accordion');
  await expect(page.locator('[data-showcase-type]:visible')).toHaveCount(1);
  await page.getByRole('button', { name: 'Preview Accordion', exact: true }).click();
  const sample = page.locator('#demo-surface');
  await expect(sample.locator('details')).toHaveCount(3);
  await sample.locator('summary').nth(1).click();
  await expect(sample.locator('details').nth(1)).toHaveAttribute('open', '');
  await page.locator('#demo-insert').click();
  await expect(page).toHaveURL(/#\/builder$/);
  await expect(page.locator('#fields .section-badge')).toHaveText('Accordion');
});

test('gallery items are editable, portable, and persist across routes', async ({ page }) => {
  await page.goto('/#/builder');
  await insert(page, 'gallery');
  await page.getByLabel('Item title', { exact: true }).first().fill('A collection of my own');
  await page.getByRole('button', { name: '+ Add item', exact: true }).click();
  await expect(page.locator('.item-editor')).toHaveCount(4);
  await page.locator('.item-editor').first().getByRole('button', { name: 'Remove item', exact: true }).click();
  await expect(page.locator('.item-editor')).toHaveCount(3);
  await page.getByLabel('Item title', { exact: true }).first().fill('My saved gallery');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export page' }).click();
  const html = await readFile(await (await downloadPromise).path(), 'utf8');
  expect(html).toContain('My saved gallery'); expect(html).not.toContain('<script');
  await page.goto('/#/dashboard');
  await expect(page.locator('#portal-app').getByText('4', { exact: true }).first()).toBeVisible();
  await page.goto('/#/builder');
  await page.locator('[data-element="1"]').click();
  await expect(page.getByLabel('Item title', { exact: true }).first()).toHaveValue('My saved gallery');
});

test('tabs, accordion, and slider controls work inside the live preview', async ({ page }) => {
  await page.goto('/#/builder');
  await insert(page, 'tabs');
  let preview = page.frameLocator('#preview');
  const radios = preview.locator('.ux-tab-input');
  await preview.locator('.ux-tabs>label').nth(1).click();
  await expect(radios.nth(1)).toBeChecked();
  await page.getByLabel('Heading', { exact: true }).fill('Edited without resetting my tab');
  await expect(radios.nth(1)).toBeChecked();
  await insert(page, 'accordion');
  await preview.locator('.ux-accordion summary').nth(1).click();
  await expect(preview.locator('.ux-accordion details').nth(1)).toHaveAttribute('open', '');
  await page.getByLabel('Heading', { exact: true }).fill('Edited without closing my answer');
  await expect(preview.locator('.ux-accordion details').nth(1)).toHaveAttribute('open', '');
  await insert(page, 'slider');
  await preview.getByRole('link', { name: 'Slide 2', exact: true }).click();
  await expect.poll(() => preview.locator('.ux-slider').evaluate(element => Math.round(element.scrollLeft))).toBeGreaterThan(100);
});

test('theme application keeps the complete layout, portable images, and mobile stacking', async ({ page }) => {
  await page.goto('/#/builder');
  await page.getByRole('button', { name: 'Design', exact: true }).click();
  page.once('dialog', dialog => dialog.accept());
  await page.locator('[data-theme="market"]').click();
  const preview = page.frameLocator('#preview');
  await expect(preview.locator('body')).toHaveAttribute('data-theme', 'market');
  await expect(preview.locator('.ux-products article')).toHaveCount(4);
  await expect.poll(() => preview.locator('.ux-slide-image').first().evaluate(image => image.complete && image.naturalWidth > 0)).toBe(true);
  await page.getByRole('button', { name: 'Mobile', exact: true }).click();
  await expect.poll(() => preview.locator('.row-grid').evaluate(element => getComputedStyle(element).gridTemplateColumns.split(' ').length)).toBe(1);
  await expect(page.locator('.preview-frame.mobile')).toBeVisible();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export page' }).click();
  const html = await readFile(await (await downloadPromise).path(), 'utf8');
  expect(html).toContain('data-theme="market"'); expect(html).toContain('/media/fashion.svg');
  expect(html).toContain('mailto:hello@example.com'); expect(html).not.toContain('<script');
});
