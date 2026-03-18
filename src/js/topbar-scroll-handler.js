const topbar = document.querySelector('.js-topbar-scroll-handler');
const body = document.body;

let ticking = false;
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(() => {
      const isVisible = !topbar.classList.contains('opacity-0');

      if (currentScroll > 0) {
      
      } else {
        topbar.classList.remove('opacity-100');
        // topbar.classList.add('left-0', 'right-0', 'bg-black');
        // topbar.classList.remove('left-6', 'right-6', 'translate-y-6', 'bg-black/90', 'rounded-[var(--default-rounded)]');
      }

      if (currentScroll > lastScrollY && currentScroll > 120) {
        topbar.classList.add('opacity-0', 'pointer-events-none');
        topbar.classList.remove('hidden');
        //topbar.classList.remove('rounded-[var(--default-rounded)]');

        if (window.disableTopbarScroll) {
          window.disableTopbarScroll = false;
        }
        
      } else if (currentScroll < lastScrollY) {        
        if (!window.disableTopbarScroll) {
          topbar.classList.remove('opacity-0', 'pointer-events-none');
        }

        // if (currentScroll > 0) {
        //   topbar.classList.add('rounded-[var(--default-rounded)]');
        // }
      }
      
      if (currentScroll < 400) {
        topbar.classList.add('opacity-0', 'pointer-events-none');
      }

      lastScrollY = currentScroll;
      ticking = false;
    });
    ticking = true;
  }
});
