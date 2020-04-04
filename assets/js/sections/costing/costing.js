import $ from 'jquery'
import 'slick-carousel'
import Calculator from '../../ui/Calculator/Calculator';
import {carModel} from '../../ui/model'

const initSlick = node => {
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
  node.slick(slickOptions)
};


const costingSec = () => {
  const costingSectionNode =  document.querySelector('section.sec-costing'),
        costingSlickNode = $('#costing-steps'),
        costingStepsNode = costingSectionNode.querySelectorAll('.js-cg-step'),
        costingSvgNode = costingSectionNode.querySelector('#cs-stage');
  let currentStep = 1;

  initSlick(costingSlickNode);

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
      costingSvgNode.classList.remove(...classesMap[stepClasses].remove);
      costingSvgNode.classList.add(...classesMap[stepClasses].add);
    }
    currentStep = nextStep;
  };

  const changeStep = nextStep => {
    const currentStep = calculator.steps[calculator.currentStep];

    if (currentStep.isValid || nextStep < currentStep) {
      costingSlickNode.slick('slickGoTo', nextStep - 1, false);
      calculator.currentStep = nextStep;
      animateSteps(nextStep);
    } else {
      currentStep.showInvalidSelections();
    }
  };

  costingStepsNode.forEach(node => {
    node.addEventListener('click', el => changeStep(+el.target.dataset.step))
  });
  const calculator = new Calculator(costingSectionNode, carModel.equipments)
};

export default costingSec;
