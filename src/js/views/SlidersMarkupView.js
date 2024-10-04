import View from './View.js';
import { extractLastWordLowercase } from '../helper/helper.js';

class SlidersMarkupView extends View {
    _generateMarkup() {
        return `
      <div class="swiper-slide">
         <span class="quote-icon 
         ${
             this._data.tag === 'alcoholic drinks'
                 ? 'gradient-text_rose'
                 : 'gradient-text_orange'
         }" 
         data-swiper-parallax="-300"
         data-swiper-parallax-scale="0.5"
         data-swiper-parallax-opacity="0.8"
         aria-hidden="true">
          ❝ 
          </span>
         
         <h5 class="quote-title max-w-[55%] md:max-w-md">
              <span class="bg-gradient-to-tr ${
                  this._data.tag === 'alcoholic drinks'
                      ? 'from-rose-600 to-orange-400'
                      : 'from-orange-600 to-rose-400'
              }">
                    ${this._data.context}
              </span> 
         </h5>
         <p class="quote-description"
            data-swiper-parallax="-50"
            data-swiper-parallax-scale="0.9"
            data-swiper-parallax-opacity="0.8"
            data-swiper-parallax-duration="600" >
              ${this._data.quote}
         </p>

         <div 
            data-swiper-parallax="-400"
            data-swiper-parallax-opacity="0"
            data-swiper-parallax-scale="0"
            data-swiper-parallax-duration="600"
            class="author-profile">
              <div class="author-image_container">
                <img 
                loading="lazy"
                 src="images/logo/${extractLastWordLowercase(
                     this._data.name,
                 )}-logo.webp"
                 alt="${this._data.name} logo"
                 class="author-image">
              </div>
              <div class="author-details">
                <span class="author-name">${this._data.name}</span>
                <span class="author-role">${this._data.nationality}</span>
              </div>
         </div>

         <picture class="background-container">
          <source 
          media="(max-width: 640px)"
          srcset="images/background/mobile/${extractLastWordLowercase(
              this._data.name,
          )}-background.webp" />
           <img 
           sizes="(max-width: 768px) 10px, 480px"
           loading="lazy" 
           src="images/background/${extractLastWordLowercase(
               this._data.name,
           )}-background.webp" 
           alt="${this._data.name} Background"
           class="background-image"
           data-swiper-parallax="-100"
           data-swiper-parallax-duration="800">
         </picture>

         <div class="overlay-gradient 
         ${
             this._data.tag === 'alcoholic drinks'
                 ? 'from-rose-500/40'
                 : 'from-orange-500/40'
         }"></div>
      </div>
    `;
    }
}

export default new SlidersMarkupView();
