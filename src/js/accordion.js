document.querySelectorAll('[data-accordion-button]').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('[data-accordion-item]');
    const content = item.querySelector('[data-accordion-content]');

    const isOpen = item.classList.contains('is-open');

    document.querySelectorAll('[data-accordion-item]').forEach((el) => {
      el.classList.remove('is-open');
      el.querySelector('[data-accordion-content]').style.maxHeight = '0px';
    });

    if (!isOpen) {
      item.classList.add('is-open');
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  });
});