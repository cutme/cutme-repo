import { TweenLite, Power1 } from "gsap";

import ScrollToPlugin from 'gsap/ScrollToPlugin';


(function() {

    'use strict';

	var scrollTo = function (target, speed) {
		var offset = 0;

		TweenLite.to(window, speed, {
			scrollTo: {
				y: target + offset,
				autoKill: false
			},
			ease: Power1.easeOut
		});
	};

	var speed_calculate = function (target) {
    	var base_speed  = 50,
    		page_offset = window.pageYOffset || document.documentElement.scrollTop,
        	offset_diff = Math.abs(target - page_offset),
        	speed = ((offset_diff * base_speed) / 1000)/100;

    	return speed;
	};

	var clickAction = function (e) {
	    var that = e.currentTarget,
	        src = that.getAttribute('href'),
	        window_pos = window.pageYOffset || window.scrollY;
	        
        cutme.Helper.closeNav();
	    
	    // If mobile menu opened
	    if ( navtrigger.getAttribute('visible') === 'true' ) {
	        navtrigger.setAttribute('visible', false);
	        
            nav.classList.remove('is-visible');
	        navtrigger.classList.add('icon-menu');
	        navtrigger.classList.remove('icon-close');

	        document.getElementsByTagName('body')[0].classList.remove('no-overflow');
	    }

	    var obj = document.getElementById( src.slice(1, src.length) );

	    if (obj) {
	        var target = window_pos + obj.getBoundingClientRect().top;
	        scrollTo(target, speed_calculate(target));
	    }
	    
	    e.preventDefault() ? e.preventDefault() : e.preventDefault = false; 
	};


	var btn = document.getElementsByClassName('js-goto');

    if (btn.length>0) {
    
    	for (var i = 0; i < btn.length; i++) {
            btn[i].addEventListener('click', clickAction, false);
        }
    }

/*
	    if (t) {
			var obj = document.getElementById(t.slice(1, t.length)),
			    window_pos = window.pageYOffset || window.scrollY;

			var target = window_pos + obj.getBoundingClientRect().top;
            scrollTo(target, speed_calculate(target));
		}
*/


}).call(this);