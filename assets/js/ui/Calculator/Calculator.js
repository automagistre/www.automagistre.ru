import CalculatorFirstStep from './CalculatorFirstStep';
import CalculatorSecondStep from './CalculatorSecondStep';

class Calculator {
  isValid = false;

  constructor($el, carModel) {
    const $firstStep = $el.querySelector('#costing-step_01'),
          $secondStep = document.querySelector('#costing-step_02');
    this.model = carModel;
    const firstStep =  new CalculatorFirstStep($firstStep, this.model);
    const secondStep = new CalculatorSecondStep($secondStep);

    firstStep.onChangeEquipment = function() {
      secondStep.clear();
    };
    firstStep.onChangeMileage = function() {
      const equipment =  firstStep.equipment,
            range = firstStep.range;
      secondStep.clear();
      secondStep.render(equipment, range)
    };

  }
}

export default Calculator;
