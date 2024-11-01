import { gsap } from "gsap";
import { ScrollToPlugin, Power4 } from "gsap/all";
gsap.registerPlugin(ScrollToPlugin);


document.addEventListener('DOMContentLoaded', ()=> {
    
    window.runScroll = function(src, off) {
        
        let target = document.querySelector(src),
            offset = 0;
            
        if (off != undefined) {
            offset = off;
        } 

        gsap.to(window, { 
            duration: .5, 
            scrollTo: { 
                y: src, 
            }, 
            ease: Power4.easeOut,
            onComplete: function() {
                if (src === '#contact') {
                    gsap.to(document.querySelector('#double'), {
                        xPercent: -50,
                        ease: Power4.easeOut,
                        duration: 1
                    });
                }
            }
        });
    };

    const gtt = document.querySelectorAll("[data-target]");
//    const privacyindex = document.getElementsByClassName('js-privacyindex')[0];

    if (gtt.length > 0) {
        const action = function(e) {
        	e.preventDefault() ? e.preventDefault() : e.preventDefault = false;  
            let target = e.currentTarget.dataset.target,
                offset = e.currentTarget.dataset.offset;            

            document.getElementById(target.slice(1, target.length)) ? window.runScroll(target, offset) :
                window.open(window.location.origin + target, '_self');

        };

        for (let i = 0; i < gtt.length; i++) {
            gtt[i].addEventListener('click', action);
        }
    }
    
}, false);
