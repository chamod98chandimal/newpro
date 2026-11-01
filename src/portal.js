import './portal.css';
import { escapeHTML as e } from './model.js';

const themeCards = [
  { key: 'atelier', name: 'Atelier', kind: 'Lifestyle & interiors', color: 'warm', word: 'Objects with a story.', desc: 'Warm editorial layouts, bold collections, and room for beautiful imagery.' },
  { key: 'market', name: 'Market', kind: 'Product catalogue', color: 'bright', word: 'Everyday, elevated.', desc: 'A crisp storefront-style catalogue for showcasing your products.' },
  { key: 'agency', name: 'Agency', kind: 'Business & creative', color: 'dark', word: 'Ideas into impact.', desc: 'Confident typography and polished sections for your next venture.' },
];

function countElements(site) {
  return site.pages.reduce((total, page) => total + page.sections.reduce((count, block) => count + 1 + (block.type === 'row' ? block.columns.reduce((sum, column) => sum + column.children.length, 0) : 0), 0), 0);
}

function themeCard(theme) {
  return `<article class="portal-theme-card"><div class="portal-theme-preview ${theme.color}" aria-hidden="true"><div class="mini-nav"><strong>${theme.name.toUpperCase()}</strong><span>COLLECTION &nbsp; ABOUT &nbsp; ☰</span></div><div class="mini-theme-hero"><div><span>THE NEW COLLECTION</span><strong>${theme.word}</strong><i>DISCOVER MORE →</i></div><div class="mini-product-art"><b></b><i></i><span></span></div></div><div class="mini-theme-tiles"><i></i><i></i><i></i></div></div><div class="portal-theme-card-body"><span>${theme.kind}</span><h3>${theme.name}</h3><p>${theme.desc}</p><button data-portal-theme="${theme.key}">Use ${theme.name} <span aria-hidden="true">→</span></button></div></article>`;
}

function header(route) {
  return `<div class="portal-announcement">YOUR IDEAS. YOUR WEBSITE. YOUR OWN SPACE. <span>Made for the way you create.</span></div><header class="portal-header"><a class="portal-logo" href="#/home" aria-label="Folio home"><span>f</span> folio<span class="portal-logo-dot">.</span></a><nav aria-label="Workspace navigation"><a href="#/home" ${route === 'home' ? 'aria-current="page"' : ''}>Home</a><a href="#/builder">Builder</a><a href="#/elements">Elements</a><a href="#/dashboard" ${route === 'dashboard' ? 'aria-current="page"' : ''}>Dashboard</a></nav><span class="portal-workspace-label"><i></i> Your workspace</span></header>`;
}

function footer() {
  return `<footer class="portal-footer"><a class="portal-logo" href="#/home"><span>f</span> folio<span class="portal-logo-dot">.</span></a><p>A little imagination. A place of your own.</p><span>Local workspace · Back up your work with project export</span></footer>`;
}

