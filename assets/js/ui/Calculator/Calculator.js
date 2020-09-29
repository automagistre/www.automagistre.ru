import CalculatorFirstStep from './CalculatorFirstStep';
import CalculatorSecondStep from './CalculatorSecondStep';
import CalculatorThirdStep from './CalculatorThirdStep';
import CalculatorFourthStep from './CalculatorFourthStep';
import LocalStorageManager from '../../helpers/Local-storage-manager';
import ServerData from '../../helpers/ServerData';

class Calculator {
  isValid = false;
  steps = {};
  currentStep = 1;

  constructor(node, callback) {
    this.initSteps(node).then(() => callback())
  }


  async initSteps(node) {
    const localData = new LocalStorageManager(),
          serverData = new ServerData()

    if (!localData.caseID) return

    const model = await  serverData.getVehicleByID(localData.caseID)
    const equipments = await serverData.maintenancesByVehicleID(localData.caseID)

    const carModel = {
      id: model.id,
      name: model.name,
      model: model.caseName,
      startYear: model.yearFrom,
      stopYear: model.yearTill || '',
      img: `/images/costing/${model.manufacturer.toLowerCase()}_${model.caseName.toUpperCase()}`,
      equipments
    }

    this.model = {...carModel}

    const firstStepNode = node.querySelector('#costing-step_01'),
        secondStepNode = node.querySelector('#costing-step_02'),
        thirdStepNode = node.querySelector('#costing-step_03'),
        fourthStepNode = node.querySelector('#costing-step_04');

    const firstStep =  new CalculatorFirstStep(firstStepNode, this.model.equipments),
        secondStep = new CalculatorSecondStep(secondStepNode),
        thirdStep = new CalculatorThirdStep(thirdStepNode),
        fourthStep = new CalculatorFourthStep(fourthStepNode);

    firstStep.onChangeEquipment = () => {
      secondStep.clear();
    };

    firstStep.onChangeMileage = () => {
      const equipment =  firstStep.equipment,
          range = firstStep.range;
      secondStep.clear();
      secondStep.render(equipment, range);
    };

    secondStep.onChange = () => {
      const totalPrice = secondStep.totalPrice;
      thirdStep.totalPrice = totalPrice;
      fourthStep.totalPrice = totalPrice;
    };

    thirdStep.onChange = () => {
      const formStatus = thirdStep.getFormStatus();
      fourthStep.date = formStatus['calendar'].value;
      fourthStep.name = formStatus['name'].value;
    };

    fourthStep.car = {
      manufacture: this.model.manufacture,
      name: this.model.name,
      model: this.model.model
    };

    this.steps[1] = firstStep;
    this.steps[2] = secondStep;
    this.steps[3] = thirdStep;
    this.steps[4] = fourthStep;
  }

  destroy() {
    for (let step of Object.values(this.steps)) {
      step.clear();
    }
    this.steps = undefined;
    this.currentStep = undefined;
    this.isValid = false;
    this.isDestroyed = true;
  }

}

export default Calculator;
