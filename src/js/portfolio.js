import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

document.addEventListener("DOMContentLoaded", () => {

  const items = document.querySelectorAll(".js-portfolio-item");

  function scrollToItem(item, offset = 0) {
    if (!item) return;
    const rect = item.getBoundingClientRect();
    const top = rect.top + window.scrollY - offset;
    gsap.to(window, { scrollTo: top, duration: 0.6, ease: "power3.inOut" });
  }

  function openItem(item) {
    if (!item || item.classList.contains("is-active")) return;

    // 1️⃣ Zamykamy inne aktywne elementy zanim otworzymy nowy
    items.forEach(el => {
      if (el !== item && el.classList.contains("is-active")) {
        closeItem(el); // animacja zamknięcia
      }
    });

    // 2️⃣ Zapamiętujemy scroll przed otwarciem
    item.dataset.scrollBeforeOpen = window.scrollY;

    const media = item.querySelector(".c-portfolio__item");
    const longContent = item.querySelectorAll(".long-description > *");
    const skills = item.querySelectorAll(".skills .skill");

    // media początkowo niewidoczne
    gsap.set(media, { autoAlpha: 0, scale: 0.95, y: 40 });

    const computed = window.getComputedStyle(item);
    const startPaddingTop = computed.paddingTop;
    const startPaddingBottom = computed.paddingBottom;

    item.classList.add("is-active");

    scrollToItem(item, 0);

    const tl = gsap.timeline();

    // 1️⃣ Płynny padding
    tl.fromTo(item,
      { paddingTop: startPaddingTop, paddingBottom: startPaddingBottom },
      { paddingTop: "96px", paddingBottom: "96px", duration: 0.6, ease: "power3.inOut" },
      0
    );

    // 2️⃣ Media pojawia się efektownie po rozciągnięciu kontenera
    tl.to(media, { autoAlpha: 1, scale: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.2");

    // 3️⃣ Long description
    tl.fromTo(longContent,
      { y: 40, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.9, ease: "power2.out", stagger: 0.08 },
      "-=0.3"
    );

    // 4️⃣ Skills jako ostatnie
    tl.from(skills, { x: 40, autoAlpha: 0, duration: 0.8, ease: "power2.out", stagger: 0.1 }, "+=0.2");
  }

  function closeItem(item, instant = false) {
    if (!item) return;

    const media = item.querySelector(".c-portfolio__item");
    const longContent = item.querySelectorAll(".long-description > *");
    const skills = item.querySelectorAll(".skills .skill");

    const scrollBeforeOpen = parseFloat(item.dataset.scrollBeforeOpen || 0);

    if (instant) {
      item.classList.remove("is-active");
      gsap.set([media, longContent, skills], { clearProps: "all" });
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        item.classList.remove("is-active");
        gsap.set([media, longContent, skills], { clearProps: "all" });

        // scroll powraca do poprzedniej pozycji
        gsap.to(window, { scrollTo: scrollBeforeOpen, duration: 0.5, ease: "power3.inOut" });
      }
    });

    // 1️⃣ znika tekst
    tl.to(longContent, { y: 20, autoAlpha: 0, duration: 0.3, ease: "power2.in" });

    // 2️⃣ znika skills
    tl.to(skills, { x: 20, autoAlpha: 0, duration: 0.3, stagger: 0.05, ease: "power2.in" }, "<");

    // 3️⃣ media znika
    tl.to(media, { scale: 0.95, y: 20, autoAlpha: 0, duration: 0.4, ease: "power2.in" });

    // 4️⃣ padding wraca
    tl.to(item, { paddingTop: "0px", paddingBottom: "0px", duration: 0.6, ease: "power3.inOut" }, "<");
  }

  document.addEventListener("click", (e) => {
    const readMore = e.target.closest(".js-portfolio-read-more");
    const closeBtn = e.target.closest(".js-portfolio-close");

    if (readMore) openItem(readMore.closest(".js-portfolio-item"));
    if (closeBtn) closeItem(closeBtn.closest(".js-portfolio-item"));
  });

});