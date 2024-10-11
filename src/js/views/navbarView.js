import mobileMenuView from './mobileMenuView.js';
class NavbarView {
    _parentEl = document.querySelector('nav');
    _dropdownMenuBtn = document.querySelector('.dropdown-menu-btn');
    _tabBtn = document.querySelector('#categoryTabsBtn');
    _tabsContainer = document.querySelector('.categoryTabs');
    _tabs = document.querySelectorAll('.categoryTab');
    category = 'food';

    constructor() {
        this._addHandlerDropdownMenu();
        this._addHandlerCloseDropDownMenu();
        this._addHandlerToggleTabs();
        this._addhandlerCloseTabs();
    }

    _toggleTabs(e) {
        e.preventDefault();

        this._tabsContainer.classList.toggle('categoryTabs-hidden');

        const tab = e.target.closest('.categoryTab');
        if (!tab) return;

        this._tabs.forEach(tab =>
            tab.classList.remove('bg-zinc-700', 'text-orange-500'),
        );
        tab.classList.toggle('bg-zinc-700');
        tab.classList.toggle('text-orange-500');

        this.category = tab.dataset.category;
    }

    _closeTabs(e) {
        if (e.target.closest('.search')) return;
        this._tabsContainer.classList.add('categoryTabs-hidden');
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

    _addHandlerToggleTabs() {
        document
            .querySelector('form')
            .addEventListener('click', this._toggleTabs.bind(this));
    }

    _addhandlerCloseTabs() {
        document.body.addEventListener('click', this._closeTabs.bind(this));
    }
}

export default new NavbarView();
