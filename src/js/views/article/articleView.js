import View from '../View.js';
import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

class ArticlesView extends View {
    _parentEl = document.querySelector('article');
    _closeBtn = document.querySelector('.btn-close_modal');
    _sortBtns = document.querySelectorAll('.btn-sort');

    constructor() {
        super();
        this._addHandlerCloseModal();
    }

    _generateMarkup() {
        return `	
				<div class="overflow-hidden shadow [clip-path:polygon(100%_0,0_0,0_100%)] absolute -z-10 opacity-30">
					<img loading="lazy" src="${this._data.imageUrl}" alt="${this._data.title} picture"
						class="block w-full h-full object-cover">
				</div>

                <div class="absolute flex flex-row-reverse items-center justify-center gap-2 right-2 top-14 sm:gap-2 sm:right-4 md:right-12 z-50">
                    <button type="button"
					    class="btn-close_modal text-rose-600 transition-colors duration-300 hover:text-rose-700">
					        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
						    class="size-8 sm:size-12">
						    <path stroke-linecap="round" stroke-linejoin="round"
							d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
					    </svg>
				    </button>
                    <button type="button" class="group bookmark-btn ring ring-zinc-50">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                         class="bookmark-icon size-3 sm:size-6 ${this._data.bookmarked ? 'fill-zinc-50' : ''}">
  						<path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
						</svg>
                    </button>
                </div>

	
				<h2 class="p-10 max-w-xs sm:max-w-lg lg:max-w-3xl">
					${this._data.title}
				</h2>
	
				<p class="px-10 text-sm font-open-sans-regular text-zinc-200">
					${this._data.introduction}
				</p>
	
				<div class="bg-zinc-700 p-5 rounded-lg lg:grid grid-cols-2 flex flex-col gap-10 mx-10">
					${this._data.mainContent
                        .map(content =>
                            this._generateArticleMainContent(content),
                        )
                        .join('')}
				</div>
	
				<div class="p-10 flex flex-col gap-4">
					<h4 class="flex items-center gap-2">
						Conclusion
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
							stroke="currentColor" class="size-8 text-rose-600">
							<path stroke-linecap="round" stroke-linejoin="round"
								d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
						</svg>
					</h4>
					<p>
						${this._data.conclusion}
					</p>
				</div>
        `;
    }

    _generateArticleMainContent(content) {
        return `
        <div class="flex flex-col gap-6 h-full">
			<h4>
				<span class="${this._data.type === 'foods' ? 'text-orange-500' : 'text-rose-500'}">${content.number}.</span>${content.title}
			</h4>
			<p>
			    ${content.description}
			    <br>
			    ${content.details}
			</p>
			${
                !content.image
                    ? ''
                    : `
				<div class="w-full max-w-3xl h-96 rounded-2xl overflow-hidden self-center sm:self-start shadow">
					<img loading="lazy"
						src="${content.image}" alt="${content.title}"
						class="block w-full h-full object-cover">
				</div>
				`
            }
		</div>
        `;
    }

    toggleOverlay() {
        document
            .querySelector('#article-overlay')
            .classList.toggle('menu-hidden');
        document.querySelector('section').classList.toggle('z-50');
    }

    _closeModal(e) {
        const btn = e.target.closest('.btn-close_modal');

        if (!btn) return;

        window.location.hash = '';
        this.toggleOverlay();
        this._parentEl.innerHTML = '';
    }

    _addHandlerCloseModal() {
        this._parentEl.addEventListener('click', this._closeModal.bind(this));
    }

    addHandlerRender(handler) {
        ['hashchange', 'load'].forEach(event => {
            window.addEventListener(event, () => {
                gsap.to(window, {
                    ease: 'power1.inOut',
                    duration: 2,
                    scrollTo: 'article',
                });
                handler();
            });
        });
    }

    addHandlerAddBookmark(handler) {
        this._parentEl.addEventListener('click', function (e) {
            const btn = e.target.closest('.bookmark-btn');
            if (!btn) return;
            handler();
        });
    }

    addHandlerSort(handler) {
        let isSort = false;
        this._sortBtns.forEach(btn => {
            btn.dataset.isSort = true;
            btn.addEventListener('click', function (e) {
                const btnDataset = e.target.dataset;
                handler(btnDataset.sortType, !isSort);
                isSort = !isSort;
                btnDataset.isSort = isSort;
            });
        });
    }
}

export default new ArticlesView();
