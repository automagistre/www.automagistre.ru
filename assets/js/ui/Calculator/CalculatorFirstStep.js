import CalculatorSteps from './CalculatorSteps';
import Equipment from './Equipment';
import LoadingSpinner from '../LoadingSpinner';


class CalculatorFirstStep extends CalculatorSteps {
  equipment = undefined;
  range = 0;

  constructor(node) {
    super(node);

    this.equipmentsNode = node.querySelector('#costing-step_01_model_equipments')
    this.mileageNode = node.querySelector('#costing-run-line')

  }

  get isValid() {
    return this.equipment && this.range > 0;
  }

  renderEquipments(equipments) {
    const equipmentsNode = this.equipmentsNode;
    if (equipmentsNode) {
      for (let [entityID, entity] of Object.entries(equipments)) {
        const equipment = new Equipment(entityID, entity),
              node = equipment.render();
        equipment.onClick = () => this.equipmentChange(equipment);

        equipmentsNode.append(node);
      }
    }
  }

  clearEquipment() {
    const equipmentsNode = this.equipmentsNode;
    while (equipmentsNode.firstChild) {
      equipmentsNode.removeChild(equipmentsNode.firstChild);
    }
  }

  set isFetching(status) {
    if (status) {
      (new LoadingSpinner(this.mileageNode)).show();
      (new LoadingSpinner(this.equipmentsNode)).show();
    } else {
      while (this.mileageNode.firstChild) this.mileageNode.firstChild.remove()
      while (this.equipmentsNode.firstChild) this.equipmentsNode.firstChild.remove()
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
    const mileageNode = this.mileageNode;
    while (mileageNode.firstChild) {
      mileageNode.removeChild(mileageNode.firstChild);
    }
  }

  renderMileage() {
    this.clearMileage();

    const maxLen = 17,
          mileageNode = this.mileageNode,
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

  clear() {
    this.clearMileage();
    this.clearEquipment()
  }
}

export default CalculatorFirstStep
