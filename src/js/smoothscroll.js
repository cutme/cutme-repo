import { gsap, Power1 } from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";

document.addEventListener('DOMContentLoaded', ()=> {
    gsap.registerPlugin(ScrollToPlugin)
    window.runScroll = function(el, o, speed) {
        let offsetTop = document.querySelector(el).offsetTop;
        o === undefined ? o = 0 : false;
        speed === undefined ? speed = 1 : false;
        gsap.to(window, { duration: speed, scrollTo: el, ease: Power1.easeInOut });
    };

    const gtt = document.querySelectorAll("[data-target]");
    if (gtt.length > 0) {
        const action = function(e) {
        	e.preventDefault() ? e.preventDefault() : e.preventDefault = false;  
            let target = e.currentTarget.dataset.target,
                offset = e.currentTarget.dataset.offset,
                speed = e.currentTarget.dataset.speed;            
            document.getElementById(target.slice(1, target.length)) ? window.runScroll(target, offset, speed) :
                window.open(window.location.origin + target, '_self');
        };

        for (let i = 0; i < gtt.length; i++) {
            gtt[i].addEventListener('click', action);
        }
    }
}, false);
