import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

document.addEventListener('DOMContentLoaded', ()=> {
    window.runScroll = function(el, o) {
        let offsetTop = document.querySelector(el).offsetTop;
        o === undefined ? o = 0 : false;
        scroll({
            top: offsetTop - o,
            behavior: "smooth"
        })
    };

    const gtt = document.querySelectorAll("[data-target]");
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
