import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const smoothScrolling = function () {
    document.body.addEventListener('click', function (e) {
        if (!e.target.classList.contains('redirecting-btn')) return;

        e.preventDefault();
        const id = e.target.getAttribute('href');
        document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
    });
};

export function animateElementsTransition() {
    gsap.to('header', {
        duration: 1,
        opacity: 1,
        delay: 0,
        y: 0,
        ease: 'elastic.in',
    });
    gsap.to('.header-h1', {
        delay: 1,
        duration: 3,
        opacity: 1,
        y: 0,
        x: 0,
        ease: 'back',
    });
    gsap.to('.header-h2', {
        delay: 1,
        duration: 3,
        opacity: 1,
        y: 0,
        x: 0,
        ease: 'back',
    });
    gsap.to('.hidden-object', {
        duration: 3,
        opacity: 0.9,
        y: 0,
        ease: 'back',
    });
    gsap.to('.beer-image', {
        duration: 3,
        opacity: 0.5,
        y: 0,
    });

    gsap.to('#recipes-section', {
        scrollTrigger: {
            start: '-150 top',
            trigger: '#divider-1',
        },
        duration: 1,
        y: 0,
        opacity: 1,
    });
    gsap.to('.recipe', {
        scrollTrigger: {
            start: '-150 top',
            trigger: '#recipes-section',
        },
        duration: 2,
        x: 0,
        opacity: 1,
    });

    gsap.to('#article-section', {
        scrollTrigger: {
            start: '-80 top',
            trigger: '#divider-2',
        },
        duration: 1,
        y: 0,
        opacity: 1,
    });

    gsap.to('.article-container', {
        scrollTrigger: {
            start: 'top center',
            trigger: '#article-section',
        },
        duration: 2,
        x: 0,
        opacity: 1,
    });

    gsap.to('#sliders_container-section', {
        scrollTrigger: {
            start: '5% 10%',
            end: 'bottom top',
            trigger: '#divider-3',
        },
        duration: 1,
        y: 0,
        opacity: 1,
    });
    gsap.to('.swiper', {
        scrollTrigger: {
            start: '5% 10%',
            end: 'bottom top',
            trigger: '#sliders_container-section',
        },
        duration: 1,
        x: 0,
        opacity: 1,
    });

    gsap.to('footer', {
        scrollTrigger: {
            start: 'top center',
            trigger: 'footer',
        },
        duration: 1,
        y: 0,
        opacity: 1,
    });

    gsap.to('.main-dish', {
        scrollTrigger: {
            start: 'top 70%',
            trigger: '.main-dish',
        },
        duration: 2,
        y: 0,
        x: 0,
        opacity: 1,
        ease: 'back.inOut',
    });
    gsap.to('.side-dish', {
        scrollTrigger: {
            start: 'center center',
            trigger: '.main-dish',
        },
        duration: 2,
        opacity: 1,
        delay: 1,
        y: 0,
        x: 0,
    });

    smoothScrolling();
}
