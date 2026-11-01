import { elements, elementName, escapeHTML as e } from './model.js';
import { elementPreview } from './showcase.js';

export function field(label, key, value, kind = 'input') {
  const attributes = `aria-label="${e(label)}" data-field="${key}"`;
  let control;
  if (kind === 'textarea') control = `<textarea ${attributes} rows="4" maxlength="20000">${e(value)}</textarea>`;
  else control = `<input ${attributes} value="${e(value)}" type="${kind === 'color' ? 'color' : kind === 'number' ? 'number' : 'text'}" ${kind === 'number' ? 'min="8" max="240"' : `maxlength="${['name', 'pageName'].includes(key) ? 200 : 20000}"`}>`;
  return `<label class="field">${e(label)}${control}</label>`;
}

function select(label, key, value, options) {
  return `<label class="field">${e(label)}<select aria-label="${e(label)}" data-field="${key}">${options.map(([v, text]) => `<option value="${v}"${String(value) === String(v) ? ' selected' : ''}>${text}</option>`).join('')}</select></label>`;
}

export function elementFields(section, { index, total, nested }) {
  if (!section) return '<p class="empty">Add an element to start shaping this page.</p>';
  const type = section.type;
  let fields = '';
  if (type === 'row') fields += select('Columns', 'columnCount', section.columns.length, [1, 2, 3, 4].map(n => [n, `${n} column${n > 1 ? 's' : ''}`])) + '<p class="help">Add elements inside each column using the + buttons in the page outline. Columns stack on mobile.</p>';
  if (['hero', 'text', 'cards', 'banner', 'heading', 'imageBox', 'iconBox', 'slider', 'gallery', 'accordion', 'tabs', 'testimonials', 'team', 'pricing', 'logoCloud', 'stats', 'productGrid', 'social', 'video', 'message'].includes(type)) fields += field('Small heading', 'eyebrow', section.eyebrow) + field('Heading', 'title', section.title, 'textarea');
  if (['hero', 'text', 'cards', 'banner', 'image', 'imageBox', 'iconBox', 'message', 'gallery', 'team', 'pricing', 'testimonials', 'productGrid', 'video'].includes(type)) fields += field(type === 'cards' ? 'Cards (one per line: title|description)' : type === 'image' ? 'Caption' : 'Description', 'body', section.body, 'textarea');
  if (['hero', 'banner', 'button', 'imageBox'].includes(type)) fields += field('Button text', 'button', section.button || '') + field('Button link (https://, mailto:, tel: or #)', 'url', section.url || '');
  if (['image', 'banner', 'imageBox'].includes(type)) fields += field(type === 'banner' ? 'Background image URL (https://)' : 'Image URL (https://)', 'src', section.src || '') + field('Image description', 'alt', section.alt || '') + '<p class="help">Use a public image URL. Images load from that host; the export does not include a copy.</p>';
  if (type === 'iconBox') fields += field('Icon or symbol', 'icon', section.icon || '✦');
  if (type === 'video') fields += field('YouTube or Vimeo URL', 'url', section.url || '') + '<p class="help">Use a YouTube or Vimeo link. Visitors play the embedded video on your exported site.</p>';
  if (type === 'message') fields += select('Message style', 'variant', section.variant || 'info', [['info', 'Information'], ['success', 'Success'], ['warning', 'Warning']]);
  if (Array.isArray(section.items)) {
    const itemFields = {
      slider: ['title', 'body', 'src', 'button', 'url'], gallery: ['title', 'src'],
      accordion: ['title', 'body'], tabs: ['title', 'body', 'src'], testimonials: ['title', 'body', 'price', 'icon'],
      team: ['title', 'body', 'src'], pricing: ['title', 'price', 'body', 'button', 'url'],
      logoCloud: ['title', 'src'], stats: ['price', 'title', 'body'],
      productGrid: ['title', 'price', 'body', 'src', 'button', 'url'], social: ['title', 'icon', 'url'],
    }[type] || ['title', 'body'];
    const labels = { title: type === 'testimonials' ? 'Person / role' : type === 'stats' ? 'Label' : 'Item title', body: type === 'pricing' ? 'Features (one per line)' : type === 'testimonials' ? 'Quote' : 'Item description', src: 'Item image URL (https://)', url: 'Item link', button: 'Item button', price: type === 'stats' ? 'Number / value' : type === 'testimonials' ? 'Role / company' : 'Price label', icon: 'Symbol' };
    fields += `<div class="field-group-title">${e(elementName(type).toUpperCase())} ITEMS</div><div class="item-editors">${section.items.map((item, index) => `<details class="item-editor" ${index === 0 ? 'open' : ''}><summary>${index + 1}. ${e(item.title || 'Untitled item')}</summary><div>${itemFields.map(key => field(labels[key], `items.${index}.${key}`, item[key] || '', key === 'body' ? 'textarea' : 'input')).join('')}<button class="text-danger" data-remove-item="${index}" ${section.items.length < 2 ? 'disabled' : ''}>Remove item</button></div></details>`).join('')}</div><button class="btn full" id="add-element-item" ${section.items.length >= 12 ? 'disabled' : ''}>+ Add item</button>`;
  }
  if (type === 'spacer') fields += field('Height (8–240 px)', 'size', section.size || 48, 'number');
  if (!['divider', 'spacer'].includes(type)) {
    fields += '<div class="field-group-title">APPEARANCE</div>';
    fields += select('Alignment', 'align', section.align || 'left', [['left', 'Left'], ['center', 'Center'], ['right', 'Right']]);
    fields += select('Spacing', 'padding', section.padding || 'medium', [['none', 'None'], ['small', 'Small'], ['medium', 'Medium'], ['large', 'Large']]);
    fields += field('Element background', 'elementBackground', section.background || '#f5f2eb', 'color');
    if (section.background) fields += '<button class="text-danger" id="clear-element-background">Use site background</button>';
  }
  return `<div class="element-location">${nested ? 'INSIDE A COLUMN' : 'PAGE ELEMENT'}</div><div class="section-badge">${e(elementName(type))}</div>${fields}<div class="section-actions"><button class="btn" id="move-up" ${index === 0 ? 'disabled' : ''}>↑ Move up</button><button class="btn" id="move-down" ${index === total - 1 ? 'disabled' : ''}>↓ Move down</button></div><button class="btn full" id="duplicate-element">Duplicate element</button><button class="btn danger full" id="delete-section">Remove ${nested ? 'element' : 'section'}</button>`;
}

