import CalculatorFirstStep from './CalculatorFirstStep';
import CalculatorSecondStep from './CalculatorSecondStep';
import CalculatorThirdStep from './CalculatorThirdStep';
import CalculatorFourthStep from './CalculatorFourthStep';
import LocalStorageManager from '../../helpers/Local-storage-manager';
import ServerData from '../../helpers/ServerData';
import LoadingSpinner from '../LoadingSpinner';

class Calculator {
  isValid = false;
  steps = {};
  currentStep = 1;

  constructor(node, callback) {
    this._node = node
    this._modelIconNode = this._node.querySelector('#costing-step_01_model');
    this.initSteps(node).then(() => callback())
  }


  async initSteps(node) {
    const localData = new LocalStorageManager(),
          serverData = new ServerData()

    if (!localData.caseID) return


    const firstStepNode = node.querySelector('#costing-step_01'),
        secondStepNode = node.querySelector('#costing-step_02'),
        thirdStepNode = node.querySelector('#costing-step_03'),
        fourthStepNode = node.querySelector('#costing-step_04');

    const firstStep =  new CalculatorFirstStep(firstStepNode),
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

    this._renderSpinnerCarModelIcon()
    const model = await  serverData.getVehicleByID(localData.caseID)

    const carModel = {
      id: model.id,
      manufacturer: localData.manufacturer.toLowerCase(),
      name: model.name.toLowerCase(),
      model: model.caseName.toUpperCase(),
      startYear: model.yearFrom,
      stopYear: model.yearTill || '',
      img: `/images/costing/${model.manufacturer.toLowerCase()}_${model.caseName.toUpperCase()}.jpg`,
    }

    this.model = {...carModel}

    this._renderCurrentModelIcon()

    firstStep.isFetching = true
    this.model.equipments = await serverData.maintenancesByVehicleID(localData.caseID)
    firstStep.isFetching = false
    firstStep.renderEquipments(this.model.equipments)

    fourthStep.car = {
      manufacture: this.model.manufacturer,
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

  _renderCurrentModelIcon() {
    const wrapper = document.createElement('div')
    wrapper.innerHTML  = `
    <div class="cg-car__name" style="text-transform: capitalize">${this.model.manufacturer} ${this.model.name}</div>
    <div class="cg-car__pict">
        <img class="cg-car__img" 
        src="${this.model.img}" 
        alt="${this.model.manufacturer} ${this.model.model}">
    </div>
    <ul class="cg-car__data">
        <li>${this.model.model}</li>
        <li>${this.model.startYear} - ${this.model.stopYear || "н.в"}</li>
    </ul>`;

    this._clearCarModelIcon()
    this._modelIconNode.appendChild(wrapper)
  }

  _clearCarModelIcon() {
    while (this._modelIconNode.firstChild) {
      this._modelIconNode.firstChild.remove()
    }
  }

  _renderSpinnerCarModelIcon() {
    this._clearCarModelIcon()
    const spinner = new LoadingSpinner(this._modelIconNode)
    spinner.show()
  }
}

export default Calculator;
