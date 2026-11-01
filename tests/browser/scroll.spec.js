import { test, expect } from '@playwright/test';

async function openLongPage(page, withImage = false) {
  await page.addInitScript(withImage => {
    if (window !== window.top) return;
    const sections = Array.from({ length: 12 }, (_, i) => ({
      type: 'text', eyebrow: `SECTION ${i + 1}`, title: `A longer page, chapter ${i + 1}`,
      body: 'Thoughtful details make a difference. '.repeat(12),
    }));
    if (withImage) sections.splice(1, 0, { type: 'image', eyebrow: '', title: '', body: '', src: `${location.origin}/tests/fixtures/preview.svg`, alt: 'Test landscape' });
    localStorage.setItem('folio.project.v1', JSON.stringify({
      version: 1, name: 'Scroll regression', description: 'A long page for editing.',
      accent: '#426451', background: '#f5f2eb', pages: [{ id: 'home', name: 'Home', sections }],
    }));
  }, withImage);
  await page.goto('/');
  await expect(page.frameLocator('#preview').getByRole('heading', { name: 'A longer page, chapter 12', exact: true })).toBeAttached();
}

test('typing preserves the preview position without reloading its document', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await openLongPage(page);
  const body = page.frameLocator('#preview').locator('body');
  await body.evaluate(() => window.scrollTo({ top: 1000, behavior: 'instant' }));
  await expect.poll(() => body.evaluate(() => window.scrollY)).toBe(1000);
  let frameNavigations = 0;
  page.on('framenavigated', frame => { if (frame.parentFrame()) frameNavigations += 1; });
  const heading = page.getByLabel('Heading', { exact: true });
  await heading.fill('Updated while the preview is scrolled');
  await expect(page.frameLocator('#preview').getByRole('heading', { name: 'Updated while the preview is scrolled', exact: true })).toBeAttached();
  await expect.poll(() => body.evaluate(() => window.scrollY)).toBe(1000);
  await expect(heading).toBeFocused();
  expect(frameNavigations).toBe(0);
});

test('typing and blur keep the inspector mounted and the outer page in place', async ({ page }) => {
  await page.setViewportSize({ width: 800, height: 700 });
  await openLongPage(page);
  const heading = page.getByLabel('Heading', { exact: true });
  await heading.scrollIntoViewIfNeeded();
  await heading.focus();
  await heading.evaluate(element => { element.dataset.scrollRegression = 'mounted'; });
  const top = await page.evaluate(() => window.scrollY);
  expect(top).toBeGreaterThan(100);
  await heading.press('End');
  await heading.pressSequentially(' edited in place');
  await expect(heading).toBeFocused();
  expect(Math.abs((await page.evaluate(() => window.scrollY)) - top)).toBeLessThan(2);
  await heading.evaluate(element => element.blur());
  await expect(heading).toHaveAttribute('data-scroll-regression', 'mounted');
  expect(Math.abs((await page.evaluate(() => window.scrollY)) - top)).toBeLessThan(2);
});


test('editing preserves loaded image and stylesheet nodes as well as preview scroll', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await openLongPage(page, true);
  const image = page.frameLocator('#preview').locator('.content-image');
  await image.scrollIntoViewIfNeeded();
  await expect.poll(() => image.evaluate(element => element.complete && element.naturalWidth > 0)).toBe(true);
  await image.evaluate(element => { window.__originalImage = element; window.__originalStyle = document.head.querySelector('style'); });
  const body = page.frameLocator('#preview').locator('body');
  await body.evaluate(() => window.scrollTo({ top: 1000, behavior: 'instant' }));
  await expect.poll(() => body.evaluate(() => window.scrollY)).toBe(1000);
  await page.getByLabel('Heading', { exact: true }).fill('An edit with an image on the page');
  await expect(page.frameLocator('#preview').getByRole('heading', { name: 'An edit with an image on the page', exact: true })).toBeAttached();
  expect(await image.evaluate(element => element === window.__originalImage)).toBe(true);
  expect(await image.evaluate(() => document.head.querySelector('style') === window.__originalStyle)).toBe(true);
  await expect.poll(() => body.evaluate(() => window.scrollY)).toBe(1000);
});
