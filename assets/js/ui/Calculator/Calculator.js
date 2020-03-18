import CalculatorFirstStep from './CalculatorFirstStep';

class Calculator {
  isValid = false;

  constructor($el, carModel) {
    const $firstStep = $el.querySelector('#costing-step_01');
    this.model = carModel;
    this.firstStep = new CalculatorFirstStep($firstStep, this.model);
  }
}

export default Calculator;
