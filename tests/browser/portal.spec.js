import { test, expect } from '@playwright/test';

test('home provides separate builder and dashboard entry points', async ({ page }) => {
  await page.goto('/');
  const portal = page.locator('#portal-app');
  await expect(portal.getByRole('heading', { level: 1 })).toContainText('Your next website.');
  await expect(portal.getByRole('link', { name: 'Website Builder', exact: true })).toHaveAttribute('href', '#/builder');
  await expect(portal.getByRole('link', { name: 'Site Dashboard', exact: true })).toHaveAttribute('href', '#/dashboard');
  await portal.getByRole('link', { name: 'Website Builder', exact: true }).click();
  await expect(page.locator('#preview')).toBeVisible();
  await page.goto('/#/dashboard');
  await expect(portal.getByRole('heading', { name: 'Site dashboard.', exact: true })).toBeVisible();
});

test('dashboard saves actual project settings and exports a backup', async ({ page }) => {
  await page.goto('/#/dashboard');
  const portal = page.locator('#portal-app');
  await portal.getByLabel('Project name', { exact: true }).fill('My dashboard project');
  await portal.getByLabel('Search description', { exact: true }).fill('A site managed through the dashboard.');
  await portal.getByRole('button', { name: 'Save settings', exact: true }).click();
  await expect(portal.getByRole('status')).toContainText('Settings updated');
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('folio.project.v1')));
  expect(saved.name).toBe('My dashboard project');
  expect(saved.description).toBe('A site managed through the dashboard.');
  const download = page.waitForEvent('download');
  await portal.getByRole('button', { name: 'Export project backup' }).click();
  expect((await download).suggestedFilename()).toBe('folio-project.json');
  await portal.getByRole('link', { name: 'Open website builder' }).click();
  await expect(page.locator('#project-name')).toHaveText('My dashboard project');
});

test('portal remains usable on small screens and integrations are honest', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.locator('#portal-app').getByRole('link', { name: 'Website Builder', exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.goto('/#/dashboard');
  await expect(page.locator('#portal-app').getByText('Not connected', { exact: true })).toBeVisible();
  await expect(page.locator('#portal-app').getByText('This is a local workspace without account sign-in yet.', { exact: false })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('theme choice respects cancellation and keeps routes connected to the same draft', async ({ page }) => {
  await page.goto('/#/builder');
  await page.getByLabel('Heading', { exact: true }).fill('Keep my current draft');
  await page.goto('/#/home');
  const portal = page.locator('#portal-app');
  page.once('dialog', dialog => dialog.dismiss());
  await portal.getByRole('button', { name: 'Use Atelier', exact: false }).click();
  await expect(portal.getByRole('heading', { level: 1 })).toBeVisible();
  const cancelled = await page.evaluate(() => JSON.parse(localStorage.getItem('folio.project.v1')));
  expect(cancelled.pages[0].sections[0].title).toBe('Keep my current draft');
  page.once('dialog', dialog => dialog.accept());
  await portal.getByRole('button', { name: 'Use Market', exact: false }).click();
  await expect(page).toHaveURL(/#\/builder$/);
  await expect(page.locator('#preview')).toBeVisible();
  const applied = await page.evaluate(() => JSON.parse(localStorage.getItem('folio.project.v1')));
  expect(applied.theme).toBe('market');
  expect(applied.pages[0].sections[0].type).toBe('slider');
  await page.goto('/#/dashboard');
  await expect(portal.getByRole('heading', { name: 'Site dashboard.', exact: true })).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(/#\/builder$/);
  await expect(page.locator('#preview')).toBeVisible();
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('folio.project.v1')).theme)).toBe('market');
});
