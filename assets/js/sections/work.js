import $ from "jquery";
import 'slick-carousel';
import Odometer from 'odometer';

const secWorkFilter = (keyClassName, key) => {
    let $workCounter = $('#sec-work-count'),
        valueStart = +key === 1 ? 101 : +key;
    const odometerOptions = {
        el: $workCounter[0],
        duration: 300,
        value: valueStart,
        format: '(dd)',
    };
    $secWorkSlider.slick('slickUnfilter');
    $secWorkSlider.slick('slickFilter', function() { return $(`.${keyClassName}`, this).length === 1; });

    const od = new Odometer(odometerOptions);
    od.update(+key + 100);
};

const changeSlide = event => {
    const target = event.currentTarget;
    workFilterBtn.forEach(btn => btn.classList.remove('is-active'));
    target.classList.add('is-active');
    secWorkFilter(`js-type-${target.dataset.key}`, target.dataset.key)
};

const $secWorkSlider = $('#sec-work-slider'),
      workFilterBtn = document.querySelectorAll('.js-work-filter');
const slickOptions = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
};

$secWorkSlider.slick(slickOptions);
secWorkFilter('js-type-01', '01'); // Init slider
workFilterBtn.forEach(element => element.addEventListener('click', changeSlide));


