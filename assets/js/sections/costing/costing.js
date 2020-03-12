import $ from 'jquery'
import 'slick-carousel'

const initSlick = $el => {
  const slickOptions = {
    arrows: false,
    dots: false,
    draggable: false,
    adaptiveHeight: true,
    swipe: false,
    infinite: false,
    speed: 1200,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  $el.slick(slickOptions)
};


const costingSec = () => {
  const $costingSlick = $('#costing-steps');
  const $costingSteps = document.querySelector('section.sec-costing')
                                .querySelectorAll('.js-cg-step');

  initSlick($costingSlick);
  const changeStep = step => {
     console.log(step)
     $costingSlick.slick('slickGoTo', step - 1, false)
  };
  $costingSteps.forEach($el => {
    $el.addEventListener('click', e => changeStep(+e.target.dataset.step))
  })
};

export default costingSec;
