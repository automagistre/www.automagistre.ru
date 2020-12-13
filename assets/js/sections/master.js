import $ from 'jquery';
import 'slick-carousel'
import PerfectScrollbar from 'perfect-scrollbar';

const initSlickSlider = () => {
  const slickOptions = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 800,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: '<button type=\'button\' class=\'slick-arrow slick-prev\'></button>',
    nextArrow: '<button type=\'button\' class=\'slick-arrow slick-next\'></button>',
    responsive: [
      {breakpoint: 760, settings: {arrows: false}},
    ],
  };
  const $masterSlider = $('#sec-master-slider');
  if ($masterSlider.length) $masterSlider.slick(slickOptions)
};

const customScrollBarOptions = {
  handlers: ['drag-thumb', 'wheel', 'touch'],
  swipeEasing: true,
  maxScrollbarLength: 150
}

const secMaster = () => {
  const masterSecNode = document.querySelector('section.sec-master')
  initSlickSlider()
  masterSecNode.querySelectorAll('.js-scroll-y').forEach(el => new PerfectScrollbar(el, {
    ...customScrollBarOptions,
    suppressScrollX: true
  }))
}

export default secMaster;
