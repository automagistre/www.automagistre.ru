import Calculator from '../../ui/Calculator/Calculator';
import Header from '../../ui/Header';
import ServerDataSender from '../../helpers/server-data-sender';
import ErrorFeedBackPopup from '../../ui/Popups/ErrorFeedBackPopup';
import Swiper from 'swiper'


const initSlider = node => {
  const options = {
    allowTouchMove: false,
    preventInteractionOnTransition: true,
    autoHeight: true,
    roundLengths: true,
    swipe: false,
    speed: 800,
  };

  return new Swiper(node, options)
};


const costingSec = () => {
  const costingSectionNode =  document.querySelector('section.sec-costing'),
        costingSliderNode = document.getElementById('costing-steps'),
        costingStepsNode = costingSectionNode.querySelectorAll('.js-cg-step'),
        costingSvgNode = costingSectionNode.querySelector('#cs-stage'),
        costingFormSubmitNode = costingSectionNode.querySelector('.js-cg-submit'),
        costingFormNewNode = costingSectionNode.querySelector('.js-cg-new'),
        topOfSection = document.getElementById('costing')
  let currentStep = 1;

  const swiper = initSlider(costingSliderNode)
  const calculatorCallback = () => { swiper.updateAutoHeight(500) }

  let calculator = new Calculator(costingSectionNode, calculatorCallback);

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
    const header = Header.instance
    swiper.slideTo(nextStepNumber - 1)
    calculator.currentStep = swiper.activeIndex + 1
    animateSteps(nextStepNumber);
    header.isAlwaysHide = true
    topOfSection.scrollIntoView({behavior: "auto"});
    setTimeout(()=> header.isAlwaysHide = false, 500)
  }

  costingStepsNode.forEach(node => {
    node.addEventListener('click', el => {
      const currentStep = calculator.steps[calculator.currentStep]
      const nextStepNumber = +el.target.dataset.step
      if (currentStep.isValid || nextStepNumber < calculator.currentStep) {
        changeStep(nextStepNumber)
      } else {
        currentStep.showInvalidSelections()
      }
  })})


  const calculatorSender = new ServerDataSender()
  calculatorSender.onError = () => {
    (new ErrorFeedBackPopup('Ошибка соединения, повторите попытку')).open()
  }
  calculatorSender.onSuccess = () => {
    changeStep(calculator.currentStep + 1)
  }
  costingFormSubmitNode.addEventListener('click', async () => {
    const currentStep = calculator.steps[calculator.currentStep]
    if (currentStep.isValid) {
      await calculatorSender.sendForm(calculator);
    }
    else {
      calculator.steps[3].form.showInvalidInputs()
      calculator.steps[3].showInvalidSelections()
    }
  })
  costingFormNewNode.addEventListener('click', ()=> {
    calculator.destroy();
    calculator = new Calculator(costingSectionNode, calculatorCallback)
    changeStep(1)
  })
}

export default costingSec;
