import './style.css';
import { templates, createSite, clone, validateSite, renderDocument, escapeHTML as e, pageFilename } from './model.js';
const storageKey = 'folio.project.v1';
let site, saved = true, storageAvailable = true;
try { const raw = localStorage.getItem(storageKey); site = raw ? validateSite(JSON.parse(raw)) : createSite(); } catch { site = createSite(); storageAvailable = false; }
let pageId = site.pages[0].id, selected = 0, tab = 'pages', mobile = false;
const app = document.querySelector('#app');
app.innerHTML = `<aside class="rail"><a class="logo" href="#" aria-label="Folio home">f<span>•</span></a><button class="rail-item active" data-tab="pages" title="Pages" aria-label="Pages">▤<small>Pages</small></button><button class="rail-item" data-tab="design" title="Design" aria-label="Design">◈<small>Design</small></button><button class="rail-item" data-tab="settings" title="Settings" aria-label="Settings">⚙<small>Settings</small></button><div class="rail-bottom"><span class="avatar">Y</span><small>Your space</small></div></aside><div class="workspace"><header class="topbar"><div class="breadcrumb">Your workspace <span>/</span> <strong id="project-name"></strong><span class="badge">LOCAL DRAFT</span></div><div class="top-actions"><span id="save-status" role="status"></span><button class="btn" id="export-project">Export project</button><button class="btn primary" id="export-html">Export page ↗</button></div></header><div class="editor"><aside class="sidebar"><div class="sidebar-heading"><div class="overline">MAKE IT YOURS</div><h1 id="panel-title">Your pages</h1><p id="panel-description">A little structure for your big ideas.</p></div><div id="panel"></div><div class="sidebar-note"><span>✦</span><div><strong>Your ideas. Your website.</strong><p>Drafts stay in this browser. Export a project to keep a portable backup.</p></div></div></aside><main class="canvas-area"><div class="canvas-toolbar"><div><span class="live-dot"></span> Live preview <span class="divider">/</span> <span id="preview-page"></span></div><div class="view-controls" aria-label="Preview size"><button id="desktop" class="selected" aria-pressed="true">Desktop</button><button id="mobile" aria-pressed="false">Mobile</button></div></div><div class="canvas-scroll"><div class="preview-frame"><div class="browser-bar"><div class="dots"><i></i><i></i><i></i></div><span>YOUR WEBSITE PREVIEW</span><span>↗</span></div><iframe id="preview" title="Website preview" sandbox=""></iframe></div><p class="canvas-caption">A space that’s uniquely yours. <span>Start small. Make it meaningful.</span></p></div><footer class="workspace-footer"><span>✦ Built with Folio</span><span>Browser editor · No account required</span></footer></main><aside class="inspector"><div class="inspector-head"><span class="overline">THE DETAILS</span><h2>Edit section</h2></div><div id="fields"></div></aside></div></div><div id="toast" role="status" aria-live="polite"></div><input type="file" id="import-file" accept="application/json,.json" hidden>`;
const $ = id => document.getElementById(id);
const currentPage = () => site.pages.find(p => p.id === pageId);
let toastTimer;
function toast(message) { $('toast').textContent = message; $('toast').classList.add('visible'); clearTimeout(toastTimer); toastTimer = setTimeout(() => $('toast').classList.remove('visible'), 4500); }
function persist() { try { localStorage.setItem(storageKey, JSON.stringify(site)); saved = true; storageAvailable = true; } catch { saved = false; storageAvailable = false; } updatePreview(); }
function updatePreview() {
  $('project-name').textContent = site.name;
  $('preview-page').textContent = currentPage().name;
  $('save-status').textContent = saved && storageAvailable ? '✓ Saved in browser' : 'Not saved — export a backup';
  $('preview').srcdoc = renderDocument(site, currentPage(), { preview: true });
}
function field(label, key, value, kind = 'input') { return `<label class="field">${e(label)}${kind === 'textarea' ? `<textarea aria-label="${e(label)}" data-field="${key}" rows="4">${e(value)}</textarea>` : `<input aria-label="${e(label)}" data-field="${key}" value="${e(value)}" ${kind === 'color' ? 'type="color"' : ''}>`}</label>`; }
function renderFields() {
  const section = currentPage().sections[selected];
  $('fields').innerHTML = section ? `<div class="section-badge">${e(section.type)} section</div>${field('Small heading', 'eyebrow', section.eyebrow)}${field('Heading', 'title', section.title, 'textarea')}${field(section.type === 'cards' ? 'Cards (one per line: title|description)' : 'Description', 'body', section.body, 'textarea')}${section.type === 'hero' ? field('Button text', 'button', section.button || '') + field('Button link (https://, mailto:, tel: or #)', 'url', section.url || '') : ''}<div class="section-actions"><button class="btn" id="move-up" ${selected === 0 ? 'disabled' : ''}>↑ Move up</button><button class="btn" id="move-down" ${selected === currentPage().sections.length - 1 ? 'disabled' : ''}>↓ Move down</button></div><button class="btn danger full" id="delete-section">Remove section</button>` : '<p class="empty">Add a section to start shaping this page.</p>';
}
function renderPanel() {
  document.querySelectorAll('[data-tab]').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  $('panel-title').textContent = { pages: 'Your pages', design: 'Your style', settings: 'Site settings' }[tab];
  $('panel-description').textContent = { pages: 'A little structure for your big ideas.', design: 'Find a look that feels like you.', settings: 'The home for your website’s essentials.' }[tab];
  if (tab === 'pages') $('panel').innerHTML = `<div class="panel-label">PAGES <button id="add-page" title="Add page" aria-label="Add page">+</button></div><div class="page-list">${site.pages.map((p, i) => `<button data-page="${e(p.id)}" class="page-row ${p.id === pageId ? 'chosen' : ''}"><span>${i === 0 ? '⌂' : '▧'}</span>${e(p.name)}<span class="page-arrow">›</span></button>`).join('')}</div><div class="page-options">${field('Page name', 'pageName', currentPage().name)}${site.pages.length > 1 ? '<button class="text-danger" id="delete-page">Delete this page</button>' : ''}</div><div class="panel-label section-label">SECTIONS <span>${currentPage().sections.length}</span></div><div class="section-list">${currentPage().sections.map((s, i) => `<button class="section-row ${i === selected ? 'chosen' : ''}" data-section="${i}"><span>▦</span><div><strong>${e(s.type === 'hero' ? 'Hero & introduction' : s.type === 'cards' ? 'Feature cards' : 'Text & story')}</strong><small>${e(s.title || 'Untitled section')}</small></div><span>⋮</span></button>`).join('')}</div><div class="add-section"><select id="section-type" aria-label="New section type"><option value="text">Text section</option><option value="hero">Hero section</option><option value="cards">Feature cards</option></select><button class="btn full" id="add-section">+ Add section</button></div>`;
  if (tab === 'design') $('panel').innerHTML = `<div class="panel-padding">${field('Accent color', 'accent', site.accent, 'color')}${field('Background color', 'background', site.background, 'color')}<div class="panel-label">STARTER TEMPLATES</div><p class="help">Applying a template replaces this page’s sections and site colors.</p>${Object.entries(templates).map(([key, t]) => `<button class="template" data-template="${key}"><span style="background:${t.background};color:${t.accent}">Aa <i>↗</i></span><strong>${e(t.name)}</strong><small>${e(t.label)}</small></button>`).join('')}</div>`;
  if (tab === 'settings') $('panel').innerHTML = `<div class="panel-padding">${field('Website name', 'name', site.name)}${field('SEO description', 'description', site.description, 'textarea')}<div class="connection"><span class="badge">COMING LATER</span><h3>Connect to GitHub</h3><p>Repository publishing and custom domains aren’t connected in this version. Export your page to host it yourself.</p></div><button class="btn full" id="import-project">Import project</button><p class="help">Restore a Folio JSON export. This replaces your current draft.</p></div>`;
  renderFields();
}
function refresh() { renderPanel(); persist(); }
app.addEventListener('input', event => {
  const key = event.target.dataset.field;
  if (!key) return;
  if (['name', 'description', 'accent', 'background'].includes(key)) site[key] = event.target.value;
  else if (key === 'pageName') { if (!event.target.value.trim()) return; currentPage().name = event.target.value; }
  else currentPage().sections[selected][key] = event.target.value;
  persist();
});
app.addEventListener('change', event => { if (event.target.dataset.field && tab === 'pages') renderPanel(); });
app.addEventListener('click', event => {
  const b = event.target.closest('button'); if (!b) return;
  if (b.dataset.tab) { tab = b.dataset.tab; renderPanel(); }
  if (b.dataset.page) { pageId = b.dataset.page; selected = 0; renderPanel(); updatePreview(); }
  if (b.dataset.section) { selected = Number(b.dataset.section); renderPanel(); }
  if (b.dataset.template && confirm('Replace this page’s sections and the site colors with this template?')) { const t = templates[b.dataset.template]; currentPage().sections = clone(t.sections); site.accent = t.accent; site.background = t.background; selected = 0; refresh(); toast('Template applied. Make it your own.'); }
  switch (b.id) {
    case 'add-page': { if (site.pages.length >= 30) return toast('This version supports up to 30 pages.'); const name = prompt('Name your new page', 'About'); if (!name?.trim()) return; const p = { id: crypto.randomUUID(), name: name.trim().slice(0, 200), sections: [{ type: 'text', eyebrow: 'A NEW CHAPTER', title: name.trim(), body: 'Your story starts here. Select this section to make it your own.' }] }; site.pages.push(p); pageId = p.id; selected = 0; refresh(); break; }
    case 'delete-page': if (confirm('Delete this page? Export a project first if you need a backup.')) { site.pages = site.pages.filter(p => p.id !== pageId); pageId = site.pages[0].id; selected = 0; refresh(); } break;
    case 'add-section': { const type = $('section-type').value; if (currentPage().sections.length >= 100) return toast('This page has reached the 100-section limit.'); currentPage().sections.push({ type, eyebrow: 'SOMETHING WORTH SHARING', title: 'Make room for your next idea.', body: type === 'cards' ? 'First idea|A little detail goes a long way.\nSecond idea|Tell your visitors more.' : 'Tell your story, in your own words.', ...(type === 'hero' ? { button: 'Get in touch', url: 'mailto:hello@example.com' } : {}) }); selected = currentPage().sections.length - 1; refresh(); break; }
    case 'delete-section': if (confirm('Remove this section?')) { currentPage().sections.splice(selected, 1); selected = Math.max(0, selected - 1); refresh(); } break;
    case 'move-up': case 'move-down': { const target = selected + (b.id === 'move-up' ? -1 : 1); const sections = currentPage().sections; [sections[selected], sections[target]] = [sections[target], sections[selected]]; selected = target; refresh(); break; }
    case 'desktop': case 'mobile': mobile = b.id === 'mobile'; document.querySelector('.preview-frame').classList.toggle('mobile', mobile); for (const id of ['desktop', 'mobile']) { $(id).classList.toggle('selected', id === b.id); $(id).setAttribute('aria-pressed', String(id === b.id)); } break;
    case 'export-project': download('folio-project.json', JSON.stringify(site, null, 2), 'application/json'); toast('Project exported. Keep it as your backup.'); break;
    case 'export-html': download(pageFilename(site, site.pages.findIndex(p => p.id === pageId)), renderDocument(site, currentPage()), 'text/html'); toast('Page exported. For multiple pages, export each into the same folder.'); break;
    case 'import-project': $('import-file').click(); break;
  }
});
function download(name, data, type) { const url = URL.createObjectURL(new Blob([data], { type })); const a = document.createElement('a'); a.href = url; a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); }
$('import-file').addEventListener('change', async event => {
  const file = event.target.files[0]; if (!file) return;
  try { if (file.size > 2_000_000) throw new Error('Project must be smaller than 2 MB.'); const imported = validateSite(JSON.parse(await file.text())); if (!confirm('Replace your current draft with this project?')) return; site = imported; pageId = site.pages[0].id; selected = 0; refresh(); toast('Project imported.'); }
  catch (error) { toast(`Could not import project: ${error.message}`); }
  finally { event.target.value = ''; }
});
renderPanel(); updatePreview();
