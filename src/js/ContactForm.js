import autosize from 'autosize';
import serialize from 'form-serialize';
import validate from 'validate.js';
import InView from 'inview';

(function() {
	'use strict';
	
	const contact = document.getElementById('contact'),
	      input = document.getElementById('input-0');

	let status = false;
		
	var Form = ctme.Form = function () { };

	Form.prototype.init = function() {

		var ta = document.getElementById('input-2');
			
			ta.addEventListener('focus', function() {
				autosize(ta);
			});


		var sendData = function() {
			
			var request = new XMLHttpRequest(),
				data = serialize(document.forms[0]),
				action = document.forms[0].getAttribute('action'),
				submita = document.getElementById('submita'),
				spinner = document.getElementById('spinner'),
				fields = document.getElementById('formFields'),
				thanks = document.getElementById('formThanks');

            spinner.classList.remove('is-hidden');

			request.open('POST', action, true);
			request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
			request.onload = function() {
				if (request.status >= 200 && request.status < 400) {
				
					var resp = request.responseText;

					if (resp === 'Mail sent') {
						fields.className += ' is-hidden';
						thanks.classList.remove('is-hidden');
						thanks.className += ' is-visible';
					} else {
						spinner.className += 'is-hidden';
						submita.classList.remove('is-hidden');						
					}
						
				} else {
				
					spinner.className += ' is-hidden';
					submita.classList.remove('is-hidden');
					console.log('Status: ' + request.status);
				
				}
			};
			
			request.onerror = function() {
				// There was a connection error of some sort
			};
			
			request.send(data);

		};

		var validatejs = function() {

			// These are the constraints used to validate the form
			var constraints = {
				email: {
					presence: true,
					email: true
				}
			};


			// Hook up the form so we can prevent it from being posted
			var form = document.getElementById('contactForm');

			form.addEventListener("submit", function(ev) {
				handleFormSubmit(form);
				ev.preventDefault() ? ev.preventDefault() : ev.preventDefault = false;
			});


			// Hook up the inputs to validate on the fly
			var inputs = document.querySelectorAll("input, textarea, select");

			for (var i = 0; i < inputs.length; ++i) {
				inputs.item(i).addEventListener("change", function(ev) {
					var errors = validate(form, constraints) || {};
					showErrorsForInput(this, errors[this.name]);
				});
			}
	

			function handleFormSubmit(form, input) {
			
				// validate the form aainst the constraints
				var errors = validate(form, constraints);
				// then we update the form to reflect the results

				showErrors(form, errors || {});

				if (!errors) {
					showSuccess();
				}
			}
	
			// Updates the inputs with the validation errors
			function showErrors(form, errors) {
				var arr = form.querySelectorAll("input[name]");
			
				for (var i = 0; i < arr.length; i ++ ) {
					var input = arr[i];
					showErrorsForInput(input, errors && errors[input.name]);
				}
			}


			// Shows the errors for a specific input
			function showErrorsForInput(input, errors) {
				
				// This is the root of the input
				var formGroup = closestParent(input.parentNode, "input"), 
					messages = formGroup.querySelector(".messages");
			
				// First we remove any old messages and resets the classes
				resetFormGroup(formGroup);
			
				// If we have errors
				if (errors) {
					// we first mark the group has having errors
					formGroup.classList.add("has-error");
					
					
					
					// then we append all the errors
					/*
					_.each(errors, function(error) {
					addError(messages, error);
					}); 
					*/ 
			
				} else {
				// otherwise we simply mark it as success
					formGroup.classList.add("has-success");
				}
			}

			
			// Recusively finds the closest parent that has the specified class
			function closestParent(child, className) {
				if (!child || child == document) {
					return null;
				}

				if (child.classList.contains(className)) {
					return child;
				} else {
					return closestParent(child.parentNode, className);
				}
			}


			function resetFormGroup(formGroup) {
				// Remove the success and error classes
				formGroup.classList.remove("has-error");
				formGroup.classList.remove("has-success");
				// and remove any old messages
				
				
				var arr = formGroup.querySelectorAll(".help-block.error");
			
				for (var i = 0; i < arr.length; i ++ ) {
					var el = arr[i];

					el.parentNode.removeChild(el);
				}
			}


			// Adds the specified error with the following markup
			// <p class="help-block error">[message]</p>
			function addError(messages, error) {
				var block = document.createElement("span");

				block.classList.add("help-block");
				block.classList.add("error");
				block.innerText = '('+error+')';
				messages.appendChild(block);
			}

		
			function showSuccess() {
				sendData();
			}
		};

		
		validatejs();
		
		
		(function() {
			// trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
			if (!String.prototype.trim) {
				(function() {
					// Make sure we trim BOM and NBSP
					var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
					String.prototype.trim = function() {
						return this.replace(rtrim, '');
					};
				})();
			}

			[].slice.call( document.querySelectorAll( '.input__field' ) ).forEach( function( inputEl ) {
				// in case the input is already filled..
				if( inputEl.value.trim() !== '' ) {
					inputEl.parentNode.className += ' input--filled';
				}

				// events:
				inputEl.addEventListener( 'focus', onInputFocus );
				inputEl.addEventListener( 'blur', onInputBlur );
			} );

			function onInputFocus( ev ) {
				ev.target.parentNode.className += ' input--filled';
			}

			function onInputBlur( ev ) {
				if( ev.target.value.trim() === '' ) {
				    ev.target.parentNode.classList.remove('input--filled');
				}
			}
		})();
		
		
		
		let inview = InView(contact, function(isInView) {
        
            if (isInView) {
    
                if (status === false) {
                 
                    if (input) {
                		setTimeout(function() {
                            input.focus({
                                preventScroll: true
                            });
                		}, 1000);
                    }
    
                    status = true;                    
                }                
                
            } else {
                
                if (status === true) {

                    status = false;
                    
                    if (input) {
                        input.blur();
                    }
                    
                    //console.log('stop contact');
                }
            }
        });
        

	};
		
	ctme.Form = new Form();
	ctme.Form.init();
	
	


}(window.ctme = window.ctme || {}));



