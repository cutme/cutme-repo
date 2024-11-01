import Siema from 'siema';

(()=> {
    const carousel = new Siema({
        duration: 600,
        easing: 'cubic-bezier(0.250, 0.100, 0.250, 1.000)',
        loop: true,
    });
    
    setInterval(() => {
        carousel.next();
    }, 5500);
})();