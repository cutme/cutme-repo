import { gsap, Power2 } from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";

document.addEventListener('DOMContentLoaded', () => {

  gsap.registerPlugin(ScrollToPlugin);

  /**
   * Scrolluje do elementu lub na górę strony.
   *
   * Zamiast przekazywać element bezpośrednio do GSAP ScrollToPlugin
   * (który oblicza offsetTop raz na starcie i może dostać błędną wartość,
   * gdy layout zmienia się po wyrenderowaniu Vue / lazy-loaded contentu),
   * obliczamy aktualną pozycję przez getBoundingClientRect() w momencie
   * wywołania — to gwarantuje poprawną wartość niezależnie od stanu layoutu.
   */
  window.runScroll = function (el, o = 0, speed = 1) {

    if (el === "body") {
      gsap.to(window, { duration: +speed || 1, scrollTo: 0, ease: Power2.easeOut });
      return;
    }

    const targetEl = document.querySelector(el);
    if (!targetEl) return;

    const offset = +o || 0;
    const rect = targetEl.getBoundingClientRect();
    const targetY = window.scrollY + rect.top - offset;

    gsap.to(window, {
      duration: +speed || 1,
      scrollTo: { y: targetY },
      ease: Power2.easeOut,
      onComplete: () => {
        const rect = targetEl.getBoundingClientRect();
        const finalY = window.scrollY + rect.top - offset;

        gsap.to(window, {
          duration: 0.3,
          scrollTo: finalY
        });
      }
    });
  };

  const gtt = document.querySelectorAll("[data-target]");

  if (gtt.length > 0) {

    const action = function (e) {
      e.preventDefault();

      const target = e.currentTarget.dataset.target;
      const offset = e.currentTarget.dataset.offset;
      const speed = e.currentTarget.dataset.speed;

      if (target === "body") {
        window.runScroll("body", offset, speed);
        return;
      }

      if (document.querySelector(target)) {
        window.runScroll(target, offset, speed);
      } else {
        window.open(window.location.origin + target, '_self');
      }
    };

    gtt.forEach(el => el.addEventListener('click', action));
  }

}, false);