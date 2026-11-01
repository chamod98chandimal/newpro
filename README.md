# Folio

An early, open-source visual website builder. Edit a public static website in your browser, keep a portable project backup, and export standalone HTML. No account or backend is needed for this first version.

## Develop

Requires Node.js 22.12+ or Node.js 24 LTS and npm.

```sh
npm ci
npm run dev
```

Open the address printed by Vite. `npm run build` produces `dist/`; `npm run preview` serves that production build. The relative asset base supports GitHub Pages project paths.

## What works

- Three starter templates with original CSS illustrations; no external fonts or images.
- Multiple pages; editable hero, text, and feature-card sections; section ordering and removal.
- Site name, SEO description, accent/background colors, and desktop/mobile previews.
- Browser-local draft persistence and validated JSON project import/export.
- Self-contained HTML page export, with escaped content and restricted link schemes.

Select a section in the left panel to edit it on the right. Preview links are intentionally inert inside the sandbox; links work in exported files. Feature cards use one `title|description` per line.

Drafts belong to the current browser and origin, not a GitHub account. Clearing browser data can remove them; private mode or storage restrictions may prevent saving. Use **Export project** for backups. Importing a project or applying a template asks before replacing content.

For a multi-page site, export each page into the same directory. The first page exports as `index.html`; other filenames use stable page IDs. Upload all exported pages together so their navigation links resolve. Exported pages work without the editor or JavaScript.

## Hosting the builder

Build with `npm ci && npm run build`, then upload `dist/` to any static host. To use the included manual GitHub Pages workflow:

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

Browser tests use `/usr/bin/chromium` in this cloud environment. On another machine, set `CHROMIUM_PATH` to your installed Chromium/Chrome executable. Browser tests exercise editing, reload persistence, page creation, template selection, responsive preview controls, and exports.

## Deliberate MVP limits

This is a prototype, not a WordPress-compatible CMS or cPanel replacement. GitHub OAuth, repository writes, deployment management, real owner/member logins, custom-domain provisioning, media uploads, forms, blogging collections, undo history, and collaboration are not implemented. There is no pretend login or publishing button. GitHub integration is labelled as coming later.

Never put GitHub client secrets, shared access tokens, or DNS credentials into this browser app. Secure account connection and domain provisioning need a separately designed backend. GitHub Pages cannot execute PHP or a database backend; provider usage rules and quotas apply.

Project imports are capped at 2 MB, 30 pages, and 100 sections per page. This prototype uses a desktop three-panel editor that stacks on smaller screens. Test with your intended audience before production use.
