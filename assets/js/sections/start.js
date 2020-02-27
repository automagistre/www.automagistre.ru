import $ from 'jquery'
import 'slick-carousel'



const initSlickSlider = () => {
    const $secStartSlider = $('#sec-start-slider');
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
    if ($secStartSlider) {
        $secStartSlider.slick(slickOptions);
        document.querySelectorAll('.js-set-start-slide').
            forEach(el => el.addEventListener('click', () => {
                $secStartSlider.slick('slickGoTo', el.dataset.slide, false);
            }));
    } else {
        throw new Error('Fail init SlickSlider on startSec');
    }
};

const startSec = () => {
    initSlickSlider();
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
