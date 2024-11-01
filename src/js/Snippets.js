
export function darker() {

    const el = document.getElementsByClassName('js-fadeOut');
    let bottomOfWindow = (window.pageYOffset || window.scrollY) + window.innerHeight;
    
	for (var i = 0; i < el.length; i++) {
    	var div = document.createElement('div');
		
		div.className += ' o-overlay';
		div.className += ' js-overlay';

		el[i].appendChild(div);
    }	    

	const action = function() {
			
		for (var j = 0; j < el.length; j++) {
		
			let topPosition = el[j].getBoundingClientRect().top,
				scrollPercent = topPosition / el[j].offsetHeight,
				value = scrollPercent * -1;
				
			if ( window.innerHeight < 640 ) {
				value = 0;
			}
			
			// If on viewport, add style to overlay
			if ( topPosition * -1 < window.innerHeight ) {
				el[j].getElementsByClassName('js-overlay')[0].style.opacity = value;
				
				// If button exist in section
				var btn = el[j].getElementsByClassName('js-btn')[0];
				
				if ( btn ) {
					btn.style.opacity = (1 - value);
				}
			}
		}			
	};

	window.addEventListener('scroll', action);
};


/* Full screen tooltip */

export function tooltip() {

    // Generate main code

    const div = document.createElement('div');
		
		div.className += 'c-tooltip';
		div.id += 'tooltip';
		div.innerHTML = '<div class="c-tooltip__content" id="tooltipContent"></div>';

        document.getElementsByTagName('body')[0].appendChild(div);


	const el = document.getElementsByClassName('js-tooltip'),
      	  tooltip = document.getElementById('tooltip'),
      	  tooltipContent = document.getElementById('tooltipContent'),
      	  page = document.getElementsByTagName('html')[0];
      	  
    let status;


    // Show tooltip

	const show = function(e) {
        if (page.classList.contains('desktop')) {
    	    status = setTimeout(function() {
        	    tooltip.classList.add('is-visible');
        	    
        	    let content = e.target.getAttribute('data-text');
    
        	    tooltipContent.innerHTML = content;
        	    
        	    setTimeout(function() {
            	    tooltip.addEventListener('mousemove', hide);    
        	    }, 500);
    
                document.body.style.cursor = 'none';
    	    }, 500);
        }
	}
	
	// Hide tooltip

	const hide = function(e) {
	    if (page.classList.contains('desktop')) {
            tooltip.classList.remove('is-visible');
            tooltip.removeEventListener('mousemove', hide);   
            document.body.style.cursor = 'auto';  
        }
    	//e.returnValue = false; 
	}

    for (let i = 0; i < el.length; i ++) {
    
        el[i].addEventListener('mouseover', show);
        
        el[i].addEventListener('mouseout', function() {
    	    clearTimeout(status);
    	});
    }
}


export function typing() {
    var TxtRotate = function(el, toRotate, period) {
      this.toRotate = toRotate;
      this.el = el;
      this.loopNum = 0;
      this.period = parseInt(period, 10) || 2000;
      this.txt = '';
      this.tick();
      this.isDeleting = false;
    };
    
    TxtRotate.prototype.tick = function() {
      var i = this.loopNum % this.toRotate.length;
      var fullTxt = this.toRotate[i];
    
      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }
    
      this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
    
      var that = this;
      var delta = 100 - Math.random() * 100;
    
      if (this.isDeleting) { delta /= 2; }
    
      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
      }
    
      setTimeout(function() {
        that.tick();
      }, delta);
    };

    window.onload = function() {
        setTimeout(function() {

            var elements = document.getElementsByClassName('txt-rotate');
            for (var i=0; i<elements.length; i++) {
                var toRotate = elements[i].getAttribute('data-rotate');
                var period = elements[i].getAttribute('data-period');

                if (toRotate) {
                    new TxtRotate(elements[i], JSON.parse(toRotate), period);
                }
            }
    
        }, 2000);

    // INJECT CSS
    var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
        document.body.appendChild(css);
    };
}
