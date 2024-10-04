import initLenis from '../views/lenisView.js';

class MobileMenuView {
    _body = document.body;

    _parentEl = document.querySelector('nav');
    _menu = document.querySelector('.menu');
    _overlay = document.querySelector('#menu-overlay');
    _lenis = initLenis();

    constructor() {
        this._addHandlerToggleMenu();
        this._addHandlerCloseMenuOnEscape();
        this._addHandlerCloseMenuOnResize();
    }

    _closeMenuOnResize() {
        //Guard Clause
        if (window.innerWidth <= 1024) return;

        //Enable Scrolling
        this._lenis.start();
        this._body.classList.remove('overflow-hidden');

        //Close menu
        [...document.querySelectorAll('.menu-list_item')].forEach(el => {
            el.classList.add('-translate-x-24');
        });

        //Close Menu
        this._parentEl.classList.remove('bg-zinc-800');
        this._menu.classList.add('menu-hidden');
        this._overlay.classList.add('menu-hidden');
        this._parentEl.querySelector('#menu-toggle').classList.remove('open');
    }

    _toggleMenu(e) {
        const btn = e.target.closest('#menu-toggle');

        //Gaurd Clause
        if (e?.key !== 'Escape' && e?.key !== undefined) return;
        if (!btn) return;

        btn.classList.toggle('open');

        //Disable scrolling While the Menu is Opened
        if (!btn.classList.contains('open')) {
            this._lenis.start();
            this._body.classList.remove('overflow-hidden');
        } else this._lenis.stop();

        [...document.querySelectorAll('.menu-list_item')].forEach(el => {
            el.classList.toggle('-translate-x-24');
        });
        this._parentEl.classList.toggle('bg-zinc-800');
        this._menu.classList.toggle('menu-hidden');
        this._overlay.classList.toggle('menu-hidden');
    }

    _addHandlerToggleMenu() {
        this._parentEl.addEventListener('click', this._toggleMenu.bind(this));
    }

    _addHandlerCloseMenuOnEscape() {
        document.addEventListener('keydown', this._toggleMenu.bind(this));
    }

    _addHandlerCloseMenuOnResize() {
        window.addEventListener('resize', this._closeMenuOnResize.bind(this));
    }
}

export default new MobileMenuView();
