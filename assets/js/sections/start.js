import Swiper, {Navigation, EffectFade, Lazy} from 'swiper'


export const initModalSlider = node => {
    Swiper.use([Navigation, EffectFade, Lazy])
    const secStartNode = document.querySelector('#sec-start__body'),
          nextEl = secStartNode.querySelector('.slick-next'),
          prevEl = secStartNode.querySelector('.slick-prev')

    const swiper = new Swiper(node, {
        loop:true,
        effect: 'fade',
        slideActiveClass: 'slick-active',
        slideClass: 'slick-slide',
        speed: 500,
        setWrapperSize: true,
        fadeEffect: {
            crossFade: true
        },
        navigation: {
            nextEl, prevEl
        },
        lazy: {
            loadPrevNext: true,
        }
    })
    secStartNode.querySelectorAll('.js-set-start-slide').
        forEach(el => el.addEventListener('click', () => {
            swiper.slideToLoop(+el.dataset.slide, 500);
        }));
    return swiper
}

const startSec = () => {
    const secStartSlider = document.getElementById('sec-start-slider')
    initModalSlider(secStartSlider);
    document.querySelectorAll('.js-sec-start-slider-freeze').
        forEach(el => el.addEventListener('click', () =>{
            document.querySelector('#sec-start-select').
                classList.add('is-frozen');
        }));

    document.querySelectorAll('.js-sec-start-slider-unfreeze').
        forEach(el => el.addEventListener('click', () =>{
            document.querySelector('#sec-start-select').
                classList.remove('is-frozen')
        }));
};

export default startSec;
