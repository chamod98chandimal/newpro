# Folio

An early, open-source visual website builder. Edit a public static website in your browser, keep a portable project backup, and export standalone HTML. No account or backend is needed for this first version.

## Develop

Requires Node.js 22.12+ or Node.js 24 LTS and npm.

```sh
npm ci
npm run dev
```

Open the address printed by Vite. `npm run build` produces `dist/`; `npm run preview` serves that production build. The relative asset base supports GitHub Pages project paths.

## Workspace navigation

The root URL opens a home page with two primary entry points: **Website Builder** (`#/builder`) and **Site Dashboard** (`#/dashboard`). These are separate workspace views sharing the same browser-local project, not separate authenticated accounts. The dashboard saves actual project settings and exports backups; GitHub authentication, repository publishing, and DNS management remain unconnected.

**Elements** (`#/elements`) is a searchable collection with rendered examples, expanded interactive previews, and one-click insertion into the builder.

## What works

- Three complete original themes — Atelier Living, Everyday Market, and Northstar Agency — plus three classic starter templates. Five original bundled SVG illustrations are included; there are no required third-party image or font services.
- Multiple pages and a searchable library of 25 elements: rows/columns, heroes, banners, feature cards, text, headings, buttons, images, dividers, spacers, sliders, galleries, image boxes, icon boxes, accordions, tabs, testimonials, teams, pricing tables, video embeds, messages, logo clouds, statistics, product showcases, and social links.
- Structured item editing for multi-item blocks, including titles, copy, images, links, prices, and labels. Native exported sliders, tabs, and accordions work without an application backend or custom JavaScript.
- One-click insertion, direct selection in the preview, duplication, arrow ordering, and drag ordering in the page outline.
- Rows with 1–4 columns; add or move content elements into columns. Columns stack on mobile.
- Per-element alignment, spacing, and background controls. Images use public URLs, descriptive alt text, and optional captions.
- Site name, SEO description, accent/background colors, and desktop/mobile previews.
- Browser-local draft persistence and validated JSON project import/export.
- Self-contained HTML page export, with escaped content and restricted link schemes.

Click **Browse elements** to insert a block after the selected page element. Choose **Row & columns** for a layout; use the + button beside each column in the outline to fill it. Drag an element onto another outline item to insert before it, or onto a column’s **+ Add element** area to append it there. The arrow controls provide a keyboard alternative for reordering within a container. Rows cannot be nested inside other rows.

Click an element in the preview or outline to edit it on the right. Preview updates preserve scroll position, loaded images, and inspector focus while typing. Preview links are intentionally inert inside an opaque-origin sandbox; links work in exported files. Only a fixed editor bridge runs in the preview. Exported HTML contains no bridge or editor scripts. Feature cards use one `title|description` per line.

Custom images are referenced by URL, not uploaded. Original starter SVG illustrations are bundled with the app; project data and exported HTML reference their absolute hosting URLs. Keep the app’s media hosting available or replace those URLs with your own assets. Standalone image blocks reserve a 16:9 display area with `object-fit: contain`; galleries and image boxes use their own responsive frames. Preview images load eagerly and exported images lazily.

Drafts belong to the current browser and origin, not a GitHub account. Clearing browser data can remove them; private mode or storage restrictions may prevent saving. Use **Export project** for backups. Importing a project or applying a template asks before replacing content.

For a multi-page site, export each page into the same directory. The first page exports as `index.html`; other filenames use stable page IDs. Upload all exported pages together so their navigation links resolve. Exported pages work without the editor or JavaScript.

## Hosting the builder

Build with `npm ci && npm run build`, then upload `dist/` to any static host. The current live site uses the built files on the separate `gh-pages` branch (Pages source: **Deploy from a branch**, `gh-pages`, `/ (root)`). Pushing source to a feature branch does not update that deployment.

Alternatively, to use the included manual GitHub Pages workflow:

1. Push this project to your repository and enable **GitHub Actions** as the Pages source in repository settings.
2. Run **Deploy builder** from the Actions tab on the branch you want to publish.
3. Use the deployment address reported by GitHub.

This deploys the **builder**, not users' exported websites. The workflow does not publish automatically on pushes.

## Validation

```sh
npm test
npm run build
npm run test:e2e
```

Browser tests use `/usr/bin/chromium` in this cloud environment. On another machine, set `CHROMIUM_PATH` to your installed Chromium/Chrome executable. Browser tests exercise home/dashboard routing, shared settings, theme application/cancellation, rendered element examples, item editing, sliders/tabs/accordions, scroll/focus and image preservation, reload persistence, rows/columns, drag ordering, responsive layouts, and exports.

## Deliberate MVP limits

This is a prototype, not a WordPress-compatible CMS or cPanel replacement. GitHub OAuth, repository writes, deployment management, real owner/member logins, custom-domain provisioning, media uploads, forms, blogging collections, undo history, and collaboration are not implemented. Product and pricing blocks are static showcases with links or email enquiries, not shopping carts or payment processing. Video URL validation supports secure YouTube/Vimeo embeds; playback also depends on provider permissions and network access. There is no pretend login or publishing button. GitHub integration is labelled as coming later.

Never put GitHub client secrets, shared access tokens, or DNS credentials into this browser app. Secure account connection and domain provisioning need a separately designed backend. GitHub Pages cannot execute PHP or a database backend; provider usage rules and quotas apply.

Project imports are capped at 2 MB, 30 pages, and 100 top-level elements per page, 300 elements total per page, and 20 elements per column. Existing v1 drafts remain compatible. This prototype uses a desktop three-panel editor that stacks on smaller screens. Test with your intended audience before production use.

The design references were the public Flatsome elements and theme demos. This project uses original layouts and artwork, and does not include Flatsome source, licensed assets, or WordPress theme/plugin compatibility.
