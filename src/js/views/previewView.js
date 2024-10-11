import View from './View.js';

class PreviewView extends View {
    _generateMarkup() {
        const id = window.location.hash.slice(1);
        return `
         <li class="search__result">
            <a href="#${this._data.id}" 
            class="flex items-center gap-5 w-full h-full px-6 py-3 hover:bg-zinc-800/50 transition-colors relative 
                    ${this._data.id === id ? 'bg-zinc-800/50 hover:bg-zinc-900/50' : ''}">
              <figure class="w-16 h-16 flex items-center justify-center rounded-full overflow-hidden relative">
                <img src="${this._data.imageUrl}" alt="${this._data.title}" class="block object-cover w-full h-full">
                <span class="absolute w-full h-full bg-gradient-to-tr ${this._data.alcoholic ? 'from-rose-500/40' : 'from-orange-500/40'}"></span>
              </figure>

              <div class="flex flex-col uppercase max-w-[60%]">
                <h6 class="text-zinc-200 lg:font-open-sans-medium lg:text-sm text-xs font-open-sans-regular">
                  ${this._data.title}
                </h6>
                <p class="md:text-xs text-[0.6rem] text-zinc-400">
                ${
                    this._data.tag
                        ? this._data.tag
                        : `
                     ${this._data.alcoholic ? `${this._data.category}` : `${this._data.publisher}`} 
                    `
                }  
                </p>
              </div>
              ${
                  this._data?.key
                      ? `
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 self-center absolute right-4 text-zinc-50">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                `
                      : ''
              }
            </a>
          </li>
        `;
    }
}

export default new PreviewView();
