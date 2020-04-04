import CalculatorFirstStep from './CalculatorFirstStep';
import CalculatorSecondStep from './CalculatorSecondStep';
import CalculatorThirdStep from './CalculatorThirdStep';

class Calculator {
  isValid = false;
  steps = {};
  currentStep = 1;

  constructor(node, carModel) {
    const firstStepNode = node.querySelector('#costing-step_01'),
          secondStepNode = node.querySelector('#costing-step_02'),
          thirdStepNode = node.querySelector('#costing-step_03');

    this.model = carModel;
    const firstStep =  new CalculatorFirstStep(firstStepNode, this.model);
    const secondStep = new CalculatorSecondStep(secondStepNode);
    const thirdStep = new CalculatorThirdStep(thirdStepNode);

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

    this.steps[1] = firstStep;
    this.steps[2] = secondStep;
    this.steps[3] = thirdStep;
  }

}

export default Calculator;
