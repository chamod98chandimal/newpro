import { elements, createElement, createSite, renderDocument, escapeHTML as e } from './model.js';

export function elementPreview(type) {
  const site = createSite();
  site.theme = 'agency'; site.font = 'sans'; site.accent = '#5368e8'; site.background = '#ffffff';
  site.pages[0].sections = [createElement(type)];
  return renderDocument(site, site.pages[0]).replace('</head>', `<style>
header,footer{display:none!important}body{background:#fff!important}body main{min-height:0!important}.section{padding:24px!important;border:0!important}.section h1,.section h2{font-size:28px!important;letter-spacing:-.7px!important}.section p{font-size:12px!important}.section .eyebrow{font-size:8px!important;margin-bottom:10px!important}.hero .art{height:190px!important}.section .button{font-size:11px!important;padding:10px 15px!important}.row-grid{gap:12px!important}.column .section{padding:10px!important}a:not([data-preview-interaction]){pointer-events:none}img{max-height:220px!important;object-fit:cover!important}.spacer{background:repeating-linear-gradient(135deg,#f3f4f8,#f3f4f8 8px,#e9edf5 8px,#e9edf5 9px)!important}.divider{padding-top:70px!important;padding-bottom:70px!important}.button{border-radius:3px!important}
</style></head>`);
}
export function mountShowcase(root, { onInsert }) {
  let mounted = false;
  function render() {
    if (mounted) return;
    mounted = true;
    const categories = ['All', ...new Set(Object.values(elements).map(item => item.category))];
    root.innerHTML = `<div class="showcase"><nav class="showcase-nav"><a class="showcase-brand" href="#/home">folio<span>®</span></a><div><a href="#/home">Home</a><a href="#/elements" aria-current="page">Elements</a><a href="#/dashboard">Dashboard</a><a href="#/builder" class="showcase-open">Open builder ↗</a></div></nav><header class="showcase-heading"><span>THE ELEMENT COLLECTION</span><h1>A building block for<br>every bright idea.</h1><p>Explore ${Object.keys(elements).length} original, customizable elements. Open a preview to try the interactive controls, then add a block to your page and make it yours.</p></header><section class="showcase-filter" aria-label="Filter elements"><div class="showcase-categories">${categories.map((category, i) => `<button data-showcase-category="${category}" aria-pressed="${i === 0}" class="${i === 0 ? 'active' : ''}">${category}</button>`).join('')}</div><input type="search" aria-label="Find an element" placeholder="Search the collection…"></section><div class="showcase-grid">${Object.entries(elements).map(([type, meta], index) => `<article data-showcase-type="${type}" data-search="${e((meta.name + ' ' + meta.description).toLowerCase())}" data-category="${e(meta.category)}"><div class="showcase-sample"><iframe title="${e(meta.name)} example" sandbox="" loading="lazy" srcdoc="${e(elementPreview(type))}"></iframe><span class="showcase-number">${String(index + 1).padStart(2,'0')}</span></div><div class="showcase-card-body"><span>${e(meta.category)}</span><h2>${e(meta.name)}</h2><p>${e(meta.description)}</p><div class="showcase-card-actions"><button data-showcase-preview="${type}" aria-label="Preview ${e(meta.name)}">Preview</button><button data-showcase-insert="${type}">Add to page <span>↗</span></button></div></div></article>`).join('')}</div><p class="showcase-no-results" hidden>No elements found. Try a different search.</p><footer class="showcase-footer"><a href="#/home">folio®</a><span>Original elements. Endless possibilities.</span><a href="#/builder">Back to your builder ↗</a></footer><dialog class="showcase-demo" aria-labelledby="demo-name"><header><div><span>ELEMENT PREVIEW</span><h2 id="demo-name"></h2></div><button data-close-demo aria-label="Close preview">×</button></header><div id="demo-surface" tabindex="0" aria-label="Interactive element preview"></div><footer><p>Try the controls, then make this element yours.</p><button id="demo-insert">Add to my page ↗</button></footer></dialog></div>`;
    let active = 'All', demoType;
    const dialog = root.querySelector('.showcase-demo');
    // The expanded demo uses trusted factory output in a shadow tree: native
    // controls remain interactive without scaled iframe hit-testing or CSS leaks.
    const surface = root.querySelector('#demo-surface').attachShadow({ mode: 'open' });
    surface.addEventListener('click', event => {
      const link = event.target.closest('a');
      if (!link) return;
      event.preventDefault();
      if (link.hasAttribute('data-preview-interaction') && link.getAttribute('href')?.startsWith('#')) {
        surface.getElementById(link.getAttribute('href').slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      }
    });
    dialog.addEventListener('close', () => { surface.replaceChildren(); });
    const search = root.querySelector('input');
    function filter() {
      let visible = 0;
      root.querySelectorAll('[data-showcase-type]').forEach(card => {
        card.hidden = (active !== 'All' && card.dataset.category !== active) || !card.dataset.search.includes(search.value.toLowerCase().trim());
        if (!card.hidden) visible++;
      });
      root.querySelector('.showcase-no-results').hidden = visible > 0;
      root.querySelectorAll('[data-showcase-category]').forEach(button => { button.classList.toggle('active', active === button.dataset.showcaseCategory); button.setAttribute('aria-pressed', active === button.dataset.showcaseCategory); });
    }
    search.addEventListener('input', filter);
    root.addEventListener('click', event => {
      const button = event.target.closest('button');
      if (button?.dataset.showcaseCategory) { active = button.dataset.showcaseCategory; filter(); }
      if (button?.dataset.showcasePreview) {
        demoType = button.dataset.showcasePreview;
        root.querySelector('#demo-name').textContent = elements[demoType].name;
        const example = new DOMParser().parseFromString(elementPreview(demoType), 'text/html');
        example.body.querySelectorAll('header,footer').forEach(element => element.remove());
        const styles = [...example.head.querySelectorAll('style')].map(style => style.textContent.replace(/\bbody\b/g, ':host')).join('\n');
        surface.innerHTML = `<style>:host{display:block;color:#28372f;font:15px/1.7 system-ui,sans-serif;--accent:#5368e8}${styles}</style>${example.body.innerHTML}`;
        dialog.showModal();
      }
      if (button?.hasAttribute('data-close-demo')) dialog.close();
      if (button?.id === 'demo-insert') { dialog.close(); onInsert(demoType); }
      if (button?.dataset.showcaseInsert) onInsert(button.dataset.showcaseInsert);
    });
  }
  return { render };
}
