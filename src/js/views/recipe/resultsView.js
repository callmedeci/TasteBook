import View from '../View.js';
import previewView from '../previewView.js';

class ResultsView extends View {
    _parentEl = document.querySelector('.search__results-container');
    _errorMessage = 'No recipes found for this query! Try another one ;)';
    _sidebar = document.querySelector('.sidebar');
    _sidebarToggle = document.querySelector('.sidebar-toggle');

    constructor() {
        super();
        this._addHandlerToggleSidebar();
        this._addHandlerCloseSidebar();
    }

    _generateMarkup() {
        return this._data
            .map(result => previewView.render({ data: result, render: false }))
            .join('');
    }

    _toggleSidebar() {
        this._sidebarToggle.children[0].classList.toggle('rotate-180');
        this._sidebar.classList.toggle('-translate-x-[96%]');
    }

    _closeSidebar(e) {
        if (this._sidebar.classList.contains('-translate-x-[96%]')) return;
        if (e.target.closest('.sidebar')) return;

        this._sidebarToggle.children[0].classList.remove('rotate-180');
        this._sidebar.classList.add('-translate-x-[96%]');
    }

    _addHandlerToggleSidebar() {
        this._sidebarToggle.addEventListener(
            'click',
            this._toggleSidebar.bind(this),
        );
    }

    _addHandlerCloseSidebar() {
        document.body.addEventListener('click', this._closeSidebar.bind(this));
    }
}

export default new ResultsView();
