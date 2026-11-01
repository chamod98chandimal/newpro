export const templates = {
  studio: { name: 'Creative studio', label: 'Design with intention.', intro: 'A small independent studio making thoughtful things for people and the planet.', accent: '#426451', background: '#f5f2eb', sections: [
    { type: 'hero', eyebrow: 'INDEPENDENT BY NATURE', title: 'Good things start with a little curiosity.', body: 'We turn big ideas into meaningful experiences. Strategy, design, and a fresh perspective — all under one roof.', button: 'Explore our work', url: '#work' },
    { type: 'text', eyebrow: '01 / OUR APPROACH', title: 'Less noise. More meaning.', body: 'We believe the best work comes from asking better questions. We listen closely, think openly, and make every detail count.' },
    { type: 'cards', eyebrow: '02 / WHAT WE DO', title: 'A fresh perspective, from start to finish.', body: 'Brand strategy|Finding the story only you can tell.\nDigital experiences|Thoughtful websites that feel like you.\nCreative direction|A clear vision, brought to life.' }
  ] },
  personal: { name: 'Personal portfolio', label: 'Hello, I’m Alex.', intro: 'Designer, maker, and endlessly curious human.', accent: '#76574e', background: '#faf3ed', sections: [
    { type: 'hero', eyebrow: 'DESIGNER & CREATIVE THINKER', title: 'Making everyday experiences a little better.', body: 'I’m Alex, an independent designer working at the intersection of thoughtful ideas and useful things.', button: 'See selected work', url: '#work' },
    { type: 'text', eyebrow: 'A LITTLE ABOUT ME', title: 'Curiosity is my starting point.', body: 'I partner with kind people to solve interesting problems. Currently open to new collaborations.' }
  ] },
  journal: { name: 'Simple journal', label: 'Notes from the everyday.', intro: 'A collection of thoughts, discoveries, and things worth sharing.', accent: '#455c78', background: '#f1f4f7', sections: [
    { type: 'hero', eyebrow: 'A PERSONAL JOURNAL', title: 'Room for a slower kind of story.', body: 'Observations from the everyday. A place for ideas to grow, stories to unfold, and small moments to matter.', button: 'Read the journal', url: '#work' },
    { type: 'text', eyebrow: 'THE LATEST NOTE', title: 'Learning to pay attention.', body: 'Some of the most interesting things are hiding in plain sight. This is a space to notice them.' }
  ] }
};

