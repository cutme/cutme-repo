document.addEventListener('DOMContentLoaded', () => {
    const init = () => {
        //document.documentElement.removeAttribute('style');
        document.documentElement.classList.add('is-loaded');        
        window.anims();

        setTimeout(() => {
            document.getElementById('cover').remove();
            (function() {
        		var wf = document.createElement('script');
        		wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
        		'://code.tidio.co/mlayqazkjkapvwreklbcmiuxkhgpvrfk.js';
        		wf.type = 'text/javascript';
        		wf.async = 'true';
        		var s = document.getElementsByTagName('script')[0];
        		s.parentNode.insertBefore(wf, s);
        	})();
        }, 250);
    };

    window.addEventListener('load', init);

}, false);