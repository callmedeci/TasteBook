import View from '../View.js';

class RecipeView extends View {
    _parentEl = document.querySelector('.recipes-container');
    _errorMessage = 'Could not find your recipe! Try another one :)';

    constructor() {
        super();
    }

    _generateMarkup(isLink) {
        return `
         <${isLink ? 'a' : 'div'}
          ${isLink ? `href="src/pages/${this._data?.alcoholic ? 'drinksRecipes' : 'foodRecipes'}.html#${this._data.id}"` : ''}
          class="recipe justify-self-center text-zinc-50
          ${isLink ? `hover:shadow-2xl ${this._data?.alcoholic ? 'hover:shadow-rose-600' : 'hover:shadow-orange-600'} transition-shadow duration-500 translate-x-14 opacity-0 xl:justify-start max-w-3xl relative overflow-hidden xl:col-span-1` : 'bg-opacity-50 rounded-none'}">
          <h5 class="recipe-name">
            <span class="recipe-title ${this._data?.alcoholic ? 'recipe-title_drinks' : 'recipe-title_food'}">
              ${this._data.title}
            </span>
          </h5>
          <figure class="recipe-image_container">
            <img loading="lazy" 
            src="${this._data.imageUrl}"
            alt="${this._data.title} image"
            class="recipe-image">
            <div class="image-cover 
                ${this._data?.alcoholic ? 'from-rose-500/50' : 'from-orange-500/50'} "></div>
          </figure>

          <div class="w-full h-8 items-center justify-between flex uppercase px-4 sm:px-10 mt-10 md:mt-16">
            <div class="flex items-center gap-4 sm:gap-6">
              <div class="flex items-center justify-center gap-2">
                ${
                    this._data?.alcoholic
                        ? '<img loading="lazy" src="../../../../public/svgs/liquor-glass.svg" alt="liquor-glass" class="recipe-icons">'
                        : `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="recipe-icons text-orange-500">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg> `
                } 
                <span class="recipe-details recipe-cooking_time">
                  ${this._data?.alcoholic ? this._data.category : `${this._data.cookingTime} min`}
                </span>
              </div>

              <div class="flex items-center justify-evenly gap-2">
              ${
                  this._data?.alcoholic
                      ? '<img loading="lazy" src="../../../../public/svgs/glass-drinks.svg" alt="glass drinks" class="size-7 sm:size-7 md:size-10"/>'
                      : `
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="recipe-icons text-orange-500">
                        <path stroke-linecap="round" stroke-linejoin="round"
                         d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                    </svg>
                    `
              }
               
                <span class="recipe-details recipe-servings">
                  ${this._data.servings}  ${this._data?.alcoholic ? '' : 'servings'} 
                </span>
              </div>
            </div>

            <button class="bookmark-btn group">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="bookmark-icon ${this._data.bookmarked ? 'fill-zinc-50' : ''}">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
              </svg>
            </button>
          </div>
          <div
            class="w-full h-full mt-10 md:mt-16 px-2 md:px-10 py-10 flex flex-col items-center justify-center space-y-8 bg-zinc-800">
            <div class="text-center flex flex-col items-center gap-2">
              <h4 class="font-julius font-semibold">
                recipe ingredients
              </h4>
              <span class="recipe-calories">
                ${
                    this._data?.alcoholic
                        ? `<img loading="lazy" 
                    alt="calories svg" 
                    src="./../../public/svgs/liquor-calories.svg"
                    class="calories-icon">`
                        : `<img loading="lazy"
                     alt="calories svg"
                     src="./../../public/svgs/food-calories.svg" 
                     class="calories-icon">`
                }
                Calories:<span class="ml-1">50</span>
              </span>
            </div>

            <ul class="recipe-ingredients">            
            ${this._data.ingredients
                .map(ing => this._generateIngredientsMarkup(ing))
                .join('')}
            </ul>
          </div>
           ${
               isLink
                   ? ''
                   : `   
            <div class="p-10 text-center flex flex-col gap-5 h-full">
                <h4 class="${this._data?.alcoholic ? 'text-rose-500' : 'text-orange-500'}">
                  How to cook it
                </h4>
                ${
                    this._data?.alcoholic
                        ? `
                     <p class="font-open-sans-medium text-sm text-zinc-300 max-w-sm">
                        ${this._data.instructions}
                     </p>
                    `
                        : `
                    <p class="font-open-sans-regular text-sm text-zinc-400 max-w-sm">
                      This recipe was carefully designed and tested by 
                      <span class="text-zinc-200 font-open-sans-semibold">
                      ${this._data.publisher}
                      </span>. Please
                      check out directions at their
                      website.
                    </p>
                    `
                }
                ${
                    this._data.sourceUrl
                        ? `
                <button
                  class="uppercase bg-gradient-to-t w-max px-3 py-2 
                  from-orange-500 to-rose-400 self-center rounded-full
                  font-open-sans-medium hover:scale-105 transition-all duration-300">
                  <a href="${this._data.sourceUrl}">
                    Directions &rarr;
                  </a>
                </button>
                    `
                        : ''
                }
            </div>
           `
           }
           
        </${isLink ? 'a' : 'div'}>
        `;
    }

    _generateIngredientsMarkup(ing) {
        return `
          <li class="recipe-ingredient">
            <span class="${this._data?.alcoholic ? 'text-rose-500' : 'text-orange-500'} font-semibold">&#10003;</span>
            ${this._data?.alcoholic ? ing : `${ing.quantity ? ing.quantity : ''} ${ing.unit ? ing.unit : ''} ${ing.description}`}                
          </li>
        `;
    }

    addHandlerRender(handler) {
        ['hashchange', 'load'].forEach(e =>
            window.addEventListener(e, handler),
        );
    }

    addHandlerAddBookmark(handler) {
        this._parentEl.addEventListener('click', function (e) {
            const btn = e.target.closest('.bookmark-btn');
            if (!btn) return;
            handler();
        });
    }
}

export default new RecipeView();
