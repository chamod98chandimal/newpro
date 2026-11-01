import test from 'node:test';
import assert from 'node:assert/strict';
import { createSite, validateSite, renderDocument, safeURL, pageFilename, elements, createElement, safeImageURL } from '../src/model.js';
test('templates create independent, portable projects', () => {
  const a = createSite(), b = createSite(); a.pages[0].sections[0].title = 'Changed';
  assert.notEqual(a.pages[0].id, b.pages[0].id);
  assert.notEqual(b.pages[0].sections[0].title, 'Changed');
  assert.deepEqual(validateSite(JSON.parse(JSON.stringify(a))), a);
});
test('export escapes content and rejects executable links', () => {
  const site = createSite(); site.name = '<script>alert(1)</script>';
  site.pages[0].sections[0].title = '<img src=x onerror=alert(1)>';
  site.pages[0].sections[0].url = 'javascript:alert(1)';
  const html = renderDocument(site, site.pages[0]);
  assert.ok(!html.includes('<script>')); assert.ok(!html.includes('<img'));
  assert.ok(html.includes('&lt;script&gt;')); assert.ok(!html.includes('javascript:'));
  assert.equal(safeURL('data:text/html,hello'), '#'); assert.equal(safeURL('https://example.com'), 'https://example.com');
});
test('imports reject malformed data and CSS injection', () => {
  const site = createSite(); site.accent = 'red;}body{display:none}'; assert.throws(() => validateSite(site));
  const duplicate = createSite(); duplicate.pages.push(structuredClone(duplicate.pages[0])); assert.throws(() => validateSite(duplicate));
  assert.throws(() => validateSite({ version: 1 }));
});
test('export navigation links match exported page filenames', () => {
  const site = createSite(); site.pages.push({ id: 'about-123', name: 'About', sections: [] });
  const html = renderDocument(site, site.pages[0]);
  assert.equal(pageFilename(site, 0), 'index.html'); assert.ok(html.includes('href="page-about-123.html"'));
  assert.ok(renderDocument(site, site.pages[1]).includes('href="index.html"'));
});
test('every library element round-trips and renders standalone without scripts', () => {
  const site = createSite(); site.pages[0].sections = Object.keys(elements).map(createElement);
  const imported = validateSite(JSON.parse(JSON.stringify(site)));
  assert.deepEqual(imported, site);
  const html = renderDocument(site, site.pages[0]);
  for (const type of Object.keys(elements)) assert.match(html, new RegExp(`class="section ${type} `));
  assert.ok(!html.includes('<script'));
  assert.ok(!html.includes('data-element-path'));
});
test('row children have independent defaults and preview selection paths', () => {
  const row = createElement('row');
  row.columns[0].children[0].title = 'One side';
  assert.notEqual(row.columns[1].children[0].title, 'One side');
  const site = createSite(); site.pages[0].sections = [row];
  const html = renderDocument(site, site.pages[0], { preview: true });
  assert.ok(html.includes('data-element-path="0"'));
  assert.ok(html.includes('data-element-path="0.0.0"'));
  assert.ok(html.includes('data-element-path="0.1.0"'));
  assert.ok(html.includes('grid-template-columns:1fr'));
});
test('new element imports reject invalid layouts and style injection', () => {
  const site = createSite(); const row = createElement('row'); site.pages[0].sections = [row];
  row.columns[0].children.push(createElement('row'));
  assert.throws(() => validateSite(site), /Rows cannot be nested/);
  row.columns[0].children.pop();
  row.columns[0].children[0].background = '#000000;position:fixed';
  assert.throws(() => validateSite(site), /background/);
  delete row.columns[0].children[0].background;
  row.columns.push(...Array.from({ length: 3 }, () => ({ id: crypto.randomUUID(), children: [] })));
  assert.throws(() => validateSite(site), /1–4 columns/);
  const spacer = createElement('spacer'); site.pages[0].sections = [spacer]; spacer.size = 999;
  assert.throws(() => validateSite(site), /spacer height/);
});
test('image and banner output filter unsafe URLs and escape attributes and captions', () => {
  const site = createSite(); const image = createElement('image');
  image.src = 'javascript:alert(1)'; image.alt = '" onerror="alert(1)'; image.body = '<script>not code</script>';
  site.pages[0].sections = [image];
  let html = renderDocument(site, site.pages[0]);
  assert.ok(!html.includes('javascript:')); assert.ok(!html.includes('<script>'));
  assert.ok(html.includes('&lt;script&gt;not code&lt;/script&gt;'));
  image.src = 'https://example.com/photo.jpg';
  html = renderDocument(site, site.pages[0]);
  assert.ok(html.includes('src="https://example.com/photo.jpg"'));
  assert.ok(html.includes('alt="&quot; onerror=&quot;alert(1)"'));
  assert.equal(safeImageURL('data:image/svg+xml,<svg onload=alert(1)>'), '');
  assert.equal(safeImageURL('//example.com/image.png'), '');
  assert.equal(safeImageURL('https://example.com/image.png'), 'https://example.com/image.png');
});

test('images reserve layout space and load eagerly only in the editor', () => {
  const site = createSite(); const image = createElement('image');
  image.src = 'https://example.com/photo.png'; site.pages[0].sections = [image];
  const exported = renderDocument(site, site.pages[0]);
  const preview = renderDocument(site, site.pages[0], { preview: true });
  assert.ok(exported.includes('loading="lazy"'));
  assert.ok(preview.includes('loading="eager"'));
  assert.ok(exported.includes('aspect-ratio:16/9;object-fit:contain'));
});
