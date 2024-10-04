import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

class ViewHeader {
    #parentEl = document.querySelector('header');
    #translations = [
        {
            el: '#we-in-french',
            translatedText: 'nous',
            originalText: 'Our',
            delay: 5,
        },
        {
            el: '#make-in-italian',
            translatedText: 'fare',
            originalText: 'make',
            delay: 8,
        },
        {
            el: '#it-in-portuguese',
            translatedText: 'isso',
            originalText: 'it',
            delay: 11,
        },
        {
            el: '#easy-in-persian',
            translatedText: 'آسان',
            originalText: 'easy',
            delay: 14,
        },
        {
            el: '#to-in-dutch',
            translatedText: 'naar',
            originalText: 'to',
            delay: 17,
        },
        {
            el: '#find-in-chinese',
            translatedText: '找到',
            originalText: 'find',
            delay: 20,
        },
        {
            el: '#what-in-japanese',
            translatedText: '何',
            originalText: 'what',
            delay: 23,
        },
        {
            el: '#you-in-swedish',
            translatedText: 'du',
            originalText: 'you',
            delay: 26,
        },
        {
            el: '#need-in-russian',
            translatedText: 'нуждаться',
            originalText: 'need',
            delay: 29,
        },
    ];

    constructor() {
        this.#translations.forEach(translation => {
            this.#animateTextTranslation(translation);
        });
    }

    #animateTextTranslation({ el, translatedText, originalText, delay }) {
        gsap.from(el, {
            text: translatedText,
            delay: delay,
            duration: 0.5,
        });
        gsap.to(el, {
            text: originalText,
            delay: (delay += 1.5),
            duration: 0.5,
        });
    }
}

export default new ViewHeader();