function home(site) {
  return `${header('home')}<main><section class="portal-hero"><div class="portal-hero-copy"><div class="portal-eyebrow"><span></span> A NEW HOME FOR YOUR IDEAS</div><h1>Your next website.<br><em>Made by you.</em></h1><p>From the first idea to the final detail. Design with ready-to-use elements, make a theme your own, and manage your website in one place.</p><div class="portal-entry-actions"><a class="portal-button primary" href="#/builder">Website Builder <span aria-hidden="true">→</span></a><a class="portal-button secondary" href="#/dashboard">Site Dashboard <span aria-hidden="true">→</span></a></div><div class="portal-hero-note"><span>✦</span> Start creating. No download needed.</div></div><div class="portal-hero-visual" aria-hidden="true"><div class="portal-orbit orbit-one"></div><div class="portal-orbit orbit-two"></div><div class="portal-preview-window"><div class="portal-window-chrome"><div><i></i><i></i><i></i></div><span>YOUR NEXT GREAT IDEA</span><span>→</span></div><div class="portal-preview-menu"><strong>ATELIER<span>®</span></strong><span>Collection &nbsp; Our story &nbsp; ☰</span></div><div class="portal-preview-content"><div><span>THOUGHTFULLY MADE</span><strong>Less ordinary.<br>More you.</strong><p>Beautiful things for everyday living.</p><i>EXPLORE COLLECTION →</i></div><div class="portal-vase-scene"><i class="scene-circle"></i><i class="scene-vase"></i><i class="scene-plinth"></i><i class="scene-leaf"></i></div></div><div class="portal-preview-foot"><span>DESIGNED WITH INTENTION</span><span>01 — 03</span></div></div><div class="portal-floating-card"><span>▦</span><div><strong>Build it your way</strong><small>Elements, themes & endless ideas</small></div><b>✓</b></div></div></section><section class="portal-benefits" aria-label="Workspace features"><span><i>◈</i> Ready-to-use themes</span><span><i>▦</i> Visual building blocks</span><span><i>▣</i> Responsive by design</span><span><i>→</i> Portable website exports</span></section><section class="portal-workspace-section"><div class="portal-section-heading"><div><span class="portal-eyebrow">TWO SPACES. ONE WORKFLOW.</span><h2>Create here. Manage here.</h2></div><p>Everything has its place, so you can focus on what you’re making.</p></div><div class="portal-entry-grid"><article class="portal-entry-card"><div class="portal-entry-icon violet">▦</div><span class="portal-card-number">01 / CREATE</span><h3>Your creative studio.</h3><p>Choose a theme, arrange elements, and bring your pages to life in the visual website builder.</p><a href="#/builder">Open the builder <span aria-hidden="true">→</span></a></article><article class="portal-entry-card"><div class="portal-entry-icon blue">◫</div><span class="portal-card-number">02 / MANAGE</span><h3>Your website’s home base.</h3><p>Update site details, check your pages, export a backup, and see what’s needed to publish.</p><a href="#/dashboard">Manage your site <span aria-hidden="true">→</span></a></article></div></section><section class="portal-themes-section" id="portal-themes"><div class="portal-section-heading"><div><span class="portal-eyebrow">A HEAD START, WITH CHARACTER.</span><h2>A theme is only the beginning.</h2></div><p>Start with a complete look, then make every element your own.<br><a class="portal-explore-link" href="#/elements">Explore elements →</a></p></div><div class="portal-theme-grid">${themeCards.map(themeCard).join('')}</div></section><section class="portal-project-strip"><div><span class="portal-eyebrow">YOUR CURRENT PROJECT</span><h2>${e(site.name || 'Untitled website')}</h2><p>${site.pages.length} page${site.pages.length === 1 ? '' : 's'} · ${countElements(site)} element${countElements(site) === 1 ? '' : 's'} · Saved in this browser when you edit</p></div><a class="portal-button secondary" href="#/builder">Continue creating <span aria-hidden="true">→</span></a></section></main>${footer()}`;
}

