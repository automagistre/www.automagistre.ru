import $ from 'jquery';

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

const secMaster = () => {
  initSlickSlider();
};

export default secMaster;
