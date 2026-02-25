document.addEventListener('DOMContentLoaded', () => {
  function fixWidowsInText(text) {
    const pattern = /\b([aiouwzAIUOWZ])\s+/g;
    return text.replace(pattern, '$1\u00A0');
  }

  function walkAndFix(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      node.textContent = fixWidowsInText(node.textContent);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'CODE', 'PRE'].includes(node.tagName)) return;
      for (const child of node.childNodes) {
        walkAndFix(child);
      }
    }
  }

  function applyNoWidows(selector = '.js-nowidows') {
    document.querySelectorAll(selector).forEach(el => walkAndFix(el));
  }

  applyNoWidows();
});
