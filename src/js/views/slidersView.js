import Swiper from 'swiper';
import View from './View';
import 'swiper/css';
import 'swiper/css/keyboard';
import 'swiper/css/pagination';
import 'swiper/css/parallax';
import { Keyboard, Pagination, Parallax } from 'swiper/modules';
import SlidersMarkupView from './SlidersMarkupView.js';

class SliderView extends View {
    _parentEl = document.querySelector('.quotes-on-foods');

    _generateMarkup() {
        return Object.keys(this._data)
            .map(_ =>
                this._data['quotesOnFoods']
                    .map(quote =>
                        SlidersMarkupView.render({
                            data: quote,
                            render: false,
                        }),
                    )
                    .join(''),
            )
            .join('');
    }

    _generateMarkupSecondMarkup() {
        this._parentEl = document.querySelector('.quotes-on-drinks');
        return Object.keys(this._data)
            .map(_ =>
                this._data['quotesOnDrinks']
                    .map(quote =>
                        SlidersMarkupView.render({
                            data: quote,
                            render: false,
                        }),
                    )
                    .join(''),
            )
            .join('');
    }

    initializeSwiperSlider() {
        return new Swiper('.swiper', {
            modules: [Keyboard, Pagination, Parallax],

            lazyPreloaderClass: false,
            lazyPreloadPrevNext: false,
            grabCursor: true,
            loop: true,
            speed: 700,
            spaceBetween: 100,
            initialSlide: 0,
            parallax: true,

            simulateTouch: true,
            touchRatio: 0.5,
            touchAngle: 45,

            noSwiping: true,
            noSwipingClass: 'swiper-no-swiping',

            keyboard: {
                enabled: true,
                onlyInViewport: true,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
        });
    }
}

export default new SliderView();
