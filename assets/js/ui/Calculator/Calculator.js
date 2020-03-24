import CalculatorFirstStep from './CalculatorFirstStep';
import CalculatorSecondStep from './CalculatorSecondStep';

class Calculator {
  isValid = false;

  constructor($el, carModel) {
    const $firstStep = $el.querySelector('#costing-step_01'),
          $secondStep = $el.querySelector('#costing-step_02');
    this.model = carModel;
    const firstStep =  new CalculatorFirstStep($firstStep, this.model);
    const secondStep = new CalculatorSecondStep($secondStep);
    firstStep.onChangeEquipment = () => {
      secondStep.clear();
    };

    firstStep.onChangeMileage = () => {
      const equipment =  firstStep.equipment,
            range = firstStep.range;
      secondStep.clear();
      secondStep.render(equipment, range);
      this.equipmentName = equipment.name;
    };
  }
  changeStep () {
    console.log()
  }
}

export default Calculator;
