import Selector from '../ui/Selector';

const tireServiceSec = () => {
  const secNode = document.querySelector('#tire-service'),
        tireSelectorNode = secNode.querySelector('.js-tire-selector'),
        carSelectorNode = secNode.querySelector('.js-car-selector')
  const carSelector = new Selector(carSelectorNode),
        tireSelector = new Selector(tireSelectorNode)
}

export default tireServiceSec;
