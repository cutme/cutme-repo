document.addEventListener('DOMContentLoaded', () => {
  window.anims();

  // const init = () => {
  //   //document.documentElement.removeAttribute('style');
  //   document.documentElement.classList.add('is-loaded');

  // };

  // window.addEventListener('load', init);

  //document.getElementById('cover').remove();
  (function () {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://code.tidio.co/mlayqazkjkapvwreklbcmiuxkhgpvrfk.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();

  
}, false);



document.addEventListener("DOMContentLoaded", () => {
  const el = document.querySelector("#darmowa-wycena");
  const contact = document.querySelector("#contact");

  let isVisible = false;

  const updateVisibility = () => {
    const scrollY = window.scrollY;

    // 1. warunek TOP: ukryj gdy < 100px od góry
    if (scrollY < 100) {
      hide();
      return;
    }

    // 2. warunek CONTACT: jeśli w viewport → ukryj
    if (isContactVisible()) {
      hide();
      return;
    }

    // 3. w przeciwnym razie pokaż
    show();
  };

  const show = () => {
    if (isVisible) return;
    el.classList.add("is-visible");
    el.classList.remove("is-hidden");
    isVisible = true;
  };

  const hide = () => {
    if (!isVisible) return;
    el.classList.remove("is-visible");
    el.classList.add("is-hidden");
    isVisible = false;
  };

  const isContactVisible = () => {
    if (!contact) return false;
    const rect = contact.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  };

  window.addEventListener("scroll", updateVisibility, { passive: true });
  updateVisibility();
});