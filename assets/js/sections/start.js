import Swiper, {Navigation} from 'swiper'
import '../../less/2_plugins/swiper/swiper'

const initSlider = () => {
    Swiper.use([Navigation])
    const secStartSlider = document.getElementById('sec-start-slider')
    const slickOptions = {
        arrows: true,
        dots: false,
        infinite: true,
        speed: 0,
        fade: true,
        autoplay: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button type=\'button\' class=\'slick-arrow slick-prev\'></button>',
        nextArrow: '<button type=\'button\' class=\'slick-arrow slick-next\'></button>',
        responsive: [
            {breakpoint: 768, settings: {arrows: false}}
        ]};
    if (secStartSlider) {
        const swiper = new Swiper(secStartSlider, {
            loop: false,
            effect: 'cube',
            slideActiveClass: 'slick-active',
            slideClass: 'slick-slide',
            speed: 0,
            setWrapperSize: true,
        })
        document.querySelectorAll('.js-set-start-slide').
            forEach(el => el.addEventListener('click', () => {
                swiper.slideTo(+el.dataset.slide, 0);
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
