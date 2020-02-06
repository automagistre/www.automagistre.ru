import $ from "jquery";
import 'slick-carousel'

const $secStartSlider = $('#sec-start-slider');
if ($secStartSlider.length) {
    $secStartSlider.slick({
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
            {breakpoint: 768, settings: {arrows: false}},
        ],
    });
}

$('.js-set-start-slide').click(function() {
    let $btn = $(this),
        slideNum = +$btn.data('slide');
    $secStartSlider.slick('slickGoTo', slideNum, false);
});

$('.js-sec-start-slider-freeze').click(function() {
    $('#sec-start-select').addClass('is-frozen');
});

$('.js-sec-start-slider-unfreeze').click(function() {
    $('#sec-start-select').removeClass('is-frozen');
});