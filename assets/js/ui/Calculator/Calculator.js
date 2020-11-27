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
  type = 'calculator'

  constructor(node, callback) {
    this._node = node
    this._modelIconNode = this._node.querySelector('#costing-step_01_model');
    this.initSteps(node).then(() => callback())
    this._reinitSlick = callback
  }


  async initSteps(node) {
    const localData = new LocalStorageManager(),
          serverData = new ServerData()

    if (!localData.caseID) {
      this._renderSelectCarModelIcon()
      return
    }


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
      this._reinitSlick()
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
      fourthStep.date = formStatus['calendar-inline'].value;
      fourthStep.name = formStatus['name'].value;
    };

    this._renderSpinnerCarModelIcon()
    let response = await  serverData.getVehicleByID(localData.caseID)
    if (response.response !== 200) {
      this._renderErrorCarIconModel()
      return
    }

    const model = response.data
    const carModel = {
      id: model.id,
      manufacturer: localData.manufacturer.toLowerCase(),
      name: model.name.toLowerCase(),
      model: model.caseName.toUpperCase(),
      startYear: model.yearFrom,
      stopYear: model.yearTill || '',
    }

    this.model = {...carModel}

    this._renderCurrentModelIcon()

    firstStep.isFetching = true
    response = await serverData.maintenancesByVehicleID(localData.caseID)
    firstStep.isFetching = false
    if (response.response !== 200) {
      this._renderErrorCarIconModel()
      return
    }
    this.model.equipments = response.data
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

  get inputs() {
    return this.steps[3].inputs
  }

  get equipment() {
    return this.steps[1].equipment
  }

  get mileage() {
    return this.steps[1].range
  }

  get totalPrice() {
    return this.steps[2].totalPrice
  }

  get works() {
    return this.steps[2].works
  }

  set isSending(value) {
    this.steps[3].form.isSending = value
  }

  get isSending() {
    return this.steps[3].form.isSending
  }

  _renderCurrentModelIcon() {
    const wrapper = document.createElement('div')
    wrapper.innerHTML  = `
    <div class="cg-car__name" style="text-transform: capitalize">${this.model.manufacturer} ${this.model.name}</div>
    <div class="cg-car__pict">

    </div>
    <ul class="cg-car__data">
        <li>${this.model.model}</li>
        <li>${this.model.startYear} - ${this.model.stopYear || "н.в"}</li>
    </ul>`;

    const carImageName = `${this.model.manufacturer}_${this.model.model}.jpg`
    const carImage = new Image()
    carImage.src = `/images/costing/${carImageName}`
    carImage.onerror = () => { carImage.src = "/images/costing/default.jpg" }
    carImage.alt = `${this.model.name}`
    carImage.classList.add('cg-car__img')
    this.model.img = carImage

    wrapper.querySelector('div.cg-car__pict').append(carImage)

    this._clearCarModelIcon()
    this._modelIconNode.appendChild(wrapper)
    this._node.querySelector('#costing-step_01').classList.toggle('costing__inactive', false)
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

  _renderSelectCarModelIcon() {
    this._clearCarModelIcon()
    this._node.querySelector('#costing-step_01').classList.toggle('costing__inactive', true)
    const wrapper = document.createElement('div')
    wrapper.innerHTML  = `
    <div class="cg-car__name" style="text-transform: capitalize">Выберите модель</div>
    <div class="cg-car__pict">
        <img class="cg-car__img" 
        src="/images/costing/empty.jpg" 
        alt="Выберите модель">
    </div>`;
    this._modelIconNode.append(wrapper)
  }

  _renderErrorCarIconModel() {
    this._clearCarModelIcon()
    this._node.querySelector('#costing-step_01').classList.toggle('costing__inactive', true)
    const wrapper = document.createElement('div')
    wrapper.innerHTML  = `
    <div class="cg-car__name" style="text-transform: capitalize">Ошибка соединения</div>
    <div class="cg-car__pict">
        <img class="cg-car__img" 
        src="/img/icons/Red_circular_arrow.svg" 
        alt="повторить">
    </div>
        <ul class="cg-car__data">
        <li>Повторить</li>
    </ul>`;
    this._modelIconNode.append(wrapper)
  }
}

export default Calculator;
