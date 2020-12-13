import $ from 'jquery';
import 'slick-carousel'
import '../../less/4_sections/sec_announces'
import '../../less/3_blocks/block_blog-card'

const initSlickSlider = () => {
  const slickOptions = {
    arrows: true,
    dots: true,
    infinite: false,
    speed: 800,
    autoplay: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: '<button type=\'button\' class=\'slick-arrow slick-prev\'></button>',
    nextArrow: '<button type=\'button\' class=\'slick-arrow slick-next\'></button>',
    responsive: [
      {breakpoint: 1024, settings: {slidesToShow: 2}},
      {breakpoint: 600, settings: {slidesToShow: 1}},
    ],
  };
  $('.js-announces-slider').slick(slickOptions)
};

const secAnnounces = () => {
  initSlickSlider()
}

export default secAnnounces;
