document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // 1. FAST SCROLL (jump)
  // =========================
  function jumpTo(y) {
    window.scrollTo(0, y);
  }

  // =========================
  // 2. SMOOTH FINISH SCROLL
  // =========================
  function smoothScrollTo(y, duration = 350) {
    const start = window.scrollY;
    const diff = y - start;
    let startTime = null;

    const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

    function step(timestamp) {
      if (!startTime) startTime = timestamp;

      const time = timestamp - startTime;
      const progress = Math.min(time / duration, 1);
      const eased = easeOutCubic(progress);

      window.scrollTo(0, start + diff * eased);

      if (time < duration) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  // =========================
  // RUN SCROLL (2-step UX)
  // =========================
  window.runScroll = function (selector, offset = 0) {

    const targetEl = document.querySelector(selector);
    if (!targetEl) return;

    // const topbar = document.querySelector('#topbar');
    // const topbarHeight = topbar ? topbar.offsetHeight : 0;

    const targetTop = targetEl.getBoundingClientRect().top + window.scrollY;

    const finalPosition = targetTop - offset;
    // const finalPosition = targetTop - topbarHeight - offset;

    const current = window.scrollY;

    // jeśli już jesteś na miejscu → nie rób nic
    if (Math.abs(current - finalPosition) < 10) return;

    const jumpPosition = finalPosition - 120;

    window.scrollTo(0, jumpPosition);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        smoothScrollTo(finalPosition, 450);
      });
    });
  };

  // =========================
  // CLICK HANDLER
  // =========================
  const gtt = document.querySelectorAll("[data-target]");

  if (gtt.length) {
    const action = function (e) {
      e.preventDefault();

      const target = e.currentTarget.dataset.target;
      const href = e.currentTarget.getAttribute("href");
      const offset = parseInt(e.currentTarget.dataset.offset || 0, 10);

      // 1. data-target ma pierwszeństwo
      if (target) {
        const exists = document.querySelector(target);

        if (exists) {
          window.runScroll(target, offset);
        }

        return;
      }

      // 2. fallback do href="#..."
      if (href && href.startsWith("#")) {
        const exists = document.querySelector(href);

        if (exists) {
          window.runScroll(href, offset);
        }

        return;
      }

      // 3. zwykła nawigacja
      if (href) {
        window.location.href = href;
      }
    };

    gtt.forEach(el => el.addEventListener("click", action));
  }

  // =========================
  // OBSŁUGA KOTWICY PRZY WEJŚCIU NA STRONĘ
  // np. obszary.html#area
  // =========================
  if (window.__pendingHash) {
    const hash = window.__pendingHash;

    window.addEventListener("load", function () {
      setTimeout(() => {
        window.runScroll(hash, 0);

        // przywrócenie hasha bez ponownego scrolla
        history.replaceState(null, "", hash);
      }, 50);
    });
  }

});