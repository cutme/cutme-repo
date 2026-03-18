// directives/nowidows.js
function fixWidowsInText(text) {
  const pattern = /\b([aiouwzAIUOWZ])\s+/g;
  return text.replace(pattern, '$1\u00A0');
}

function walkAndFix(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    node.textContent = fixWidowsInText(node.textContent);
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'CODE', 'PRE'].includes(node.tagName)) return;
    node.childNodes.forEach(child => walkAndFix(child));
  }
}

export default {
  mounted(el) {
    walkAndFix(el);
  },
  updated(el) {
    walkAndFix(el);
  }
};