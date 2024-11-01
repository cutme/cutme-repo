import Blazy from 'blazy';
import Pace from '../js/pace.js';

Pace.start();

Pace.on('done', function() {   

	const element = document.getElementById('cover');

    if (element) {
		
/*
		const event = function(e) {
            element.removeEventListener("transitionend", event);
            document.body.removeAttribute('style');
            document.getElementById('cover').remove();    
        }

        element.addEventListener("transitionend", event, false);
        document.getElementsByClassName('pace')[0].remove();
*/
    }
    
   
    
    
    // Tidio
/*
    (function() {
		var wf = document.createElement('script');
		wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
		'://code.tidio.co/mlayqazkjkapvwreklbcmiuxkhgpvrfk.js';
		wf.type = 'text/javascript';
		wf.async = 'true';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(wf, s);
	})();
*/
	
	// Google Analytics
	if(navigator.userAgent.indexOf("Speed Insights") == -1) {
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');ga('create','UA-609018-20','auto');ga('send','pageview');
	}
    
});
