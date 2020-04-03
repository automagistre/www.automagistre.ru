import $ from 'jquery'
import 'slick-carousel'
import Calculator from '../../ui/Calculator/Calculator';
import {carModel} from '../../ui/model'

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
  const $costingSection =  document.querySelector('section.sec-costing'),
        $costingSlick = $('#costing-steps'),
        $costingSteps = $costingSection.querySelectorAll('.js-cg-step'),
        $costingSvg = $costingSection.querySelector('#cs-stage');
  let currentStep = 1;

  initSlick($costingSlick);

  const animateSteps = nextStep => {
    const classesMap = {
      '1 to 2': {
        add: ['step_02'],
        remove: ['step_01-back']},
      '2 to 3': {
        add: ['step_03'],
        remove: ['step_02', 'step_02-back']},
      '3 to 4': {
        add: ['step_04'],
        remove: ['step_03'] },
      '2 to 1': {
        add: ['step_01-back'],
        remove: ['step_02', 'step_02-back']},
      '3 to 2': {
        add: ['step_02-back'],
        remove: ['step_03']},
      '4 to 1': {
        add: [],
        remove: ['step_04']},
    };
    let stepClasses = `${currentStep} to ${nextStep}`;
    if (classesMap.hasOwnProperty(stepClasses)) {
      $costingSvg.classList.remove(...classesMap[stepClasses].remove);
      $costingSvg.classList.add(...classesMap[stepClasses].add);
    }
    currentStep = nextStep;
  };

  const changeStep = nextStep => {
     animateSteps(nextStep);
     $costingSlick.slick('slickGoTo', nextStep - 1, false)
  };

  $costingSteps.forEach($el => {
    $el.addEventListener('click', el => changeStep(+el.target.dataset.step))
  });
  const calculator = new Calculator($costingSection, carModel.equipments)
};

export default costingSec;
