import mobileMenuView from './mobileMenuView.js';
class NavbarView {
    _parentEl = document.querySelector('nav');
    _dropdownMenuBtn = document.querySelector('.dropdown-menu-btn');

    constructor() {
        this._addHandlerDropdownMenu();
        this._addHandlerCloseDropDownMenu();
    }

    _toggleDropdownMenu(e) {
        e.preventDefault();
        document
            .querySelector('.dropdown-menu')
            .classList.toggle('dropdown-menu_hidden');

        document
            .querySelector('.dropdown-menu-svg')
            .classList.toggle('rotate-180');
    }

    _closeDropDownMenu(e) {
        if (e.target.classList.contains('dropdown-menu-btn')) return;

        document
            .querySelector('.dropdown-menu')
            .classList.add('dropdown-menu_hidden');

        document
            .querySelector('.dropdown-menu-svg')
            .classList.remove('rotate-180');
    }

    _addHandlerDropdownMenu() {
        this._dropdownMenuBtn.addEventListener(
            'click',
            this._toggleDropdownMenu.bind(this),
        );
    }

    _addHandlerCloseDropDownMenu() {
        document.body.addEventListener('click', this._closeDropDownMenu);
    }
}

export default new NavbarView();
