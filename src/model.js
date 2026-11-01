import { themeCSS } from './themes.js';

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
  productGrid: { name: 'Product collection', icon: '▨', category: 'Commerce', description: 'Show products with prices and external links.' },
  social: { name: 'Social links', icon: '↗', category: 'Content', description: 'Connect your visitors with your social profiles.' },
  slider: { name: 'Slider', icon: '▣', category: 'Sections', description: 'Full-width stories with slide navigation.' },
  gallery: { name: 'Gallery', icon: '▧', category: 'Media', description: 'A beautifully spaced collection of images.' },
  imageBox: { name: 'Image box', icon: '◫', category: 'Media', description: 'A visual card with a headline and link.' },
  iconBox: { name: 'Icon box', icon: '✧', category: 'Content', description: 'A focused feature with its own icon.' },
  accordion: { name: 'Accordion', icon: '☷', category: 'Content', description: 'Expandable answers, neatly organised.' },
  tabs: { name: 'Tabs', icon: '▤', category: 'Content', description: 'Switch between related content panels.' },
  testimonials: { name: 'Testimonials', icon: '“', category: 'Content', description: 'Share the voices behind your reputation.' },
  team: { name: 'Team members', icon: '♙', category: 'Content', description: 'Introduce the people behind your business.' },
  pricing: { name: 'Price table', icon: '$', category: 'Content', description: 'Compare plans with clear calls to action.' },
  video: { name: 'Video', icon: '▷', category: 'Media', description: 'Embed a YouTube or Vimeo video.' },
  message: { name: 'Message box', icon: 'ⓘ', category: 'Content', description: 'Make a useful announcement stand out.' },
  logoCloud: { name: 'Logo cloud', icon: '◈', category: 'Content', description: 'Give your partners a place to shine.' },
  stats: { name: 'Statistics', icon: '↗', category: 'Content', description: 'Put your milestones in the spotlight.' },

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
export function assetURL(name) {
  const base = typeof document !== 'undefined' ? document.baseURI : 'https://chamod98chandimal.github.io/newpro/';
  return new URL(`media/${name}`, base).href;
}
export const clone = value => JSON.parse(JSON.stringify(value));
export const elementName = type => elements[type]?.name || 'Element';
export function createElement(type) {
  if (!Object.hasOwn(elements, type)) throw new Error('Unsupported element.');
  const base = { type, eyebrow: '', title: '', body: '', align: 'left', padding: 'medium' };
  switch (type) {
    case 'productGrid': return { ...base, title: 'Considered essentials.', eyebrow: 'THE COLLECTION', items: [
      { title: 'Everyday vessel', body: 'Warm textures. Simple forms.', price: '$38', src: assetURL('ceramic.svg'), button: 'View item', url: '#' },
      { title: 'The studio collection', body: 'Designed for daily rituals.', price: '$65', src: assetURL('interior.svg'), button: 'View item', url: '#' },
      { title: 'Modern essentials', body: 'Your next favourite detail.', price: '$49', src: assetURL('fashion.svg'), button: 'View item', url: '#' },
    ] };
    case 'social': return { ...base, title: 'Stay in the loop.', items: [{ title: 'Instagram', icon: '◎', url: 'https://www.instagram.com/' }, { title: 'LinkedIn', icon: 'in', url: 'https://www.linkedin.com/' }, { title: 'GitHub', icon: '⌘', url: 'https://github.com/' }] };
    case 'slider': return { ...base, padding: 'none', title: 'A fresh perspective.', items: [
      { title: 'Spaces for better living.', body: 'Thoughtful design. Everyday inspiration.', src: assetURL('interior.svg'), button: 'Explore the collection', url: '#' },
      { title: 'Made to make a difference.', body: 'Discover the details that make a space your own.', src: assetURL('architecture.svg'), button: 'Discover our story', url: '#' },
      { title: 'Good design starts here.', body: 'Bring your next idea to life with us.', src: assetURL('workspace.svg'), button: 'Get in touch', url: 'mailto:hello@example.com' },
    ] };
    case 'gallery': return { ...base, title: 'A closer look.', eyebrow: 'SELECTED MOMENTS', items: [
      { title: 'Quiet corners', src: assetURL('interior.svg') }, { title: 'Built with purpose', src: assetURL('architecture.svg') }, { title: 'The little details', src: assetURL('ceramic.svg') },
    ] };
    case 'imageBox': return { ...base, src: assetURL('interior.svg'), alt: 'A thoughtfully designed interior', title: 'A space of your own.', body: 'Discover a collection made for the way you live.', button: 'Explore collection', url: '#', padding: 'small' };
    case 'iconBox': return { ...base, icon: '✧', title: 'Thoughtfully made.', body: 'A little more care in every detail. That is what makes the difference.', padding: 'small' };
    case 'accordion': return { ...base, title: 'A few good questions.', eyebrow: 'GOOD TO KNOW', items: [
      { title: 'How do we get started?', body: 'Tell us a little about your idea. We will explore the possibilities together and find the right next step.' },
      { title: 'Can I make it my own?', body: 'Absolutely. Every project starts with your story, your goals, and the details that matter to you.' },
      { title: 'What happens after launch?', body: 'Your website can grow with you. Keep your project backup and return whenever inspiration strikes.' },
    ] };
    case 'tabs': return { ...base, title: 'The details make the difference.', items: [
      { title: 'Our story', body: 'Independent minds. Shared ambition. We started with a simple belief: good design should feel effortless.' },
      { title: 'Our approach', body: 'We listen, explore, and create. A clear process gives every idea the space it needs to become something meaningful.' },
      { title: 'Our promise', body: 'Considered choices, honest communication, and attention to every detail — from the first conversation to the final result.' },
    ] };
    case 'testimonials': return { ...base, title: 'Good words from good people.', eyebrow: 'IN THEIR WORDS', items: [
      { title: 'Jordan Lee', body: 'A thoughtful process from start to finish. The result feels completely like us.', icon: '★★★★★', price: 'Studio founder' },
      { title: 'Sam Rivera', body: 'The care, attention, and fresh perspective made all the difference.', icon: '★★★★★', price: 'Independent maker' },
    ] };
    case 'team': return { ...base, title: 'Meet the people behind the ideas.', eyebrow: 'OUR PEOPLE', items: [
      { title: 'Alex Morgan', body: 'Creative director', src: assetURL('workspace.svg') },
      { title: 'Jamie Park', body: 'Design lead', src: assetURL('interior.svg') },
      { title: 'Taylor Reed', body: 'Project partner', src: assetURL('architecture.svg') },
    ] };
    case 'pricing': return { ...base, title: 'A good fit for every next step.', eyebrow: 'SIMPLE OPTIONS', items: [
      { title: 'Essential', price: '$29', body: 'A focused starting point\nCore features included\nEmail support', button: 'Choose Essential', url: 'mailto:hello@example.com?subject=Essential' },
      { title: 'Studio', price: '$59', body: 'Room to grow\nEverything in Essential\nPriority support', button: 'Choose Studio', url: 'mailto:hello@example.com?subject=Studio' },
      { title: 'Partner', price: 'Let’s talk', body: 'A plan built around you\nPersonal guidance\nDedicated support', button: 'Get in touch', url: 'mailto:hello@example.com' },
    ] };
    case 'video': return { ...base, title: 'See the bigger picture.', url: '', body: 'Add a YouTube or Vimeo link to share your story.' };
    case 'message': return { ...base, title: 'Something worth knowing.', body: 'A small announcement, an important update, or a friendly note for your visitors.', variant: 'info', padding: 'small' };
    case 'logoCloud': return { ...base, eyebrow: 'IN GOOD COMPANY', title: 'Better, together.', items: [{ title: 'NORTHLINE' }, { title: 'forma.' }, { title: 'STUDIO / 08' }, { title: 'EVERGREEN' }, { title: 'ARC & CO' }] };
    case 'stats': return { ...base, items: [{ title: 'Projects delivered', price: '120+' }, { title: 'Years of experience', price: '12' }, { title: 'Happy partners', price: '98%' }] };

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
export function safeVideoURL(value) {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.username || url.password) return '';
    const host = url.hostname.toLowerCase();
    let id;
    if (host === 'youtu.be') id = url.pathname.split('/')[1];
    if (['youtube.com', 'www.youtube.com', 'www.youtube-nocookie.com'].includes(host)) id = url.pathname.startsWith('/embed/') ? url.pathname.split('/')[2] : url.searchParams.get('v');
    if (id && /^[a-zA-Z0-9_-]{6,20}$/.test(id)) return `https://www.youtube-nocookie.com/embed/${id}?rel=0`;
    if (['vimeo.com', 'www.vimeo.com', 'player.vimeo.com'].includes(host)) { const parts = url.pathname.split('/').filter(Boolean); const video = parts.at(-1); if (/^\d{5,12}$/.test(video)) return `https://player.vimeo.com/video/${video}`; }
  } catch {}
  return '';
}
const hexColor = value => typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value);
const validId = value => typeof value === 'string' && /^[a-z0-9-]{1,80}$/i.test(value);
export function validateSite(site) {
  if (!site || site.version !== 1 || typeof site.name !== 'string' || site.name.length > 200 || typeof site.description !== 'string' || site.description.length > 20000 || !hexColor(site.accent) || !hexColor(site.background)) throw new Error('Invalid project settings.');
  if (site.theme !== undefined && !['atelier', 'market', 'agency', 'classic'].includes(site.theme)) throw new Error('Invalid theme.');
  if (site.font !== undefined && !['sans', 'serif'].includes(site.font)) throw new Error('Invalid font.');
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
      for (const field of ['button', 'url', 'src', 'alt', 'icon']) if (section[field] !== undefined && (typeof section[field] !== 'string' || section[field].length > 20000)) throw new Error('Invalid element link or image.');
      if (section.variant !== undefined && !['info', 'success', 'warning'].includes(section.variant)) throw new Error('Invalid message variant.');
      if (section.items !== undefined) {
        if (!Array.isArray(section.items) || section.items.length > 12) throw new Error('Use up to 12 items per element.');
        for (const item of section.items) {
          if (!item || typeof item !== 'object' || Array.isArray(item)) throw new Error('Invalid element item.');
          for (const field of ['title', 'body', 'src', 'url', 'button', 'price', 'icon']) if (item[field] !== undefined && (typeof item[field] !== 'string' || item[field].length > 20000)) throw new Error('Invalid item content.');
        }
      }
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
    const items = Array.isArray(s.items) ? s.items.slice(0, 12) : [];
    const itemImage = (item, className = '') => { const src = safeImageURL(item.src); return src ? `<img class="${className}" src="${e(src)}" alt="${e(item.title || '')}" loading="${preview ? 'eager' : 'lazy'}">` : '<div class="ux-media-placeholder" aria-hidden="true">◫</div>'; };
    const itemButton = item => item.button ? `<a class="button" href="${e(safeURL(item.url))}">${e(item.button)} <span aria-hidden="true">↗</span></a>` : '';
    const uid = `ux-${path.replaceAll('.', '-')}`;
    if (type === 'productGrid') return `<section ${attrs}>${text}${body}<div class="ux-products">${items.map(item => `<article>${itemImage(item)}<div class="ux-product-copy"><h3>${e(item.title)}</h3><span class="ux-product-price">${e(item.price)}</span><p>${e(item.body)}</p>${itemButton(item)}</div></article>`).join('')}</div></section>`;
    if (type === 'social') return `<section ${attrs}>${text}${body}<nav class="ux-social" aria-label="Social profiles">${items.map(item => `<a href="${e(safeURL(item.url))}" aria-label="${e(item.title)}"><span aria-hidden="true">${e(item.icon || '↗')}</span>${e(item.title)}</a>`).join('')}</nav></section>`;
    if (type === 'slider') return `<section ${attrs}><div class="ux-slider" aria-label="${e(s.title || 'Featured slides')}">${items.map((item, n) => `<article class="ux-slide" id="${uid}-slide-${n}">${itemImage(item, 'ux-slide-image')}<div class="ux-slide-shade"></div><div class="ux-slide-copy"><span class="ux-kicker">${String(n + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}</span><h2>${e(item.title)}</h2><p>${e(item.body)}</p>${itemButton(item)}</div><nav class="ux-slide-controls" aria-label="Slide ${n + 1} controls"><a data-preview-interaction href="#${uid}-slide-${(n - 1 + items.length) % items.length}" aria-label="Previous slide">←</a><a data-preview-interaction href="#${uid}-slide-${(n + 1) % items.length}" aria-label="Next slide">→</a></nav></article>`).join('')}</div><nav class="ux-slide-dots" aria-label="Choose a slide">${items.map((_, n) => `<a data-preview-interaction href="#${uid}-slide-${n}" aria-label="Slide ${n + 1}">${n + 1}</a>`).join('')}</nav></section>`;
    if (type === 'gallery') return `<section ${attrs}>${text}${body}<div class="ux-gallery">${items.map(item => `<figure>${itemImage(item)}<figcaption>${e(item.title)}</figcaption></figure>`).join('')}</div></section>`;
    if (type === 'imageBox') return `<section ${attrs}><article class="ux-image-box">${itemImage({ src: s.src, title: s.alt || s.title })}<div class="ux-image-box-copy">${text}${body}${button}</div></article></section>`;
    if (type === 'iconBox') return `<section ${attrs}><article class="ux-icon-box"><span class="ux-feature-icon" aria-hidden="true">${e(s.icon || '✧')}</span><div>${text}${body}</div></article></section>`;
    if (type === 'accordion') return `<section ${attrs}>${text}${body}<div class="ux-accordion">${items.map((item, n) => `<details${n === 0 ? ' open' : ''}><summary data-preview-interaction>${e(item.title)}<span aria-hidden="true">+</span></summary><div><p>${e(item.body)}</p></div></details>`).join('')}</div></section>`;
    if (type === 'tabs') return `<section ${attrs}>${text}${body}<div class="ux-tabs" style="--tab-count:${Math.max(1, items.length)}">${items.map((item, n) => `<input data-preview-interaction class="ux-tab-input" type="radio" name="${uid}-tabs" id="${uid}-tab-${n}" aria-label="${e(item.title)}"${n === 0 ? ' checked' : ''}><label data-preview-interaction for="${uid}-tab-${n}">${e(item.title)}</label><div class="ux-tab-pane"><h3>${e(item.title)}</h3><p>${e(item.body)}</p>${safeImageURL(item.src) ? itemImage(item) : ''}</div>`).join('')}</div></section>`;
    if (type === 'testimonials') return `<section ${attrs}>${text}${body}<div class="ux-testimonials">${items.map(item => `<figure><div class="ux-stars" aria-label="Customer rating">${e(item.icon || '★★★★★')}</div><blockquote>${e(item.body)}</blockquote><figcaption><strong>${e(item.title)}</strong><span>${e(item.price || '')}</span></figcaption></figure>`).join('')}</div></section>`;
    if (type === 'team') return `<section ${attrs}>${text}${body}<div class="ux-team">${items.map(item => `<article>${itemImage(item)}<h3>${e(item.title)}</h3><p>${e(item.body)}</p></article>`).join('')}</div></section>`;
    if (type === 'pricing') return `<section ${attrs}>${text}${body}<div class="ux-pricing">${items.map((item, n) => `<article${n === 1 ? ' class="ux-pricing-featured"' : ''}>${n === 1 ? '<span class="ux-plan-label">A LITTLE MORE POSSIBILITY</span>' : ''}<h3>${e(item.title)}</h3><div class="ux-price">${e(item.price)}</div><ul>${String(item.body || '').split('\n').filter(Boolean).map(line => `<li><span aria-hidden="true">✓</span>${e(line)}</li>`).join('')}</ul>${itemButton(item)}</article>`).join('')}</div></section>`;
    if (type === 'video') { const video = safeVideoURL(s.url); return `<section ${attrs}>${text}${body}${video ? `<div class="ux-video"><iframe src="${e(video)}" title="${e(s.title || 'Embedded video')}" loading="lazy" allow="fullscreen; picture-in-picture" allowfullscreen sandbox="allow-scripts allow-same-origin allow-presentation" referrerpolicy="strict-origin-when-cross-origin"></iframe></div>` : '<div class="ux-video-placeholder"><span aria-hidden="true">▷</span><strong>Your story, in motion.</strong><p>Add a YouTube or Vimeo video link in the editor.</p></div>'}</section>`; }
    if (type === 'message') return `<section ${attrs}><aside class="ux-message ux-message-${['info', 'success', 'warning'].includes(s.variant) ? s.variant : 'info'}"><span class="ux-message-icon" aria-hidden="true">${s.variant === 'success' ? '✓' : s.variant === 'warning' ? '!' : 'i'}</span><div>${text}${body}</div></aside></section>`;
    if (type === 'logoCloud') return `<section ${attrs}>${text}${body}<div class="ux-logos">${items.map(item => `<span>${safeImageURL(item.src) ? itemImage(item) : e(item.title)}</span>`).join('')}</div></section>`;
    if (type === 'stats') return `<section ${attrs}>${text}${body}<div class="ux-stats">${items.map(item => `<article><strong>${e(item.price)}</strong><span>${e(item.title)}</span>${item.body ? `<p>${e(item.body)}</p>` : ''}</article>`).join('')}</div></section>`;
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
/* Original, responsive content components. */
.ux-products{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:25px;margin-top:32px}.ux-products>article{background:#ffffff80;border:1px solid #293c3112}.ux-products img{display:block;aspect-ratio:4/5;object-fit:cover;width:100%}.ux-product-copy{padding:24px}.ux-products h3{font:600 18px/1.3 system-ui,sans-serif;letter-spacing:-.4px;margin-bottom:10px}.ux-product-price{font-weight:600;font-size:16px;color:var(--accent)}.ux-products p{font-size:12px;margin:14px 0}.ux-products .button{font-size:10px;padding:10px 14px;gap:15px}.ux-social{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}.ux-social a{display:inline-flex;align-items:center;gap:10px;padding:10px 15px;border:1px solid #293c3125;text-decoration:none;border-radius:3px;font-size:12px}.ux-social a>span{font-weight:700;font-size:18px}.ux-social a:hover{background:#e5eadc}.column .ux-products{grid-template-columns:1fr}@media(max-width:700px){.ux-products{grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.ux-product-copy{padding:18px}}@media(max-width:430px){.ux-products{grid-template-columns:1fr}}

.ux-kicker{font-size:11px;letter-spacing:2px;font-weight:600}.slider.section{padding:0;border:0}.ux-slider{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;scroll-behavior:smooth;scrollbar-width:none}.ux-slider::-webkit-scrollbar{display:none}.ux-slide{position:relative;flex:0 0 100%;min-height:520px;scroll-snap-align:start;isolation:isolate;background:#1f3430;color:white;display:flex;align-items:center;padding:70px 8%}.ux-slide-image{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:-2}.ux-slide-shade{position:absolute;inset:0;background:linear-gradient(90deg,#152925c9,#15292515);z-index:-1}.ux-slide-copy{max-width:620px}.ux-slide h2{font:600 clamp(38px,6vw,78px)/1.02 system-ui,sans-serif;letter-spacing:-3px;color:inherit;margin:22px 0}.ux-slide p{color:#fffdf5dd;max-width:430px}.ux-slide .button{background:white;color:#243a33;border-radius:3px}.ux-slide-controls{position:absolute;bottom:34px;right:5%;display:flex;gap:8px}.ux-slide-controls a{display:grid;place-items:center;border:1px solid #ffffff80;width:38px;height:38px;text-decoration:none;border-radius:50%;color:white}.ux-slide-controls a:hover{background:#ffffff25}.ux-slide-dots{display:flex;justify-content:center;gap:9px;padding:16px;background:#ffffff08}.ux-slide-dots a{display:grid;place-items:center;width:25px;height:25px;border:1px solid #c5cfc4;border-radius:50%;font-size:10px;text-decoration:none}.ux-slide-dots a:hover{background:var(--accent);color:#fff}.ux-gallery{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px;margin-top:32px}.ux-gallery img{width:100%;height:300px;object-fit:cover;display:block;border-radius:2px}.ux-gallery figure:nth-child(2n) img{object-position:center 70%}.ux-gallery figcaption{margin-top:12px;font-size:12px;letter-spacing:.3px}.ux-media-placeholder{min-height:220px;display:grid;place-items:center;font-size:44px;color:#6e8776;background:linear-gradient(135deg,#e7eadf,#ceddcc)}.ux-image-box{overflow:hidden;border:1px solid #293c3120;background:#ffffffb0}.ux-image-box>img{width:100%;height:300px;object-fit:cover;display:block}.ux-image-box-copy{padding:30px}.ux-image-box h2{font:500 28px/1.2 system-ui,sans-serif;letter-spacing:-.8px}.ux-image-box p{font-size:14px}.ux-icon-box{display:flex;gap:22px;align-items:flex-start}.ux-feature-icon{display:grid;place-items:center;width:62px;height:62px;border:1px solid #5d826849;border-radius:50%;font-size:31px;color:var(--accent);flex-shrink:0}.ux-icon-box h2{font:600 24px/1.25 system-ui,sans-serif;letter-spacing:-.6px}.ux-icon-box p{font-size:14px;margin-bottom:0}.ux-accordion{margin-top:35px;border-top:1px solid #293c3122}.ux-accordion details{border-bottom:1px solid #293c3122}.ux-accordion summary{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:20px 0;list-style:none;cursor:pointer;font-weight:600;font-size:15px}.ux-accordion summary::-webkit-details-marker{display:none}.ux-accordion summary span{font-size:22px;font-weight:300;color:var(--accent)}.ux-accordion details[open] summary span{transform:rotate(45deg)}.ux-accordion details>div{padding:0 30px 10px 0}.ux-accordion p{margin-top:0;font-size:14px;max-width:850px}.ux-tabs{display:grid;grid-template-columns:repeat(var(--tab-count),minmax(0,1fr));margin-top:32px;position:relative}.ux-tab-input{position:absolute;opacity:0;width:1px;height:1px}.ux-tabs>label{cursor:pointer;padding:15px 12px;font-size:13px;font-weight:600;text-align:center;border-bottom:2px solid #293c311a;grid-row:1}.ux-tab-input:checked+label{color:var(--accent);border-bottom-color:var(--accent)}.ux-tab-input:focus-visible+label{outline:3px solid var(--accent);outline-offset:2px}.ux-tab-pane{display:none;grid-column:1/-1;grid-row:2;padding:30px 0}.ux-tab-input:checked+label+.ux-tab-pane{display:block}.ux-tab-pane h3{font:600 23px/1.3 system-ui,sans-serif;letter-spacing:-.7px}.ux-tab-pane p{max-width:850px;font-size:14px}.ux-tab-pane img{width:100%;max-height:400px;object-fit:cover}.ux-testimonials{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px;margin-top:32px}.ux-testimonials figure{border:1px solid #293c3120;background:#fff9;padding:32px}.ux-stars{color:#b48a44;letter-spacing:3px;font-size:16px}.ux-testimonials blockquote{margin:20px 0 28px;font:400 23px/1.5 Georgia,serif;color:#3f5045}.ux-testimonials figcaption strong,.ux-testimonials figcaption span{display:block}.ux-testimonials figcaption strong{font-size:12px;color:#293c31}.ux-testimonials figcaption span{font-size:11px;margin-top:4px;color:#7c897c}.ux-team{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:26px;margin-top:32px}.ux-team img{width:100%;height:280px;object-fit:cover;display:block;margin-bottom:20px}.ux-team h3{font:600 18px/1.3 system-ui,sans-serif;letter-spacing:-.4px}.ux-team p{font-size:12px;margin-top:6px}.ux-pricing{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px;margin-top:40px;align-items:stretch}.ux-pricing>article{border:1px solid #293c3122;padding:35px 28px;background:#fff9;position:relative;display:flex;flex-direction:column}.ux-pricing>article.ux-pricing-featured{border:2px solid var(--accent);padding:34px 27px}.ux-plan-label{position:absolute;left:-2px;right:-2px;top:-22px;background:var(--accent);color:#fff;font-size:8px;letter-spacing:1.1px;text-align:center;line-height:22px}.ux-pricing h3{font:600 19px/1.3 system-ui,sans-serif;letter-spacing:-.3px}.ux-price{font:600 38px/1.2 system-ui,sans-serif;letter-spacing:-1.5px;margin:25px 0}.ux-pricing ul{list-style:none;padding:0;margin:0 0 24px;font-size:12px;color:#677766;flex:1}.ux-pricing li{padding:9px 0;border-bottom:1px solid #293c3112}.ux-pricing li span{margin-right:10px;color:var(--accent)}.ux-pricing .button{font-size:11px;justify-content:space-between}.ux-video{position:relative;aspect-ratio:16/9;background:#132e28;margin-top:30px;overflow:hidden}.ux-video iframe{position:absolute;inset:0;width:100%;height:100%;border:0}.ux-video-placeholder{min-height:330px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:#f0f3e9;background:linear-gradient(140deg,#152b27,#4b6352);margin-top:30px;padding:35px}.ux-video-placeholder>span{display:grid;place-items:center;width:70px;height:70px;border-radius:50%;border:1px solid #ffffff55;font-size:30px;margin-bottom:18px}.ux-video-placeholder strong{font:500 24px/1.3 system-ui,sans-serif}.ux-video-placeholder p{color:#e1e8d9b0;font-size:12px}.ux-message{display:flex;align-items:flex-start;gap:18px;padding:26px 28px;border-left:3px solid #6b8b98;background:#edf3f5}.ux-message-icon{flex-shrink:0;display:grid;place-items:center;border:1px solid currentColor;border-radius:50%;width:26px;height:26px;color:#5a7c89;font-size:15px}.ux-message h2{font:600 17px/1.4 system-ui,sans-serif;letter-spacing:-.2px}.ux-message p{font-size:13px;margin:8px 0 0;max-width:none}.ux-message-success{background:#edf4e8;border-left-color:#6b8a54}.ux-message-success .ux-message-icon{color:#6b8a54}.ux-message-warning{background:#fbf3df;border-left-color:#ae8a39}.ux-message-warning .ux-message-icon{color:#ae8a39}.ux-logos{display:flex;align-items:center;justify-content:space-around;gap:32px;flex-wrap:wrap;margin:36px 0 15px}.ux-logos>span{font:700 clamp(15px,2vw,23px)/1 system-ui,sans-serif;letter-spacing:1px;color:#6a7768;filter:grayscale(1)}.ux-logos img{width:120px;height:50px;object-fit:contain}.ux-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:30px}.ux-stats article{padding:20px;border-right:1px solid #293c3120;text-align:center}.ux-stats article:last-child{border-right:0}.ux-stats strong{display:block;font:600 clamp(34px,5vw,60px)/1.2 system-ui,sans-serif;letter-spacing:-2px;color:var(--accent)}.ux-stats article>span{display:block;font-size:12px;color:#6e7d6a;margin-top:12px}.ux-stats p{font-size:12px}.column .ux-gallery,.column .ux-team,.column .ux-pricing,.column .ux-testimonials{grid-template-columns:1fr}.column .ux-gallery img,.column .ux-team img{height:220px}.column .ux-slide{min-height:380px;padding:35px 8%}.column .ux-slide h2{font-size:35px;letter-spacing:-1px}.column .ux-stats{grid-template-columns:1fr}.column .ux-stats article{border-right:0;border-bottom:1px solid #293c3120}.column .ux-icon-box{display:block}.column .ux-feature-icon{margin-bottom:20px}@media(max-width:700px){.ux-slide{min-height:420px;padding:55px 8%}.ux-slide h2{font-size:44px;letter-spacing:-1.8px}.ux-gallery,.ux-team{grid-template-columns:repeat(2,minmax(0,1fr))}.ux-gallery img,.ux-team img{height:220px}.ux-pricing,.ux-testimonials{grid-template-columns:1fr}.ux-pricing>article{margin-top:12px}.ux-stats{gap:0}.ux-stats article{padding:15px 8px}.ux-stats strong{font-size:38px}.ux-tabs>label{font-size:11px;padding:14px 6px}.ux-icon-box{gap:15px}.ux-image-box-copy{padding:24px}}@media(prefers-reduced-motion:reduce){html,.ux-slider{scroll-behavior:auto}}

${themeCSS(site)}
</style></head><body data-theme="${['atelier', 'market', 'agency'].includes(site.theme) ? site.theme : 'classic'}"><header><a class="brand" href="${preview ? '#' : 'index.html'}">${e(site.name)}<span style="color:var(--accent)">.</span></a><nav>${site.pages.map((p, i) => `<a href="${preview ? '#' : e(pageFilename(site, i))}"${p.id === page.id ? ' aria-current="page"' : ''}>${e(p.name)}</a>`).join('')}</nav></header><main>${sections}</main><footer><span>© ${new Date().getFullYear()} ${e(site.name)}</span><span>Made with intention.</span></footer></body></html>`;
}
