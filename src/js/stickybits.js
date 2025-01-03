import stickybits from 'stickybits';

document.addEventListener('DOMContentLoaded', () => {
    const el = document.querySelectorAll('.js-sticky');

    // Funkcja do inicjalizacji stickybits
    const initSticky = () => {
        const offset = 100;
        for (let i = 0; i < el.length; i++) {
            stickybits(el[i], {
                stickyBitStickyOffset: offset
            });
        }
    };

    // Funkcja do usuwania stickybits
    const destroySticky = () => {
        for (let i = 0; i < el.length; i++) {
            const instance = stickybits(el[i]);
            instance.cleanup(); // Usuwa efekt stickybits
        }
    };

    // Funkcja, która zarządza inicjalizacją na podstawie szerokości okna
    const manageSticky = () => {
        if (window.matchMedia('(min-width: 1024px)').matches) {
            initSticky();
        } else {
            destroySticky();
        }
    };

    // Sprawdzenie przy załadowaniu strony
    manageSticky();

    // Dodanie nasłuchiwania na zmianę rozmiaru okna
    window.addEventListener('resize', manageSticky);
}, false);
