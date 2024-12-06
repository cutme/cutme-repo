
(function(window, cutme) {

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

}(window, window.cutme = window.cutme || {}));