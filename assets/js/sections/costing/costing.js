import $ from 'jquery'
import 'slick-carousel'
import Calculator from '../../ui/Calculator/Calculator';
import Header from '../../ui/Header';
import ServerDataSender from '../../helpers/server-data-sender';
import ErrorFeedBackPopup from '../../ui/Popups/ErrorFeedBackPopup';


const initSlick = node => {
  const slickOptions = {
    arrows: false,
    dots: false,
    draggable: false,
    adaptiveHeight: true,
    swipe: false,
    infinite: false,
    speed: 800,
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
        costingSvgNode = costingSectionNode.querySelector('#cs-stage'),
        costingFormSubmitNode = costingSectionNode.querySelector('.js-cg-submit'),
        topOfSection = document.getElementById('costing')
  let currentStep = 1;

  initSlick(costingSlickNode)
  const calculatorCallback = () => {
    costingSlickNode.find(".slick-slide").height("auto")
    costingSlickNode.slick('reinit')
    costingSlickNode.slick("setOption", null, null, true)
  }

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
  //
  // if (currentStepNumber === 4 && nextStepNumber === 1) {
  //   calculator.destroy();
  //   calculator = new Calculator(costingSectionNode, calculatorCallback)
  // }
  const changeStep = nextStepNumber => {
    const header = Header.instance
    costingSlickNode.slick('slickGoTo', nextStepNumber - 1, false)
    calculator.currentStep = costingSlickNode.slick('slickCurrentSlide') + 1
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
  costingFormSubmitNode.addEventListener('click', async () => {
    const currentStep = calculator.steps[calculator.currentStep]
    if (currentStep.isValid) {
      await calculatorSender.sendCalculator(calculator)
      changeStep(calculator.currentStep + 1)
    } else {
      currentStep.showInvalidSelections()
    }
  })
}

export default costingSec;
