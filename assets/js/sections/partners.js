import $ from 'jquery';
import '../../less/4_sections/sec_partners'

const initSlickSlider = () => {
  const slickOptions = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 800,
    autoplay: true,
    slidesToScroll: 1,
    variableWidth: true,
    prevArrow: '<button type=\'button\' class=\'slick-arrow slick-prev\'></button>',
    nextArrow: '<button type=\'button\' class=\'slick-arrow slick-next\'></button>',
    responsive: [
      {breakpoint: 1024, settings: {arrows: false}},
    ],
  };

  const $secPartnersSlider = $('#sec-partners-slider, .sec-partners-slider');
  if ($secPartnersSlider.length) $secPartnersSlider.slick(slickOptions);
};

const partnersSec = () => {
  import('../../less/2_plugins/slick-slider').then(() => initSlickSlider())
};

export default partnersSec;
