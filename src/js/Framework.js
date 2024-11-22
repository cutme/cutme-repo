
(function(window, cutme) {

// Rwd logo

(function() {
	var body = document.documentElement,
		action = function() {			
			if ((window.pageYOffset || window.scrollY) === 0) {
				body.classList.remove('narrow-logo');
				status = false;
			} else {
    			body.classList.add('narrow-logo');
			}
	};
	
	window.addEventListener('scroll', action);

}).call(this);


// Full Height

(function() {
	var fullHeight = document.getElementsByClassName('js-fullHeight'),
	    action = function() {
    		var windowHeight = window.innerHeight + 'px';
    
    		if (fullHeight) {
    			for (var i = 0; i < fullHeight.length; i++) {
    				fullHeight[i].style.minHeight = windowHeight;
    			}
    		}
    	};
	
	action();
	
	window.addEventListener( 'resize', action );
	
}).call(this);


// Show on scroll
/*

(function() {
    const isInView = function(el) {
		var bottomOfWindow = (window.pageYOffset || window.scrollY) + window.innerHeight;
		
		if ( el.getBoundingClientRect().top + (window.pageYOffset || window.scrollY) < bottomOfWindow ) {
			return true;
		}
	};	

	var el = document.getElementsByClassName('anim');
	
	for (var i = 0; i < el.length; i++) {
		if (isInView(el[i])) {
			el[i].className += ' anim--loaded';
		}
	}
	
	function init() {			
		for (var i = 0; i < el.length; i++) {
			if ( el[i].getAttribute('visible') === null ) {
				var bottomOfObject = el[i].getBoundingClientRect().top + (window.pageYOffset || window.scrollY) + 100,
					bottomOfWindow = (window.pageYOffset || window.scrollY) + window.innerHeight;
				if( bottomOfWindow > bottomOfObject ) {
					el[i].className += ' anim--loaded';
					el[i].setAttribute('visible', true);
				}
			}
		}
	}
	window.addEventListener('scroll', init);
}).call(this);
*/


}(window, window.cutme = window.cutme || {}));