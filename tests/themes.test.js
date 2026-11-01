import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { themes, themeCSS } from '../src/themes.js';
import { createSite, clone, validateSite, renderDocument } from '../src/model.js';

test('all original themes are valid portable projects with useful layouts', () => {
  for (const [key, theme] of Object.entries(themes)) {
    const site = { ...createSite(), theme: key, font: theme.font, accent: theme.accent, background: theme.background };
    site.pages[0].sections = clone(theme.sections);
    assert.deepEqual(validateSite(site), site);
    const html = renderDocument(site, site.pages[0]);
    assert.ok(html.includes(theme.sections[0].type === 'slider' ? theme.sections[0].items[0].title : theme.sections[0].title));
    assert.ok(html.includes('https://chamod98chandimal.github.io/newpro/media/'));
    assert.ok(!html.includes('<script'));
    assert.ok(site.pages[0].sections.length >= 6);
    assert.ok(site.pages[0].sections.some(section => section.type === 'row'));
  }
});

test('theme styling preserves legacy projects and ignores unrecognised variants', () => {
  assert.equal(themeCSS({}), '');
  assert.equal(themeCSS({ theme: 'unknown;display:none' }), '');
  assert.equal(themeCSS({ theme: '__proto__' }), '');
  assert.ok(themeCSS({ theme: 'atelier' }).includes('CONSIDERED SPACES'));
  assert.ok(!themeCSS({ theme: 'agency', font: 'malicious-value' }).includes('malicious-value'));
});

test('original theme artwork is bundled as standalone SVG without active content', () => {
  for (const name of ['interior', 'architecture', 'ceramic', 'fashion', 'workspace']) {
    const svg = readFileSync(new URL(`../public/media/${name}.svg`, import.meta.url), 'utf8');
    assert.ok(svg.includes('<svg'));
    assert.ok(!svg.includes('<script'));
    assert.ok(!svg.includes('href='));
  }
});
