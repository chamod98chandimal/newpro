import { mountEditor } from './editor.js';
import { mountPortal } from './portal.js';
import { mountShowcase } from './showcase.js';
import './portal.css';
import './showcase.css';

const root = document.querySelector('#app');
root.innerHTML = '<div id="portal-app" class="portal"></div><div id="editor-app" hidden></div><div id="showcase-app" hidden></div>';
const editor = mountEditor(document.querySelector('#editor-app'));
const openBuilder = () => { location.hash = '/builder'; };
const portal = mountPortal(document.querySelector('#portal-app'), {
  getSite: editor.getSite,
  onEditSite: openBuilder,
  onSaveSettings: editor.saveSettings,
  onExportProject: editor.exportProject,
  onApplyTheme: key => { if (editor.applyTheme(key)) openBuilder(); },
});
const showcase = mountShowcase(document.querySelector('#showcase-app'), {
  onInsert: type => { editor.addElement(type); openBuilder(); },
});
function renderRoute() {
  const route = location.hash.replace(/^#\/?/, '').split('?')[0];
  const builder = route === 'builder', elements = route === 'elements';
  document.querySelector('#editor-app').hidden = !builder;
  document.querySelector('#showcase-app').hidden = !elements;
  document.querySelector('#portal-app').hidden = builder || elements;
  document.body.dataset.view = builder ? 'builder' : elements ? 'elements' : 'portal';
  document.title = `${builder ? 'Website Builder' : elements ? 'Elements' : route === 'dashboard' ? 'Site Dashboard' : 'Build something remarkable'} — Folio`;
  if (elements) showcase.render();
  else if (!builder) portal.render(route === 'dashboard' ? 'dashboard' : 'home');
  window.scrollTo({ top: 0, behavior: 'instant' });
}
window.addEventListener('hashchange', renderRoute);
renderRoute();
