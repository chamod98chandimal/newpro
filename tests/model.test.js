import test from 'node:test';
import assert from 'node:assert/strict';
import { createSite, validateSite, renderDocument, safeURL, pageFilename } from '../src/model.js';
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