function dashboard(site) {
  const total = countElements(site);
  return `${header('dashboard')}<main class="portal-dashboard"><div class="portal-dashboard-heading"><div><span class="portal-eyebrow">YOUR WEBSITE, AT A GLANCE</span><h1>Site dashboard<span>.</span></h1><p>A home base for ${e(site.name || 'your next idea')}.</p></div><a class="portal-button primary" href="#/builder">Open website builder <span aria-hidden="true">→</span></a></div><div class="portal-dashboard-stats"><article><span>WEBSITE</span><strong>${e(site.name || 'Untitled website')}</strong><small>Current project</small></article><article><span>PAGES</span><strong>${site.pages.length}</strong><small>Ready to shape and refine</small></article><article><span>ELEMENTS</span><strong>${total}</strong><small>Building blocks on your pages</small></article><article><span>WORKSPACE</span><strong class="portal-local-status"><i></i> Local draft</strong><small>Stored in this browser</small></article></div><div class="portal-dashboard-grid"><section class="portal-dashboard-card"><div class="portal-dashboard-card-heading"><div><span class="portal-eyebrow">THE ESSENTIALS</span><h2>Website settings</h2></div><span class="portal-small-icon">⚙</span></div><form id="portal-settings-form"><label for="portal-site-name">Project name<input id="portal-site-name" aria-label="Project name" name="name" maxlength="200" required value="${e(site.name)}" autocomplete="off"></label><label for="portal-site-description">Search description<textarea id="portal-site-description" aria-label="Search description" name="description" maxlength="20000" rows="4">${e(site.description)}</textarea><small>A short description of your website for search engines and visitors.</small></label><div class="portal-form-actions"><button class="portal-button primary" type="submit">Save settings</button><span id="portal-save-message" role="status" aria-live="polite"></span></div></form></section><section class="portal-dashboard-card"><div class="portal-dashboard-card-heading"><div><span class="portal-eyebrow">YOUR SITE STRUCTURE</span><h2>Pages & content</h2></div><span class="portal-small-icon">▤</span></div><div class="portal-dashboard-pages">${site.pages.map((page, index) => `<div><span class="portal-page-icon">${index === 0 ? '⌂' : '▤'}</span><strong>${e(page.name)}</strong><small>${page.sections.length} section${page.sections.length === 1 ? '' : 's'}</small></div>`).join('')}</div><a class="portal-text-link" href="#/builder">Edit your pages <span aria-hidden="true">→</span></a></section><section class="portal-dashboard-card"><div class="portal-dashboard-card-heading"><div><span class="portal-eyebrow">KEEP YOUR WORK CLOSE</span><h2>Your project backup</h2></div><span class="portal-small-icon">↓</span></div><p>Download a portable copy of your pages, content, and design settings. You can restore it with Import project in the builder.</p><button class="portal-button secondary" id="portal-export-project">Export project backup <span aria-hidden="true">↓</span></button><div class="portal-inline-note">Browser data can be cleared. Keep an exported backup somewhere safe.</div></section><section class="portal-dashboard-card portal-integration-card"><div class="portal-dashboard-card-heading"><div><span class="portal-eyebrow">YOUR NEXT STEP</span><h2>Connect & publish</h2></div><span class="portal-status-tag">Not connected</span></div><div class="portal-integration-row"><span class="portal-small-icon">⌘</span><div><h3>GitHub repository</h3><p>GitHub account connection and repository publishing are not available in this version. Use HTML export to upload your website files to your own repository.</p></div></div><div class="portal-integration-row"><span class="portal-small-icon">◎</span><div><h3>Domain & hosting</h3><p>After uploading your exported files, configure hosting and a custom domain with your provider. This dashboard does not manage DNS yet.</p></div></div><a class="portal-text-link" href="#/builder">Open builder to export pages <span aria-hidden="true">→</span></a></section></div><div class="portal-dashboard-note"><span>◈</span><div><strong>Your website belongs to you.</strong><p>This is a local workspace without account sign-in yet. The builder and dashboard share the same project in this browser.</p></div></div></main>${footer()}`;
}

export function mountPortal(root, { getSite, onEditSite, onSaveSettings, onExportProject, onApplyTheme }) {
  let currentRoute = 'home';
  root.addEventListener('click', event => {
    const theme = event.target.closest('[data-portal-theme]');
    if (theme) { onApplyTheme?.(theme.dataset.portalTheme); return; }
    if (event.target.closest('#portal-export-project')) { onExportProject?.(); return; }
    const builder = event.target.closest('a[href="#/builder"]');
    if (builder && onEditSite) { event.preventDefault(); onEditSite(); }
  });
  root.addEventListener('submit', async event => {
    if (event.target.id !== 'portal-settings-form') return;
    event.preventDefault();
    const form = event.target;
    const name = form.elements.name.value.trim();
    if (!name) { form.elements.name.focus(); return; }
    const button = form.querySelector('button[type="submit"]');
    const message = root.querySelector('#portal-save-message');
    button.disabled = true;
    try {
      const result = await onSaveSettings?.({ name, description: form.elements.description.value });
      message.textContent = result === false ? 'Could not save. Export a backup before closing.' : 'Settings updated in this browser.';
      if (result !== false) {
        const heading = root.querySelector('.portal-dashboard-heading p');
        if (heading) heading.textContent = `A home base for ${name}.`;
        const projectName = root.querySelector('.portal-dashboard-stats article:first-child strong');
        if (projectName) projectName.textContent = name;
      }
    } catch {
      message.textContent = 'Could not save. Please export a backup.';
    } finally { button.disabled = false; }
  });
  return {
    render(route = currentRoute) {
      currentRoute = route === 'dashboard' ? 'dashboard' : 'home';
      root.innerHTML = currentRoute === 'dashboard' ? dashboard(getSite()) : home(getSite());
    },
  };
}