export const elements = {
  row: { name: 'Row & columns', icon: '▥', category: 'Layout', description: 'Arrange elements side by side.' },
  hero: { name: 'Hero & introduction', icon: '◩', category: 'Sections', description: 'A welcoming headline and visual.' },
  banner: { name: 'Banner', icon: '▰', category: 'Sections', description: 'A bold message with a call to action.' },
  cards: { name: 'Feature cards', icon: '▦', category: 'Sections', description: 'Present services or ideas together.' },
  text: { name: 'Text & story', icon: '¶', category: 'Content', description: 'A heading and a paragraph of your story.' },
  heading: { name: 'Heading', icon: 'H', category: 'Content', description: 'Give your next idea a clear title.' },
  button: { name: 'Button', icon: '↗', category: 'Content', description: 'Point visitors to their next step.' },
  image: { name: 'Image', icon: '▧', category: 'Media', description: 'Add a photo with a description.' },
  divider: { name: 'Divider', icon: '―', category: 'Layout', description: 'Create a subtle visual break.' },
  spacer: { name: 'Spacer', icon: '↕', category: 'Layout', description: 'Give your content room to breathe.' }
};
export const clone = value => JSON.parse(JSON.stringify(value));
export const elementName = type => elements[type]?.name || 'Element';
export function createElement(type) {
  if (!Object.hasOwn(elements, type)) throw new Error('Unsupported element.');
  const base = { type, eyebrow: '', title: '', body: '', align: 'left', padding: 'medium' };
  switch (type) {
    case 'row': return { ...base, columns: Array.from({ length: 2 }, () => ({ id: crypto.randomUUID(), children: [createElement('text')] })) };
    case 'hero': return { ...base, eyebrow: 'SOMETHING WORTH SHARING', title: 'Make room for your next idea.', body: 'Tell your story, in your own words.', button: 'Get in touch', url: 'mailto:hello@example.com' };
    case 'banner': return { ...base, eyebrow: 'SOMETHING NEW', title: 'Your next chapter starts here.', body: 'Make a little room for something extraordinary.', button: 'Discover more', url: '#', src: '', alt: '', background: '#e6ebdf', align: 'center', padding: 'large' };
    case 'text': return { ...base, eyebrow: 'SOMETHING WORTH SHARING', title: 'Make room for your next idea.', body: 'Tell your story, in your own words.' };
    case 'heading': return { ...base, title: 'A headline worth sharing.' };
    case 'cards': return { ...base, eyebrow: 'WHAT WE DO', title: 'Small details. Big possibilities.', body: 'First idea|A little detail goes a long way.\nSecond idea|Tell your visitors more.\nThird idea|Make something meaningful.' };
    case 'button': return { ...base, button: 'Explore more', url: '#' };
    case 'image': return { ...base, src: '', alt: 'Describe your image', body: '' };
    case 'spacer': return { ...base, size: 48, padding: 'none' };
    default: return { ...base, padding: 'small' };
  }
}
export function createSite(key = 'studio') {
  const template = templates[key] || templates.studio;
  return { version: 1, name: 'Untitled studio', description: template.intro, accent: template.accent, background: template.background, pages: [{ id: crypto.randomUUID(), name: 'Home', sections: clone(template.sections) }] };
}
export function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}
export function safeURL(value) {
  const url = String(value || '').trim();
  return /^(https?:\/\/|mailto:|tel:|#)/i.test(url) ? url : '#';
}
export function safeImageURL(value) {
  const url = String(value || '').trim();
  try {
    const parsed = new URL(url);
    return ['https:', 'http:'].includes(parsed.protocol) ? parsed.href : '';
  } catch { return ''; }
}
const hexColor = value => typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value);
const validId = value => typeof value === 'string' && /^[a-z0-9-]{1,80}$/i.test(value);
export function validateSite(site) {
  if (!site || site.version !== 1 || typeof site.name !== 'string' || site.name.length > 200 || typeof site.description !== 'string' || site.description.length > 20000 || !hexColor(site.accent) || !hexColor(site.background)) throw new Error('Invalid project settings.');
  if (!Array.isArray(site.pages) || !site.pages.length || site.pages.length > 30) throw new Error('A project needs 1–30 pages.');
  const ids = new Set();
  for (const page of site.pages) {
    if (!validId(page.id) || ids.has(page.id) || typeof page.name !== 'string' || !page.name.trim() || page.name.length > 200 || !Array.isArray(page.sections) || page.sections.length > 100) throw new Error('Invalid page.');
    ids.add(page.id);
    let count = 0;
    function checkElement(section, inColumn = false) {
      if (!section || typeof section !== 'object' || !Object.hasOwn(elements, section.type)) throw new Error('Unsupported element.');
      if (++count > 300) throw new Error('A page supports up to 300 elements.');
      for (const field of ['eyebrow', 'title', 'body']) if (typeof section[field] !== 'string' || section[field].length > 20000) throw new Error('Invalid element content.');
      for (const field of ['button', 'url', 'src', 'alt']) if (section[field] !== undefined && (typeof section[field] !== 'string' || section[field].length > 20000)) throw new Error('Invalid element link or image.');
      if (section.align !== undefined && !['left', 'center', 'right'].includes(section.align)) throw new Error('Invalid element alignment.');
      if (section.padding !== undefined && !['none', 'small', 'medium', 'large'].includes(section.padding)) throw new Error('Invalid element spacing.');
      if (section.background !== undefined && !hexColor(section.background)) throw new Error('Invalid element background.');
      if (section.size !== undefined && (!Number.isInteger(section.size) || section.size < 8 || section.size > 240)) throw new Error('Invalid spacer height.');
      if (section.type === 'row') {
        if (inColumn) throw new Error('Rows cannot be nested inside columns.');
        if (!Array.isArray(section.columns) || section.columns.length < 1 || section.columns.length > 4) throw new Error('Rows need 1–4 columns.');
        const columnIds = new Set();
        for (const column of section.columns) {
          if (!column || !validId(column.id) || columnIds.has(column.id) || !Array.isArray(column.children) || column.children.length > 20) throw new Error('Invalid column.');
          columnIds.add(column.id);
          column.children.forEach(child => checkElement(child, true));
        }
      }
    }
    page.sections.forEach(section => checkElement(section));
  }
  return clone(site);
}
export function pageFilename(site, index) {
  return index === 0 ? 'index.html' : `page-${site.pages[index].id.replace(/[^a-z0-9-]/gi, '').slice(0, 80) || index}.html`;
}
export function renderDocument(site, page, { preview = false } = {}) {
  const e = escapeHTML;
  function renderElement(s, path, nested = false) {
    const type = Object.hasOwn(elements, s.type) ? s.type : 'text';
    const align = ['left', 'center', 'right'].includes(s.align) ? s.align : 'left';
    const padding = ['none', 'small', 'medium', 'large'].includes(s.padding) ? s.padding : 'medium';
    const styles = `text-align:${align};${hexColor(s.background) ? `background:${s.background};` : ''}`;
    const id = !nested ? ` id="${path === '1' ? 'work' : `section-${path}`}"` : '';
    const attrs = `class="section ${type} pad-${padding}${nested ? ' nested' : ''}"${id} style="${styles}"${preview ? ` data-element-path="${e(path)}"` : ''}`;
    const text = `${s.eyebrow ? `<div class="eyebrow">${e(s.eyebrow)}</div>` : ''}${s.title ? `<h${type === 'hero' ? 1 : 2}>${e(s.title)}</h${type === 'hero' ? 1 : 2}>` : ''}`;
    const body = s.body ? `<p>${e(s.body)}</p>` : '';
    const button = s.button ? `<a class="button" href="${e(safeURL(s.url))}">${e(s.button)} <span aria-hidden="true">↗</span></a>` : '';
    const imageSrc = safeImageURL(s.src);
    if (type === 'row') return `<section ${attrs}><div class="row-grid" style="--columns:${Math.max(1, Math.min(4, s.columns?.length || 1))}">${(s.columns || []).map((column, i) => `<div class="column">${column.children.length ? column.children.map((child, j) => renderElement(child, `${path}.${i}.${j}`, true)).join('') : preview ? '<div class="empty-column">Add an element to this column</div>' : ''}</div>`).join('')}</div></section>`;
    if (type === 'hero') return `<section ${attrs}><div>${text}${body}${button}</div><div class="art" aria-hidden="true"><div class="sun"></div><div class="arch"></div><div class="disc"></div><div class="art-label">A DIFFERENT PERSPECTIVE</div></div></section>`;
    if (type === 'banner') return `<section ${attrs}>${imageSrc ? `<img class="banner-image" src="${e(imageSrc)}" alt="${e(s.alt || '')}" loading="${preview ? 'eager' : 'lazy'}">` : ''}<div class="banner-content">${text}${body}${button}</div></section>`;
    if (type === 'cards') return `<section ${attrs}>${text}<div class="cards-grid">${s.body.split('\n').filter(Boolean).map((line, j) => { const [title, ...description] = line.split('|'); return `<article><span class="number">${String(j + 1).padStart(2, '0')}</span><h3>${e(title)}</h3><p>${e(description.join('|'))}</p></article>`; }).join('')}</div></section>`;
    if (type === 'image') return `<section ${attrs}><figure>${imageSrc ? `<img class="content-image" src="${e(imageSrc)}" alt="${e(s.alt || '')}" loading="${preview ? 'eager' : 'lazy'}">` : '<div class="image-placeholder"><span aria-hidden="true">▧</span><span>Add an image URL</span></div>'}${s.body ? `<figcaption>${e(s.body)}</figcaption>` : ''}</figure></section>`;
    if (type === 'heading') return `<section ${attrs}>${text}</section>`;
    if (type === 'button') return `<section ${attrs}>${button}</section>`;
    if (type === 'divider') return `<section ${attrs}><hr></section>`;
    if (type === 'spacer') return `<section ${attrs} aria-hidden="true"><div style="height:${Number.isInteger(s.size) && s.size >= 8 && s.size <= 240 ? s.size : 48}px"></div></section>`;
    return `<section ${attrs}>${text}${body}</section>`;
  }
  const sections = page.sections.map((s, i) => renderElement(s, String(i))).join('');
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="${e(site.description)}"><title>${e(page.name)} — ${e(site.name)}</title><style>
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:${hexColor(site.background) ? site.background : '#f5f2eb'};color:#28372f;font:15px/1.7 system-ui,sans-serif;--accent:${hexColor(site.accent) ? site.accent : '#426451'}}a{color:inherit}header,footer{padding:24px 7%;display:flex;align-items:center;justify-content:space-between;gap:20px}header{border-bottom:1px solid #28372f18}.brand{font:700 21px Georgia,serif;text-decoration:none}nav{display:flex;gap:22px;flex-wrap:wrap}nav a{text-decoration:none;font-size:12px}.section{padding:68px 7%;border-bottom:1px solid #28372f18;overflow-wrap:anywhere}.section.pad-none{padding:0 7%}.section.pad-small{padding:24px 7%}.section.pad-large{padding:100px 7%}.hero{display:grid;grid-template-columns:1.1fr 1fr;align-items:center;gap:40px}.eyebrow{font-size:9px;letter-spacing:2px;font-weight:700;color:var(--accent);margin-bottom:20px}h1,h2,h3{font-family:Georgia,serif;font-weight:400;line-height:1.12;letter-spacing:-1.5px;margin:0}h1{font-size:clamp(36px,5.5vw,66px)}h2{font-size:clamp(30px,4vw,44px);max-width:620px}h3{font-size:24px;letter-spacing:-.5px}p{max-width:510px;color:#5c675f;white-space:pre-wrap;margin:22px 0}a.button{display:inline-flex;gap:35px;padding:13px 20px;background:var(--accent);color:white;text-decoration:none;font-size:12px;margin-top:10px}.art{height:340px;background:#dddcc8;position:relative;overflow:hidden;border-radius:160px 160px 4px 4px}.sun{position:absolute;width:90px;height:90px;border-radius:50%;background:#c79f6d;right:24px;top:40px}.arch{position:absolute;bottom:0;left:20px;width:65%;height:75%;border-radius:130px 130px 0 0;background:var(--accent);transform:rotate(-12deg);transform-origin:bottom}.disc{position:absolute;bottom:-50px;right:-30px;width:230px;height:230px;border-radius:50%;background:#b9b99d}.art-label{position:absolute;bottom:20px;left:25px;letter-spacing:2px;font-size:8px;color:#fff}.cards-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:30px;margin-top:40px}.number{font-size:11px;display:block;margin-bottom:24px;color:var(--accent)}footer{font-size:11px;color:#5c675f}.row-grid{display:grid;grid-template-columns:repeat(var(--columns),minmax(0,1fr));gap:24px}.column{min-width:0}.column>.section{padding:24px 0;border-bottom:0}.column>.pad-none{padding:0}.column>.pad-small{padding:12px 0}.column>.pad-large{padding:48px 0}.column h1{font-size:clamp(28px,4vw,48px)}.column h2{font-size:clamp(24px,3vw,36px)}.column .hero{grid-template-columns:1fr}.column .cards-grid{grid-template-columns:1fr}.column .art{height:240px}.empty-column{min-height:120px;border:1px dashed #a7b39e;display:grid;place-items:center;color:#7b8b70;font-size:12px;border-radius:4px}.banner{position:relative;overflow:hidden}.banner-image{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.2}.banner-content{position:relative;z-index:1}.section[style*="text-align:center"] h1,.section[style*="text-align:center"] h2,.section[style*="text-align:center"] p{margin-left:auto;margin-right:auto}.section[style*="text-align:right"] h1,.section[style*="text-align:right"] h2,.section[style*="text-align:right"] p{margin-left:auto}.banner h2{font-size:clamp(34px,5vw,58px)}figure{margin:0}.content-image{display:block;max-width:100%;height:auto;width:100%;aspect-ratio:16/9;object-fit:contain;border-radius:4px}.image-placeholder{min-height:230px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;border-radius:5px;background:linear-gradient(135deg,#e9e7da,#dce4d8);color:#7a8c6e;font-size:12px}.image-placeholder>span:first-child{font-size:48px;line-height:1}figcaption{font-size:12px;color:#6a7763;margin-top:12px}.divider hr{border:0;border-top:1px solid #28372f30;margin:0}.spacer{border:0}a:focus-visible{outline:3px solid var(--accent);outline-offset:4px}@media(max-width:600px){header{align-items:flex-start}.hero{grid-template-columns:1fr}.art{height:250px}.section,.section.pad-large{padding:44px 7%}.section.pad-small{padding:20px 7%}.section.pad-none{padding:0 7%}.cards-grid,.row-grid{grid-template-columns:1fr}nav{gap:12px}}
</style></head><body><header><a class="brand" href="${preview ? '#' : 'index.html'}">${e(site.name)}<span style="color:var(--accent)">.</span></a><nav>${site.pages.map((p, i) => `<a href="${preview ? '#' : e(pageFilename(site, i))}"${p.id === page.id ? ' aria-current="page"' : ''}>${e(p.name)}</a>`).join('')}</nav></header><main>${sections}</main><footer><span>© ${new Date().getFullYear()} ${e(site.name)}</span><span>Made with intention.</span></footer></body></html>`;
}
