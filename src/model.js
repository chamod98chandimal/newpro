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
export const clone = value => JSON.parse(JSON.stringify(value));
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
export function validateSite(site) {
  if (!site || site.version !== 1 || typeof site.name !== 'string' || site.name.length > 200 || typeof site.description !== 'string' || !/^#[0-9a-f]{6}$/i.test(site.accent) || !/^#[0-9a-f]{6}$/i.test(site.background)) throw new Error('Invalid project settings.');
  if (!Array.isArray(site.pages) || !site.pages.length || site.pages.length > 30) throw new Error('A project needs 1–30 pages.');
  const ids = new Set();
  for (const page of site.pages) {
    if (typeof page.id !== 'string' || !/^[a-z0-9-]{1,80}$/i.test(page.id) || ids.has(page.id) || typeof page.name !== 'string' || !page.name.trim() || !Array.isArray(page.sections) || page.sections.length > 100) throw new Error('Invalid page.');
    ids.add(page.id);
    for (const section of page.sections) {
      if (!['hero', 'text', 'cards'].includes(section.type)) throw new Error('Unsupported section.');
      for (const field of ['eyebrow', 'title', 'body']) if (typeof section[field] !== 'string' || section[field].length > 20000) throw new Error('Invalid section content.');
      for (const field of ['button', 'url']) if (section[field] !== undefined && typeof section[field] !== 'string') throw new Error('Invalid link.');
    }
  }
  return clone(site);
}
export function pageFilename(site, index) {
  return index === 0 ? 'index.html' : `page-${site.pages[index].id.replace(/[^a-z0-9-]/gi, '').slice(0, 80) || index}.html`;
}
export function renderDocument(site, page, { preview = false } = {}) {
  const e = escapeHTML;
  const sections = page.sections.map((s, i) => {
    const attrs = `class="section ${s.type}" id="${i === 1 ? 'work' : `section-${i}`}"`;
    const text = `<div class="eyebrow">${e(s.eyebrow)}</div><h${s.type === 'hero' ? 1 : 2}>${e(s.title)}</h${s.type === 'hero' ? 1 : 2}>`;
    if (s.type === 'hero') return `<section ${attrs}><div>${text}<p>${e(s.body)}</p>${s.button ? `<a class="button" href="${e(safeURL(s.url))}">${e(s.button)} <span>↗</span></a>` : ''}</div><div class="art" aria-hidden="true"><div class="sun"></div><div class="arch"></div><div class="disc"></div><div class="art-label">A DIFFERENT PERSPECTIVE</div></div></section>`;
    if (s.type === 'cards') return `<section ${attrs}>${text}<div class="cards-grid">${s.body.split('\n').filter(Boolean).map((line, j) => { const [title, ...body] = line.split('|'); return `<article><span class="number">0${j + 1}</span><h3>${e(title)}</h3><p>${e(body.join('|'))}</p></article>`; }).join('')}</div></section>`;
    return `<section ${attrs}>${text}<p>${e(s.body)}</p></section>`;
  }).join('');
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="${e(site.description)}"><title>${e(page.name)} — ${e(site.name)}</title><style>
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:${site.background};color:#28372f;font:15px/1.7 system-ui,sans-serif}a{color:inherit}header,footer{padding:24px 7%;display:flex;align-items:center;justify-content:space-between;gap:20px}header{border-bottom:1px solid #28372f18}.brand{font:700 21px Georgia,serif;text-decoration:none}nav{display:flex;gap:22px;flex-wrap:wrap}nav a{text-decoration:none;font-size:12px}.section{padding:68px 7%;border-bottom:1px solid #28372f18}.hero{display:grid;grid-template-columns:1.1fr 1fr;align-items:center;gap:40px}.eyebrow{font-size:9px;letter-spacing:2px;font-weight:700;color:${site.accent};margin-bottom:20px}h1,h2,h3{font-family:Georgia,serif;font-weight:400;line-height:1.12;letter-spacing:-1.5px;margin:0}h1{font-size:clamp(36px,5.5vw,66px)}h2{font-size:clamp(30px,4vw,44px);max-width:620px}h3{font-size:24px;letter-spacing:-.5px}p{max-width:510px;color:#5c675f;white-space:pre-wrap;margin:22px 0}.button{display:inline-flex;gap:35px;padding:13px 20px;background:${site.accent};color:white;text-decoration:none;font-size:12px;margin-top:10px}.art{height:340px;background:#dddcc8;position:relative;overflow:hidden;border-radius:160px 160px 4px 4px}.sun{position:absolute;width:90px;height:90px;border-radius:50%;background:#c79f6d;right:24px;top:40px}.arch{position:absolute;bottom:0;left:20px;width:65%;height:75%;border-radius:130px 130px 0 0;background:${site.accent};transform:rotate(-12deg);transform-origin:bottom}.disc{position:absolute;bottom:-50px;right:-30px;width:230px;height:230px;border-radius:50%;background:#b9b99d}.art-label{position:absolute;bottom:20px;left:25px;letter-spacing:2px;font-size:8px;color:#fff}.cards-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:30px;margin-top:40px}.number{font-size:11px;display:block;margin-bottom:24px;color:${site.accent}}footer{font-size:11px;color:#5c675f}@media(max-width:600px){header{align-items:flex-start}.hero{grid-template-columns:1fr}.art{height:250px}.section{padding:44px 7%}.cards-grid{grid-template-columns:1fr}nav{gap:12px}}
</style></head><body><header><a class="brand" href="${preview ? '#' : 'index.html'}">${e(site.name)}<span style="color:${site.accent}">.</span></a><nav>${site.pages.map((p, i) => `<a href="${preview ? '#' : e(pageFilename(site, i))}"${p.id === page.id ? ' aria-current="page"' : ''}>${e(p.name)}</a>`).join('')}</nav></header><main>${sections}</main><footer><span>© ${new Date().getFullYear()} ${e(site.name)}</span><span>Made with intention.</span></footer></body></html>`;
}
