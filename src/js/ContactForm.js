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

    function isMobile() {
      return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent);
    }

    // Reguła walidacji dla CAPTCHA
    validate.validators.recaptcha = function(value) {
        if (!value) {
            return "Pole reCAPTCHA jest wymagane.";
        }
        return undefined; // Brak błędu
    };

    Form.prototype.init = function() {

        var ta = document.getElementById('input-2');

        ta.addEventListener('focus', function() {
            autosize(ta);
        });

        var sendData = function(formData) {
            var request = new XMLHttpRequest(),
                spinner = document.getElementById('spinner'),
                fields = document.getElementById('formFields'),
                thanks = document.getElementById('formThanks');

            spinner.classList.remove('is-hidden');
            document.querySelector('.c-contactform__submit .title').style.display = 'none';

            request.open('POST', document.forms[0].getAttribute('action'), true);
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            request.onload = function() {
                spinner.classList.add('is-hidden');
                if (request.status >= 200 && request.status < 400) {
                    var resp = request.responseText;
                    if (resp === 'Mail sent') {
                        fields.classList.add('is-hidden');
                        thanks.classList.remove('is-hidden');
                        thanks.classList.add('is-visible');
                    } else {
                        alert("Wystąpił problem podczas wysyłania wiadomości.");
                    }
                } else {
                    alert("Błąd połączenia z serwerem.");
                }
            };

            request.onerror = function() {
                spinner.classList.add('is-hidden');
                alert("Błąd wysyłki danych.");
            };

            const encodedData = Object.keys(formData)
                .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(formData[key]))
                .join('&');
            request.send(encodedData);
        };

        var validatejs = function() {
            var constraints = {
                email: {
                    presence: { allowEmpty: false, message: "Email jest wymagany." },
                    email: { message: "Podaj poprawny adres email." }
                },
                "g-recaptcha-response": {
                    presence: { allowEmpty: false, message: "Pole reCAPTCHA jest wymagane." },
                    recaptcha: true,
                },
            };

            var form = document.getElementById('contactForm');

            form.addEventListener("submit", function(ev) {
                ev.preventDefault();

                const formData = serialize(form, { hash: true });
                formData["g-recaptcha-response"] = grecaptcha.getResponse();

                var errors = validate(formData, constraints);

                if (errors) {
                    showErrors(form, errors);
                } else {
                    sendData(formData);
                }
            });
        };

        function showErrors(form, errors) {
            var inputs = form.querySelectorAll("input[name], textarea[name]");

            inputs.forEach(input => {
                showErrorsForInput(input, errors && errors[input.name]);
            });
        }

        function showErrorsForInput(input, errors) {
            var parent = input.parentNode;

            // Resetujemy klasy błędu
            parent.classList.remove("has-error", "has-success");

            if (errors) {
                parent.classList.add("has-error");
            } else {
                parent.classList.add("has-success");
            }
        }

        validatejs();

        (function() {
            if (!String.prototype.trim) {
                (function() {
                    var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
                    String.prototype.trim = function() {
                        return this.replace(rtrim, '');
                    };
                })();
            }

            [].slice.call(document.querySelectorAll('.input__field')).forEach(function(inputEl) {
                if (inputEl.value.trim() !== '') {
                    inputEl.parentNode.className += ' input--filled';
                }

                inputEl.addEventListener('focus', onInputFocus);
                inputEl.addEventListener('blur', onInputBlur);
            });

            function onInputFocus(ev) {
                ev.target.parentNode.className += ' input--filled';
            }

            function onInputBlur(ev) {
                if (ev.target.value.trim() === '') {
                    ev.target.parentNode.classList.remove('input--filled');
                }
            }
        })();

        let inview = InView(contact, function(isInView) {
            if (isInView) {
                if (!isMobile()) {
                    if (!status && input) {
                        setTimeout(() => input.focus({ preventScroll: true }), 1000);
                        status = true;
                    }
                }
            } else {
                if (status) {
                    if (input) input.blur();
                    status = false;
                }
            }
        });
    };

    ctme.Form = new Form();
    ctme.Form.init();

}(window.ctme = window.ctme || {}));