export function renderOutline(page, selection) {
  function item(section, path, nested = false) {
    const chosen = selection.join('.') === path;
    return `<div class="outline-item${nested ? ' nested' : ''}" data-drop-path="${path}"><button draggable="true" data-element="${path}" ${nested ? '' : `data-section="${path}"`} class="section-row ${chosen ? 'chosen' : ''}" aria-pressed="${chosen}"><span>${e(elements[section.type]?.icon || '▦')}</span><div><strong>${e(elementName(section.type))}</strong><small>${e(section.title || section.button || section.alt || (section.type === 'row' ? `${section.columns.length} columns` : 'Click to edit'))}</small></div><span class="drag-handle" aria-hidden="true">⠿</span></button>${section.type === 'row' ? `<div class="row-columns">${section.columns.map((column, c) => `<div class="column-outline" data-column="${path}.${c}"><div class="column-label"><span>Column ${c + 1}</span><button data-add-column="${path}.${c}" aria-label="Add element to column ${c + 1}">+</button></div>${column.children.map((child, n) => item(child, `${path}.${c}.${n}`, true)).join('')}<button class="column-add" data-add-column="${path}.${c}">+ Add element</button></div>`).join('')}</div>` : ''}</div>`;
  }
  return page.sections.map((s, i) => item(s, String(i))).join('');
}

export function pickerMarkup() {
  return `<dialog id="element-picker" aria-labelledby="picker-title"><div class="picker-top"><div><span class="overline">YOUR BUILDING BLOCKS</span><h2 id="picker-title">Add an element</h2><p>Complete blocks. Real previews. Make them yours.</p></div><button class="icon-close" id="close-picker" aria-label="Close element library">×</button></div><div class="picker-tools"><input type="search" id="element-search" placeholder="Search elements…" aria-label="Search elements"><div class="picker-filters" role="group" aria-label="Element categories">${['All', ...new Set(Object.values(elements).map(item => item.category))].map((name, i) => `<button data-category="${name}" class="${i === 0 ? 'active' : ''}" aria-pressed="${i === 0}">${name}</button>`).join('')}</div></div><p id="insert-location" class="insert-location"></p><div class="element-grid">${Object.entries(elements).map(([type, meta]) => `<button class="element-tile" data-insert="${type}" data-category-name="${e(meta.category)}" data-search="${e((meta.name + ' ' + meta.description).toLowerCase())}"><span class="element-art live-element-art"><iframe title="${e(meta.name)} miniature" sandbox="" loading="lazy" tabindex="-1" srcdoc="${e(elementPreview(type))}"></iframe></span><strong>${e(meta.name)}</strong><small>${e(meta.description)}</small><span class="element-add">+</span></button>`).join('')}</div><p class="picker-empty" hidden>No matching elements. Try another search.</p><div class="picker-footer">Click an element to insert it. Reorder with the arrow controls or drag it in the outline.</div></dialog>`;
}
