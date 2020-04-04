import CalculatorSteps from './CalculatorSteps';
import Equipment from './Equipment';

const renderModel = ($el, carModel) => {
  const blockHTML = `
    <div class="cg-car__name">${carModel.manufacture} ${carModel.name}</div>
        <div class="cg-car__pict">
            <img class="cg-car__img" src="${carModel.img}" alt="${carModel.manufacture} ${carModel.name}">
        </div>
        <ul class="cg-car__data">
            <li>${carModel.model}</li>
            <li>${+carModel.startYear} - ${carModel.stopYear || "н.в"}</li>
        </ul>
    </div>`;
  const carBlock = $el.querySelector('#costing-step_01_model');
  // При нажатии на этот элемент появляется выбор тачки
  if ( carBlock) {
    carBlock.innerHTML = blockHTML;
  }
};

class CalculatorFirstStep extends CalculatorSteps {
  equipment = undefined;
  range = 0;

  constructor(node, equipments) {
    super(node, equipments);
    this._node = node;
    this.renderEquipments(node, equipments);
  }

  get isValid() {
    return this.equipment && this.range > 0;
  }

  renderEquipments(node, equipments) {
    const equipmentsNode = node.querySelector('#costing-step_01_model_equipments');
    if (equipmentsNode) {
      for (let [entityID, entity] of Object.entries(equipments)) {
        const equipment = new Equipment(entityID, entity),
              node = equipment.render();
        equipment.onClick = () => this.equipmentChange(equipment);

        equipmentsNode.append(node);
      }
    }
  }

  onChangeEquipment() { }

  onChangeMileage() { }

  equipmentChange(equipment) {
    this.equipment = equipment;
    this.range = 0;
    this.renderMileage();
    this.onChangeEquipment();
  }

  mileageChange(e) {
    const range = +e.target.dataset.range,
          mileageNode = e.target.parentElement;
    this.range = range;
    for (let child of mileageNode.childNodes) {
      const childRange = +child.dataset.range;
      child.classList.toggle('is-before', childRange < range);
      child.classList.toggle('is-active', childRange === range);
    }
    this.onChangeMileage()
  }

  clearMileage() {
    const mileageNode = this._node.querySelector('#costing-run-line');
    while (mileageNode.firstChild) {
      mileageNode.removeChild(mileageNode.firstChild);
    }
  }

  renderMileage() {
    this.clearMileage();

    const maxLen = 17,
          mileageNode = this._node.querySelector('#costing-run-line'),
          mileageOnChange = (e) => this.mileageChange(e);
    if (this.equipment) {
      for (let i = 2; i <= maxLen; i++) {
        const wrapper = document.createElement('div'),
              range = i * this.equipment.range;
        wrapper.innerHTML = `<li class="cg-run__step" data-range="${range}">
                                ${range + 'к'}
                             </li>`;
        wrapper.firstChild.addEventListener('click', mileageOnChange);
        mileageNode.append(wrapper.firstChild);
      }
    }
  }

  showInvalidSelections() {
    const equipmentUnitNode = this._node.querySelector('.costing__col-set').firstElementChild,
          mileageUnitNode = this._node.querySelector('.costing__col-run').firstElementChild;

    if (!this.equipment) {
      this.highlightNode(equipmentUnitNode).then(() => {});
    }
    if (this.range === 0) {
      this.highlightNode(mileageUnitNode).then(() => {});
    }
  }
}

export default CalculatorFirstStep
