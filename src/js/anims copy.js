import { gsap, Power1 } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

document.addEventListener('DOMContentLoaded',function() {
    gsap.registerPlugin(ScrollTrigger);
    
    window.anims = function() {
        
        if (document.getElementsByClassName('js-fadeInChildren').length > 0) {
            gsap.utils.toArray(".js-fadeInChildren > *").forEach(function(section) {
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
        }
    };

}, false)
