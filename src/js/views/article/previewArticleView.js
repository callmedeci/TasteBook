import View from '../View.js';

class ArticlesView extends View {
    constructor() {
        super();
    }

    _generateMarkup(isLink) {
        return `
			<div class="article-container self-center ${isLink ? 'bg-zinc-800' : 'bg-zinc-900/50'} p-3 rounded-2xl gap-4 min-h-[32rem] max-h-[40rem]
			  ${isLink ? '' : 'w-full max-w-[30rem] shadow self-start'}">
			  <a href="${isLink ? 'src/pages/articles.html' : ''}#${this._data.article_id}" 
				 class="article-image_link min-h-60 h-60 
				 ${isLink ? '' : 'shadow-2xl'}">
				<img 
				loading="lazy"
				src="${this._data.article_cover.image_url}" 
				alt="${this._data.title} image"
				class="article-image">
			  </a>
			  <h5 class="article-title">
				${this._data.title}
			  </h5>
			  <p class="article-description">
			  ${this._data.introduction
                  .split(' ')
                  .splice(0, 10)
                  .join(' ')
                  .padEnd(
                      this._data.introduction.split(' ').splice(0, 10).join(' ')
                          .length + 4,
                      '.',
                  )}
			  </p>
				<div class="flex h-full w-full justify-between items-end p-5">
					<a href="#${this._data.article_id}" class="article-read_more hover:text-${this._data.type === 'foods' ? 'orange' : 'rose'}-500 self-end">
						Read More
					</a>
					
					<div class="flex gap-2 items-center">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 ${this._data?.bookmarked ? 'fill-zinc-50' : ''}">
  						<path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
						</svg>

						<span 
						class="py-1 rounded self-end
						bg-${this._data.type === 'foods' ? 'orange' : 'rose'}-500 px-2">
							${this._data.tag}
						</span>
					</div>
				</div>
		   </div>
   `;
    }
}

export default new ArticlesView();
