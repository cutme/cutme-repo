import { gsap, Power1 } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

document.addEventListener('DOMContentLoaded',function() {
    gsap.registerPlugin(ScrollTrigger);
    
    window.anims = function() {
        
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
        
        const doubl = document.querySelector('#double');
        if (doubl) {
            ScrollTrigger.matchMedia({
                "(min-width: 1025px)": ()=> {
                    gsap.to(doubl, {
                        xPercent: -50,
                        ease: "none",
                        scrollTrigger: {
                            trigger: doubl,
                            pin: true,
                            scrub: 1,
                            start: 'top top',
                            end: `${doubl.offsetWidth/4}`,
                            pinSpacing: 1,
                            snap: 1
                        }
                    });
                }
            })   
        }
        
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
                stagger: 0.05,
                duration: 1.2,
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
            
            .from(document.querySelector('.c-welcome h2'), {
                duration: 2.5,
                x: 40,
                autoAlpha: 0,
                ease: 'elastic.out(1, .8)',
            }, '-=2')
            
            .from(document.querySelector(".c-welcome .c-welcome__skills"), {
                duration: 1.6,
                y: 40,
                autoAlpha: 0,
                ease: 'elastic.out(1, .8)',
            }, '-=2.2')
            
            .from(document.querySelectorAll(".c-welcome .c-welcome__skills strong"), {
                duration: 1.2,
                x: 40,
                autoAlpha: 0,
                ease: 'elastic.out(1, .8)',
                stagger: 0.1,
            }, '-=2.4')
            
            .from(document.querySelector(".c-welcome .c-welcome__cube"), {
                duration: 1.6,
                y: -40,
                autoAlpha: 0,
                ease: 'elastic.out(1, .8)',
            }, '-=2')

            .from(document.querySelector(".c-welcome .c-logo"), {
                duration: 1.5,
                autoAlpha: 0,
                ease: 'elastic.out(1, .8)',
            }, '-=2')
        }
    };

}, false)
