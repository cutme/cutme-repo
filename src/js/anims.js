import { gsap, elastic } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from 'lenis';

document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);
    
    window.gsap_parallax = () => {
        gsap.utils.toArray(".gs-parallax").forEach(function(section) {            
            gsap.to(".gs-parallax", {
                yPercent: 40,
                ease: "none",
                scrollTrigger: {
                    trigger: ".gs-parallax",
                    scrub: 0,
                    start: 'top top',
                }, 
            });
        });
    };

    window.anims = () => {
        gsap_parallax();
        
        ScrollTrigger.batch(".c-portfolio__box", {
            onEnter: elements => {
                gsap.from(elements, {
                    autoAlpha: 0,
                    x: 60,
                    stagger: 0.15,
                    ease: 'elastic.out(1, .8)',
                    duration: 2
                });
            },
        });


/*
  gsap.from(image, {
      scrollTrigger: {
        trigger: image,
        start: '-50px bottom',
        toggleActions: "play reverse complete reverse",
    },
    
        x: 40,
        autoAlpha: 0,
        ease: 'elastic.out(1, .8)',
        stagger: 0.1,
    })
*/
  
        const lenis = new Lenis();
        lenis.on('scroll', ScrollTrigger.update)
    
        gsap.ticker.add((time)=>{
            lenis.raf(time * 1000)
        })
        
        gsap.ticker.lagSmoothing(0);
              
        gsap.utils.toArray(".js-fadeInChildren > *:not(.c-logo)").forEach(function(section) {
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
            textWrapper1.innerHTML = textWrapper1.textContent.replace(/\S/g, "<span class='char'>$&</span>");
            
            const textWrapper2 = document.querySelector('.c-welcome .char2');
            textWrapper2.innerHTML = textWrapper2.textContent.replace(/\S/g, "<span class='char'>$&</span>");
          
            textWrapper1.style.visibility = 'visible';
            textWrapper2.style.visibility = 'visible';
            
            let chars1 = textWrapper1.querySelectorAll('.char')
            let chars2 = textWrapper2.querySelectorAll('.char')
        
            let tl = gsap.timeline();
            
            const cfrom = {
                y: -40,
                scaleY: -1,
                opacity: 0,
            }
            
            const cto = {
                y: 0,
                opacity: 1,
                stagger: 0.02,
                duration: 1,
                scaleY: 1,
                ease: 'elastic.out(1, .8)',
            }
            
            tl
            .fromTo(
                chars1, cfrom, cto, 
            )
            
            .fromTo(
                chars2, cfrom, cto, '-=1'
            )
            
            .from(document.querySelector(".c-welcome h2"), {
                duration: 1.6,
                y: 40,
                autoAlpha: 0,
                ease: 'elastic.out(1, .8)',
            }, '-=2.2')
            
            .from(document.querySelector(".c-welcome__skills"), {
                duration: 1.6,
                y: 40,
                autoAlpha: 0,
                ease: 'elastic.out(1, .8)',
            }, '-=2.2')
            
            .from(document.querySelectorAll(".c-welcome__skills span"), {
                duration: 1.2,
                x: 40,
                autoAlpha: 0,
                ease: 'elastic.out(1, .8)',
                stagger: 0.1,
            }, '-=2.4')

            .from(document.querySelector(".c-welcome .c-logo"), {
                duration: 1.5,
                autoAlpha: 0,
                ease: 'elastic.out(1, .8)',
            }, '-=1')
            
            .from(document.querySelector(".c-welcome .o-more"), {
                duration: 1.6,
                y: 40,
                autoAlpha: 0,
                ease: 'elastic.out(1, .8)',
            }, '-=1')
            
            .from(document.querySelector(".c-welcome video"), {
                duration: 3,
                autoAlpha: 0,
            })

        }
    };

}, false)
