import './style.css';
import { createPreviewRenderer } from './preview.js';
import { templates, createSite, clone, validateSite, renderDocument, escapeHTML as e, pageFilename, createElement, elementName } from './model.js';
import { field, elementFields, renderOutline, pickerMarkup } from './builder-ui.js';
const storageKey = 'folio.project.v1';
let site, saved = true, storageAvailable = true;
try { const raw = localStorage.getItem(storageKey); site = raw ? validateSite(JSON.parse(raw)) : createSite(); } catch { site = createSite(); storageAvailable = false; }
let pageId = site.pages[0].id, selection = [0], tab = 'pages', mobile = false;
const app = document.querySelector('#app');
app.innerHTML = `<aside class="rail"><a class="logo" href="#" aria-label="Folio home">f<span>•</span></a><button class="rail-item active" data-tab="pages" title="Pages" aria-label="Pages">▤<small>Pages</small></button><button class="rail-item" data-tab="design" title="Design" aria-label="Design">◈<small>Design</small></button><button class="rail-item" data-tab="settings" title="Settings" aria-label="Settings">⚙<small>Settings</small></button><div class="rail-bottom"><span class="avatar">Y</span><small>Your space</small></div></aside><div class="workspace"><header class="topbar"><div class="breadcrumb">Your workspace <span>/</span> <strong id="project-name"></strong><span class="badge">LOCAL DRAFT</span></div><div class="top-actions"><span id="save-status" role="status"></span><button class="btn" id="export-project">Export project</button><button class="btn primary" id="export-html">Export page ↗</button></div></header><div class="editor"><aside class="sidebar"><div class="sidebar-heading"><div class="overline">MAKE IT YOURS</div><h1 id="panel-title">Your pages</h1><p id="panel-description">A little structure for your big ideas.</p></div><div id="panel"></div><div class="sidebar-note"><span>✦</span><div><strong>Your ideas. Your website.</strong><p>Drafts stay in this browser. Export a project to keep a portable backup.</p></div></div></aside><main class="canvas-area"><div class="canvas-toolbar"><div><span class="live-dot"></span> Live preview <span class="divider">/</span> <span id="preview-page"></span></div><div class="view-controls" aria-label="Preview size"><button id="desktop" class="selected" aria-pressed="true">Desktop</button><button id="mobile" aria-pressed="false">Mobile</button></div></div><div class="canvas-scroll"><div class="preview-frame"><div class="browser-bar"><div class="dots"><i></i><i></i><i></i></div><span>YOUR WEBSITE PREVIEW</span><span>↗</span></div><iframe id="preview" title="Website preview" sandbox=""></iframe></div><p class="canvas-caption">A space that’s uniquely yours. <span>Start small. Make it meaningful.</span></p></div><footer class="workspace-footer"><span>✦ Built with Folio</span><span>Browser editor · No account required</span></footer></main><aside class="inspector"><div class="inspector-head"><span class="overline">THE DETAILS</span><h2>Edit section</h2></div><div id="fields"></div></aside></div></div><div id="toast" role="status" aria-live="polite"></div><input type="file" id="import-file" accept="application/json,.json" hidden>`;
app.insertAdjacentHTML('beforeend', pickerMarkup());
const $ = id => document.getElementById(id);
const currentPage = () => site.pages.find(p => p.id === pageId);
const previewRenderer = createPreviewRenderer($('preview'), { onSelect: path => setSelection(path) });
let toastTimer;
function toast(message) { $('toast').textContent = message; $('toast').classList.add('visible'); clearTimeout(toastTimer); toastTimer = setTimeout(() => $('toast').classList.remove('visible'), 4500); }
function persist() { try { localStorage.setItem(storageKey, JSON.stringify(site)); saved = true; storageAvailable = true; } catch { saved = false; storageAvailable = false; } updatePreview(); }
function updatePreview() {
  $('project-name').textContent = site.name;
  $('preview-page').textContent = currentPage().name;
  $('save-status').textContent = saved && storageAvailable ? '✓ Saved in browser' : 'Not saved — export a backup';
  previewRenderer.update(renderDocument(site, currentPage(), { preview: true }), { pageId, selectedPath: selection.join('.') });
}
const selectedList = () => selection.length === 3 ? currentPage().sections[selection[0]]?.columns?.[selection[1]]?.children : currentPage().sections;
const selectedIndex = () => selection.at(-1);
const selectedElement = () => selectedList()?.[selectedIndex()];
function setSelection(path) {
  const parts = String(path).split('.').map(Number);
  if (![1, 3].includes(parts.length) || parts.some(n => !Number.isInteger(n) || n < 0)) return;
  const root = currentPage().sections[parts[0]];
  if (!root || (parts.length === 3 && !root.columns?.[parts[1]]?.children[parts[2]])) return;
  selection = parts;
  renderPanel(); updatePreview();
}
function renderFields() {
  $('fields').innerHTML = elementFields(selectedElement(), { index: selectedIndex(), total: selectedList()?.length || 0, nested: selection.length === 3 });
}
function renderPanel() {
  document.querySelectorAll('[data-tab]').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  $('panel-title').textContent = { pages: 'Your pages', design: 'Your style', settings: 'Site settings' }[tab];
  $('panel-description').textContent = { pages: 'Build your page, one element at a time.', design: 'Find a look that feels like you.', settings: 'The home for your website’s essentials.' }[tab];
  if (tab === 'pages') $('panel').innerHTML = `<div class="panel-label">PAGES <button id="add-page" title="Add page" aria-label="Add page">+</button></div><div class="page-list">${site.pages.map((p, i) => `<button data-page="${e(p.id)}" class="page-row ${p.id === pageId ? 'chosen' : ''}"><span>${i === 0 ? '⌂' : '▧'}</span><span class="page-name-label">${e(p.name)}</span><span class="page-arrow">›</span></button>`).join('')}</div><div class="page-options">${field('Page name', 'pageName', currentPage().name)}${site.pages.length > 1 ? '<button class="text-danger" id="delete-page">Delete this page</button>' : ''}</div><div class="panel-label section-label">PAGE OUTLINE <span>${currentPage().sections.length}</span></div><div class="section-list">${renderOutline(currentPage(), selection)}</div><div class="add-section"><button class="library-shortcut" id="browse-elements">+ Browse elements</button><p class="outline-help">Click an element in the preview to edit it. Drag in the outline to reorder.</p><select id="section-type" aria-label="New section type"><option value="text">Text section</option><option value="hero">Hero section</option><option value="cards">Feature cards</option></select><button class="btn full" id="add-section">+ Add section</button></div>`;
  if (tab === 'design') $('panel').innerHTML = `<div class="panel-padding">${field('Accent color', 'accent', site.accent, 'color')}${field('Background color', 'background', site.background, 'color')}<div class="panel-label">STARTER TEMPLATES</div><p class="help">Applying a template replaces this page’s elements and site colors.</p>${Object.entries(templates).map(([key, t]) => `<button class="template" data-template="${key}"><span style="background:${t.background};color:${t.accent}">Aa <i>↗</i></span><strong>${e(t.name)}</strong><small>${e(t.label)}</small></button>`).join('')}</div>`;
  if (tab === 'settings') $('panel').innerHTML = `<div class="panel-padding">${field('Website name', 'name', site.name)}${field('SEO description', 'description', site.description, 'textarea')}<div class="connection"><span class="badge">COMING LATER</span><h3>Connect to GitHub</h3><p>Repository publishing and custom domains aren’t connected in this version. Export your page to host it yourself.</p></div><button class="btn full" id="import-project">Import project</button><p class="help">Restore a Folio JSON export. This replaces your current draft.</p></div>`;
  renderFields();
}
function refresh() { renderPanel(); persist(); }
function updateOutlineLabels() {
  document.querySelectorAll('[data-element]').forEach(button => {
    const path = button.dataset.element.split('.').map(Number);
    const root = currentPage().sections[path[0]];
    const item = path.length === 3 ? root.columns[path[1]].children[path[2]] : root;
    button.querySelector('small').textContent = item.title || item.button || item.alt || (item.type === 'row' ? `${item.columns.length} columns` : 'Click to edit');
  });
  const pageButton = document.querySelector(`[data-page="${pageId}"] .page-name-label`);
  if (pageButton) pageButton.textContent = currentPage().name;
}
app.addEventListener('input', event => {
  const key = event.target.dataset.field;
  if (!key || event.target.tagName === 'SELECT') return;
  if (['name', 'description', 'accent', 'background'].includes(key)) site[key] = event.target.value.slice(0, key === 'name' ? 200 : 20000);
  else if (key === 'pageName') { if (!event.target.value.trim()) return; currentPage().name = event.target.value.slice(0, 200); }
  else if (key === 'size') { const value = Number(event.target.value); if (!Number.isInteger(value) || value < 8 || value > 240) return; selectedElement()[key] = value; }
  else if (key === 'elementBackground') selectedElement().background = event.target.value;
  else if (selectedElement()) selectedElement()[key] = event.target.value;
  updateOutlineLabels(); persist();
});
app.addEventListener('change', event => {
  const key = event.target.dataset.field;
  if (key === 'size' && (!Number.isInteger(Number(event.target.value)) || Number(event.target.value) < 8 || Number(event.target.value) > 240)) { event.target.value = selectedElement().size || 48; toast('Spacer height must be between 8 and 240 pixels.'); }
  if (!key || event.target.tagName !== 'SELECT') return;
  const item = selectedElement(); if (!item) return;
  if (key === 'columnCount') {
    const size = Number(event.target.value);
    if (size < item.columns.length && item.columns.slice(size).some(c => c.children.length) && !confirm('Remove the extra columns and their elements?')) { event.target.value = item.columns.length; return; }
    while (item.columns.length < size) item.columns.push({ id: crypto.randomUUID(), children: [] });
    item.columns.length = size; refresh();
  } else { item[key] = event.target.value; persist(); }
});
let insertionTarget = null, pickerCategory = 'All';
function openPicker(target = null) {
  insertionTarget = target; pickerCategory = 'All';
  $('element-search').value = '';
  $('insert-location').textContent = target ? `Insert into column ${target[1] + 1}` : 'Insert after the selected page element';
  filterElements(); $('element-picker').showModal(); $('element-search').focus();
}
function filterElements() {
  const search = $('element-search').value.toLowerCase().trim(); let count = 0;
  document.querySelectorAll('[data-insert]').forEach(button => {
    button.hidden = (insertionTarget && button.dataset.insert === 'row') || (pickerCategory !== 'All' && button.dataset.categoryName !== pickerCategory) || !button.dataset.search.includes(search);
    if (!button.hidden) count++;
  });
  document.querySelectorAll('[data-category]').forEach(button => { const active = button.dataset.category === pickerCategory; button.classList.toggle('active', active); button.setAttribute('aria-pressed', active); });
  document.querySelector('.picker-empty').hidden = count > 0;
}
$('element-search').addEventListener('input', filterElements);
function commitInsert(type, target = null) {
  const item = createElement(type), roots = currentPage().sections;
  const list = target ? roots[target[0]].columns[target[1]].children : roots;
  if (list.length >= (target ? 20 : 100)) return toast(target ? 'A column supports up to 20 elements.' : 'A page supports up to 100 top-level elements.');
  const index = target ? list.length : Math.min(selection[0] + 1, list.length);
  list.splice(index, 0, item);
  try { validateSite(site); } catch (error) { list.splice(index, 1); toast(error.message); return; }
  selection = target ? [...target, index] : [index];
  refresh();
}
function duplicateSelected() {
  const list = selectedList(), item = selectedElement(); if (!item) return;
  const duplicate = clone(item); if (duplicate.type === 'row') duplicate.columns.forEach(c => c.id = crypto.randomUUID());
  const index = selectedIndex() + 1; list.splice(index, 0, duplicate);
  try { validateSite(site); } catch (error) { list.splice(index, 1); return toast(error.message); }
  selection[selection.length - 1] = index; refresh();
}
app.addEventListener('click', event => {
  const b = event.target.closest('button'); if (!b) return;
  if (b.dataset.tab) { tab = b.dataset.tab; renderPanel(); }
  if (b.dataset.page) { pageId = b.dataset.page; selection = [0]; renderPanel(); updatePreview(); }
  if (b.dataset.element) setSelection(b.dataset.element);
  if (b.dataset.addColumn) openPicker(b.dataset.addColumn.split('.').map(Number));
  if (b.dataset.category) { pickerCategory = b.dataset.category; filterElements(); }
  if (b.dataset.insert) { $('element-picker').close(); commitInsert(b.dataset.insert, insertionTarget); }
  if (b.dataset.template && confirm('Replace this page’s elements and the site colors with this template?')) { const t = templates[b.dataset.template]; currentPage().sections = clone(t.sections); site.accent = t.accent; site.background = t.background; selection = [0]; refresh(); toast('Template applied. Make it your own.'); }
  switch (b.id) {
    case 'browse-elements': openPicker(selection.length === 3 ? selection.slice(0, 2) : null); break;
    case 'close-picker': $('element-picker').close(); break;
    case 'add-page': { if (site.pages.length >= 30) return toast('This version supports up to 30 pages.'); const name = prompt('Name your new page', 'About'); if (!name?.trim()) return; const title = name.trim().slice(0, 200); const p = { id: crypto.randomUUID(), name: title, sections: [{ ...createElement('text'), title, body: 'Your story starts here. Select this section to make it your own.' }] }; site.pages.push(p); pageId = p.id; selection = [0]; refresh(); break; }
    case 'delete-page': if (confirm('Delete this page? Export a project first if you need a backup.')) { site.pages = site.pages.filter(p => p.id !== pageId); pageId = site.pages[0].id; selection = [0]; refresh(); } break;
    case 'add-section': commitInsert($('section-type').value); break;
    case 'duplicate-element': duplicateSelected(); break;
    case 'clear-element-background': delete selectedElement().background; refresh(); break;
    case 'delete-section': if (selectedElement() && confirm('Remove this element?')) { const list = selectedList(); list.splice(selectedIndex(), 1); selection[selection.length - 1] = Math.max(0, selectedIndex() - 1); if (selection.length === 3 && !list.length) selection = [selection[0]]; refresh(); } break;
    case 'move-up': case 'move-down': { const list = selectedList(), index = selectedIndex(), target = index + (b.id === 'move-up' ? -1 : 1); if (target < 0 || target >= list.length) return; [list[index], list[target]] = [list[target], list[index]]; selection[selection.length - 1] = target; refresh(); break; }
    case 'desktop': case 'mobile': mobile = b.id === 'mobile'; document.querySelector('.preview-frame').classList.toggle('mobile', mobile); for (const id of ['desktop', 'mobile']) { $(id).classList.toggle('selected', id === b.id); $(id).setAttribute('aria-pressed', String(id === b.id)); } break;
    case 'export-project': download('folio-project.json', JSON.stringify(site, null, 2), 'application/json'); toast('Project exported. Keep it as your backup.'); break;
    case 'export-html': download(pageFilename(site, site.pages.findIndex(p => p.id === pageId)), renderDocument(site, currentPage()), 'text/html'); toast('Page exported. For multiple pages, export each into the same folder.'); break;
    case 'import-project': $('import-file').click(); break;
  }
});
// Drag within the outline or between columns; arrow controls provide a keyboard alternative.
let draggedPath = null;
function listAt(path) { return path.length === 3 ? currentPage().sections[path[0]]?.columns?.[path[1]]?.children : currentPage().sections; }
function clearDropStyles() { document.querySelectorAll('.drop-before,.drop-inside').forEach(el => el.classList.remove('drop-before', 'drop-inside')); }
app.addEventListener('dragstart', event => {
  const source = event.target.closest('[data-element]'); if (!source) return;
  draggedPath = source.dataset.element.split('.').map(Number);
  event.dataTransfer.setData('text/plain', source.dataset.element); event.dataTransfer.effectAllowed = 'move';
  source.classList.add('dragging');
});
app.addEventListener('dragend', () => { draggedPath = null; clearDropStyles(); document.querySelectorAll('.dragging').forEach(el => el.classList.remove('dragging')); });
app.addEventListener('dragover', event => {
  if (!draggedPath) return;
  const target = event.target.closest('[data-drop-path],[data-column]'); if (!target) return;
  event.preventDefault(); clearDropStyles(); target.classList.add(target.dataset.dropPath ? 'drop-before' : 'drop-inside');
});
app.addEventListener('drop', event => {
  clearDropStyles(); if (!draggedPath) return;
  const target = event.target.closest('[data-drop-path],[data-column]'); if (!target) return;
  event.preventDefault();
  const sourcePath = draggedPath; draggedPath = null;
  const source = listAt(sourcePath), sourceIndex = sourcePath.at(-1), item = source?.[sourceIndex]; if (!item) return;
  let destinationPath = target.dataset.dropPath ? target.dataset.dropPath.split('.').map(Number) : [...target.dataset.column.split('.').map(Number), 0];
  if (target.dataset.column) destinationPath[2] = listAt(destinationPath).length;
  if (item.type === 'row' && destinationPath.length === 3) return toast('Rows belong at page level. Move a content element into a column.');
  const destination = listAt(destinationPath); if (!destination) return;
  if (source === destination && sourceIndex === destinationPath.at(-1)) return;
  if (source !== destination && destination.length >= (destinationPath.length === 3 ? 20 : 100)) return toast('That container has reached its element limit.');
  let targetIndex = destinationPath.at(-1);
  // Moving a root before a child would move it into a descendant: only rows have descendants and were rejected above.
  source.splice(sourceIndex, 1);
  if (source === destination && sourceIndex < targetIndex) targetIndex--;
  destination.splice(targetIndex, 0, item);
  if (sourcePath.length === 1 && destinationPath.length === 3 && sourceIndex < destinationPath[0]) destinationPath[0]--;
  destinationPath[destinationPath.length - 1] = targetIndex; selection = destinationPath;
  refresh();
});
function download(name, data, type) { const url = URL.createObjectURL(new Blob([data], { type })); const a = document.createElement('a'); a.href = url; a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); }
$('import-file').addEventListener('change', async event => {
  const file = event.target.files[0]; if (!file) return;
  try { if (file.size > 2_000_000) throw new Error('Project must be smaller than 2 MB.'); const imported = validateSite(JSON.parse(await file.text())); if (!confirm('Replace your current draft with this project?')) return; site = imported; pageId = site.pages[0].id; selection = [0]; refresh(); toast('Project imported.'); }
  catch (error) { toast(`Could not import project: ${error.message}`); }
  finally { event.target.value = ''; }
});
renderPanel(); updatePreview();
