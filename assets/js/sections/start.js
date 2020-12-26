import Swiper, {Navigation, EffectFade, Lazy} from 'swiper'
import '../../less/2_plugins/swiper/swiper'
import '../../less/2_plugins/swiper/effect-fade'

const initSlider = () => {
    Swiper.use([Navigation, EffectFade, Lazy])
    const secStartSlider = document.getElementById('sec-start-slider'),
          secStartNode = document.querySelector('section.sec-start'),
          nextEl = secStartNode.querySelector('.slick-next'),
          prevEl = secStartNode.querySelector('.slick-prev')

    if (secStartSlider) {
        const swiper = new Swiper(secStartSlider, {
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
            preloadImages: false,
            lazy: {
                loadPrevNext: true,
            }
        })
        document.querySelectorAll('.js-set-start-slide').
            forEach(el => el.addEventListener('click', () => {
                swiper.slideToLoop(+el.dataset.slide, 500);
            }));
    }
}

const startSec = () => {
    initSlider();
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
