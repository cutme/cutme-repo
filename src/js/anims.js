import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from 'lenis';

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  window.gsap_parallax = () => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 641px)", () => {
      gsap.utils.toArray(".gs-parallax").forEach(function (section) {
        gsap.to(".gs-parallax", {
          yPercent: 40,
          opacity: .1,
          ease: "none",
          scrollTrigger: {
            trigger: ".gs-parallax",
            scrub: 0,
            start: 'top top',
          },
        });
      });
    })
  };

  window.anims = () => {
    gsap_parallax();

    // Portfolio animacje są teraz zarządzane przez Vue mini-app (src/vue-portfolio/)

    // const lenis = new Lenis();
    // lenis.on('scroll', ScrollTrigger.update)


//     const portfolio = document.querySelector('#portfolio');
//     const button = document.querySelector('.contact-button');
//     const rect = portfolio.getBoundingClientRect();
    
// if (rect.top <= 0) {
//         button.classList.remove('opacity-0', 'pointer-events-none');
//         button.classList.add('opacity-100', 'pointer-events-auto');
//       } else {
//         button.classList.remove('opacity-100', 'pointer-events-auto');
//         button.classList.add('opacity-0', 'pointer-events-none');
//       }

    // lenis.on('scroll', () => {
    //   //ScrollTrigger.update();
    //   const rect = portfolio.getBoundingClientRect();
      

    //   if (rect.top <= 0) {
    //     button.classList.remove('opacity-0', 'pointer-events-none');
    //     button.classList.add('opacity-100', 'pointer-events-auto');
    //   } else {
    //     button.classList.remove('opacity-100', 'pointer-events-auto');
    //     button.classList.add('opacity-0', 'pointer-events-none');
    //   }
    // });

    // gsap.ticker.add((time) => {
    //   lenis.raf(time * 1000)
    // })

    gsap.ticker.lagSmoothing(0);

    gsap.utils.toArray(".js-fadeInChildren > *:not(.c-logo)").forEach(function (section) {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: '-50px bottom',
          toggleActions: "play complete complete reset",
        },
        opacity: 0,
        duration: 1,
        y: 50
      });
    });



    if (document.querySelector('.c-welcome')) {
      const textWrapper1 = document.querySelector('.c-welcome .char1');
      const textWrapper2 = document.querySelector('.c-welcome .char2');
      const originalText1 = textWrapper1.textContent; // Zapisanie oryginalnego tekstu
      const originalText2 = textWrapper2.textContent; // Zapisanie oryginalnego tekstu
      const tl = gsap.timeline();
      let starttime = '-=2';

      let mediaQuery = '(min-width: 768px)',
        mediaQueryList = window.matchMedia(mediaQuery);

      function applyEffects() {
        document.querySelector(".c-welcome h1").classList.remove("opacity-0");

        if (mediaQueryList.matches) {
          // Efekt pojawiania się liter dla dużych ekranów
          if (!textWrapper1.querySelector('.char')) {
            textWrapper1.innerHTML = originalText1.replace(/\S/g, "<span class='char'>$&</span>");
            textWrapper2.innerHTML = originalText2.replace(/\S/g, "<span class='char'>$&</span>");
          }

          let chars1 = textWrapper1.querySelectorAll('.char'),
            chars2 = textWrapper2.querySelectorAll('.char');

          const cfrom = {
            y: -40,
            scaleY: -1,
            opacity: 0,
          };

          const cto = {
            y: 0,
            opacity: 1,
            stagger: 0.01,
            duration: 1,
            scaleY: 1,
            ease: 'elastic.out(1, .8)',
          };

          tl.fromTo(chars1, cfrom, cto)
            .fromTo(chars2, cfrom, cto, '-=1');
        } else {
          // Przywrócenie oryginalnego tekstu dla małych ekranów
          if (textWrapper1.querySelector('.char')) {
            textWrapper1.innerHTML = originalText1;
            textWrapper2.innerHTML = originalText2;
          }

          starttime = '0';

          tl.from(document.querySelector(".c-welcome h1"), {
            duration: 1.6,
            y: 40,
            opacity: 0,
            ease: 'elastic.out(1, .8)',
          }, starttime);


        }
      }

      // Wywołanie efektów przy załadowaniu strony
      applyEffects();

      mediaQueryList.addEventListener('change', event => {
        event.matches ? applyEffects : false;
      })


      // Pozostałe animacje (dla wszystkich rozdzielczości)
      document.querySelector(".c-welcome h2").style.visibility = 'visible';
      document.querySelector(".c-welcome .gsap-three").style.visibility = 'visible';
      document.querySelector(".c-welcome__skills").style.visibility = 'visible';
      document.querySelector(".c-welcome .o-more").classList.remove("opacity-0");
      document.querySelector(".c-welcome .nav").classList.remove("opacity-0");
      document.querySelector(".c-welcome .logo").style.visibility = 'visible';

      document.querySelector(".c-welcome .arrow-skills").style.visibility = 'visible';
      document.querySelector(".c-welcome .arrow-portfolio").style.visibility = 'visible';



      tl.from(document.querySelector(".c-welcome h2"), {
        duration: 1.6,
        y: 40,
        autoAlpha: 0,
        ease: 'elastic.out(1, .8)',
      }, starttime)
        .from(document.querySelector(".c-welcome .logo"), {
          duration: 1.5,
          autoAlpha: 0,
          ease: 'elastic.out(1, .8)',
        }, '-=1')
        .from(document.querySelector(".gsap-three"), {
          duration: 1.6,
          y: 40,
          autoAlpha: 0,
          ease: 'elastic.out(1, .8)',
        }, '-=1')

        .from(document.querySelectorAll(".c-welcome__skills span"), {
          duration: 1.2,
          x: 40,
          autoAlpha: 0,
          ease: 'elastic.out(1, .8)',
          stagger: 0.1,
        }, '-=2')

        .from(document.querySelector(".c-welcome .o-more"), {
          duration: 1.6,
          y: 40,
          autoAlpha: 0,
          ease: 'elastic.out(1, .8)',
        }, '-=1.8')
        .from(document.querySelector(".c-welcome .arrow-skills"), {
          duration: 1.6,
          x: 40,
          autoAlpha: 0,
          ease: 'elastic.out(1, .8)',
        }, '-=1.4')
        .from(document.querySelector(".c-welcome .arrow-portfolio"), {
          duration: 1.6,
          y: -100,
          autoAlpha: 0,
          ease: 'elastic.out(1, .8)',
        }, '-=1.2')
        .from(document.querySelector(".c-welcome .nav"), {
          duration: 1.6,
          autoAlpha: 0,
          ease: 'elastic.out(1, .8)',
        }, '-=2');
    }


  };

}, false)
