import View from './View.js';

class PaginationView extends View {
    _parentEl = document.querySelector('.pagination-container');

    constructor() {
        super();
    }

    _generateMarkup() {
        const curPage = this._data.page;
        const pageNums = Math.ceil(
            this._data.results.length / this._data.resultsPerPage,
        );

        if (curPage === 1 && pageNums > 1) {
            return this._generateMarkupButton('next', curPage);
        }
        if (curPage === pageNums && pageNums > 1) {
            return this._generateMarkupButton('prev', curPage);
        }
        if (curPage < pageNums) {
            console.log('hey');
            return `
            ${this._generateMarkupButton('next', curPage)}
            ${this._generateMarkupButton('prev', curPage)}
            `;
        }

        return '';
    }

    _generateMarkupButton(className, curPage) {
        return `
             <button class="pagination-btn ${className === 'next' ? '' : 'flex-row-reverse'}"
             data-go-to-page="${className === 'next' ? curPage + 1 : curPage - 1}">
                <span>
                    Page ${className === 'next' ? curPage + 1 : curPage - 1} -${Math.ceil(this._data.results.length / this._data.resultsPerPage)}
                </span>
               
                ${
                    className === 'next'
                        ? `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                </svg>
               `
                        : `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                </svg>
               `
                }
             </button>
        `;
    }

    addHandlerClick(handler) {
        this._parentEl.addEventListener('click', function (e) {
            const btn = e.target.closest('.pagination-btn');
            if (!btn) return;

            const goToPage = +btn.dataset.goToPage;
            handler(goToPage);
        });
    }
}

export default new PaginationView();
