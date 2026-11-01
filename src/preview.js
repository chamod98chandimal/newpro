// The preview has an opaque origin: scripts are allowed solely for this fixed bridge,
// while same-origin access, navigation, forms, and popups remain sandboxed.
export function createPreviewRenderer(frame, { onSelect = () => {} } = {}) {
  const channel = crypto.randomUUID();
  let ready = false;
  let initialized = false;
  let currentPageId;
  let latest;

  window.addEventListener('message', event => {
    if (event.source !== frame.contentWindow || event.data?.channel !== channel) return;
    if (event.data.type === 'ready') {
      ready = true;
      if (latest) frame.contentWindow.postMessage({ ...latest, channel, type: 'render' }, '*');
    }
    if (event.data.type === 'select' && typeof event.data.path === 'string' && /^\d+(\.\d+)*$/.test(event.data.path)) {
      onSelect(event.data.path);
    }
  });

  return {
    update(html, { pageId, selectedPath } = {}) {
      const resetScroll = currentPageId !== pageId;
      currentPageId = pageId;
      // Keep a pending page switch even if several input events arrive before ready.
      latest = { html, resetScroll: resetScroll || (!ready && latest?.resetScroll) || false, selectedPath };
      if (!initialized) {
        initialized = true;
        frame.setAttribute('sandbox', 'allow-scripts');
        const script = `(${previewBridge.toString()})(${JSON.stringify(channel)});`;
        frame.srcdoc = html.replace('</body>', `<script>${script}</script></body>`);
      } else if (ready) {
        frame.contentWindow.postMessage({ ...latest, channel, type: 'render' }, '*');
      }
    },
  };
}

function previewBridge(channel) {
  let selectedPath;
  const documentStyles = [...document.head.querySelectorAll('style')];
  const selectionStyle = document.createElement('style');
  selectionStyle.textContent = '[data-element-path]{cursor:pointer}.folio-selected{outline:2px solid #7b9c55;outline-offset:-2px}';
  document.head.appendChild(selectionStyle);

  // Preserve unchanged DOM nodes, especially loaded images. Replacing the entire
  // body would discard their intrinsic sizes and could shift the page after paint.
  let preserveInteractiveState = false;
  const keepStateAttribute = (node, name) => preserveInteractiveState && ((node.nodeName === 'DETAILS' && name === 'open') || (node.nodeName === 'INPUT' && name === 'checked'));
  const reconcileChildren = (current, next) => {
    let index = 0;
    for (const incoming of [...next.childNodes]) {
      const existing = current.childNodes[index];
      if (!existing) current.appendChild(document.importNode(incoming, true));
      else if (existing.nodeType !== incoming.nodeType || existing.nodeName !== incoming.nodeName) {
        existing.replaceWith(document.importNode(incoming, true));
      } else if (existing.nodeType === Node.ELEMENT_NODE) {
        for (const attribute of [...existing.attributes]) {
          if (keepStateAttribute(existing, attribute.name)) continue;
          if (!incoming.hasAttribute(attribute.name)) existing.removeAttribute(attribute.name);
        }
        for (const attribute of [...incoming.attributes]) {
          if (keepStateAttribute(existing, attribute.name)) continue;
          if (existing.getAttribute(attribute.name) !== attribute.value) existing.setAttribute(attribute.name, attribute.value);
        }
        if (!preserveInteractiveState && existing.nodeName === 'INPUT') existing.checked = incoming.checked;
        reconcileChildren(existing, incoming);
      } else if (existing.nodeValue !== incoming.nodeValue) existing.nodeValue = incoming.nodeValue;
      index += 1;
    }
    while (current.childNodes.length > index) current.lastChild.remove();
  };
  const markSelection = () => {
    document.querySelectorAll('[data-element-path]').forEach(element => {
      element.classList.toggle('folio-selected', element.getAttribute('data-element-path') === selectedPath);
    });
  };
  window.addEventListener('message', event => {
    if (event.source !== parent || event.data?.channel !== channel || event.data.type !== 'render' || typeof event.data.html !== 'string') return;
    const position = event.data.resetScroll ? { left: 0, top: 0 } : { left: window.scrollX, top: window.scrollY };
    const next = new DOMParser().parseFromString(event.data.html, 'text/html');
    const nextStyles = [...next.head.querySelectorAll('style')];
    nextStyles.forEach((style, index) => {
      if (!documentStyles[index]) {
        documentStyles[index] = document.createElement('style');
        document.head.insertBefore(documentStyles[index], selectionStyle);
      }
      if (documentStyles[index].textContent !== style.textContent) documentStyles[index].textContent = style.textContent;
    });
    while (documentStyles.length > nextStyles.length) documentStyles.pop().remove();
    for (const attribute of [...document.body.attributes]) {
      if (!next.body.hasAttribute(attribute.name)) document.body.removeAttribute(attribute.name);
    }
    for (const attribute of [...next.body.attributes]) {
      if (document.body.getAttribute(attribute.name) !== attribute.value) document.body.setAttribute(attribute.name, attribute.value);
    }
    preserveInteractiveState = !event.data.resetScroll;
    reconcileChildren(document.body, next.body);
    document.title = next.title;
    selectedPath = event.data.selectedPath;
    markSelection();
    window.scrollTo({ ...position, behavior: 'instant' });
  });
  document.addEventListener('click', event => {
    const interaction = event.target.closest('[data-preview-interaction]');
    if (interaction) {
      if (interaction.tagName === 'A' && interaction.getAttribute('href')?.startsWith('#')) {
        event.preventDefault();
        document.getElementById(interaction.getAttribute('href').slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      }
      return;
    }
    // Preview links never navigate away from the editor's isolated document.
    if (event.target.closest('a')) event.preventDefault();
    const element = event.target.closest('[data-element-path]');
    if (!element) return;
    selectedPath = element.getAttribute('data-element-path');
    markSelection();
    parent.postMessage({ channel, type: 'select', path: selectedPath }, '*');
  });
  parent.postMessage({ channel, type: 'ready' }, '*');
}
