import $ from 'jquery'
import 'slick-carousel'
import Calculator from '../../ui/Calculator/Calculator';


const initSlick = node => {
  const slickOptions = {
    arrows: false,
    dots: false,
    draggable: false,
    adaptiveHeight: false,
    swipe: false,
    infinite: false,
    speed: 1200,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  node.slick(slickOptions)
};


const renderModel = ($el, carModel) => {

};


const costingSec = () => {
  const costingSectionNode =  document.querySelector('section.sec-costing'),
        costingSlickNode = $('#costing-steps'),
        costingStepsNode = costingSectionNode.querySelectorAll('.js-cg-step'),
        costingSvgNode = costingSectionNode.querySelector('#cs-stage');
  let currentStep = 1;

  let calculator = new Calculator(costingSectionNode, () => initSlick(costingSlickNode));

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

  const changeStep = nextStepNumber => {
    const currentStepNumber = calculator.currentStep,
          currentStep = calculator.steps[currentStepNumber];
    if (currentStep.isValid || nextStepNumber < currentStepNumber) {
      costingSlickNode.slick('slickGoTo', nextStepNumber - 1, false);
      calculator.currentStep = costingSlickNode.slick('slickCurrentSlide') + 1;
      animateSteps(nextStepNumber);
    } else {
      currentStep.showInvalidSelections();
    }
    if (currentStepNumber === 4 && nextStepNumber === 1) {
      calculator.destroy();
      calculator = new Calculator(costingSectionNode)
    }
  };

  costingStepsNode.forEach(node => {
    node.addEventListener('click', el => changeStep(+el.target.dataset.step))
  });

};

export default costingSec;
