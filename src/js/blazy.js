import Blazy from 'blazy';

document.addEventListener('DOMContentLoaded', ()=> {
     
    const bLazy = new Blazy({            
    	success: function(element) {
        	
        	console.log('loaded');
        	
    	    setTimeout(function(){					
    			var parent = element.parentNode,
    				grandpa = element.parentNode.parentNode;
    
    			parent.className += ' is-loaded';
    			grandpa.className += ' is-loaded';
    	    }, 200);
        }
    });

}, false);
