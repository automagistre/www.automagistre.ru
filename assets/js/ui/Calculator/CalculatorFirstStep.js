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

class Equipment {

  _node = undefined;

  constructor(id, equipment) {
    this.id = id;
    this._equipment = equipment;
  }

  get name() {
    return this._equipment.name || '';
  }

  set name(value) {
    throw new Error('Read only property "name". Can`t set value:' + value)
  }

  get range(){
    return this._equipment.mileageRepeat
  }

  set range(value) {
    throw new Error('Read only property "range". Can`t set value:' + value)
  }

  get works(){
    return this._equipment.works
  }

  set works(value) {
    throw new Error('Read only property "works". Can`t set value:' + value)
  }

  get node() {
    if (this._node) {
      return this._node
    } else {
      throw new Error("Node element is undefined")
    }
  }

  set node(value) {
    throw new Error('Read only property "works". Can`t set value:' + value)
  }

  render(){
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `<label class="cg-set__radio">
                                <input type="radio" name="equipment" value="${this.id}">
                                <span>${this.name}</span>
                        </label>`;
    this._node = wrapper.querySelector('input');
    this._node.addEventListener('click', () => this.onClick());
    return wrapper.firstChild
  }

  onClick() { }
}


class CalculatorFirstStep {
  equipment = undefined;
  range = 0;

  constructor(node, equipments) {
    this.StepNode = node;
    // renderModel(node, carModel);
    this.renderEquipments(node, equipments);
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
    const mileageNode = this.StepNode.querySelector('#costing-run-line');
    while (mileageNode.firstChild) {
      mileageNode.removeChild(mileageNode.firstChild);
    }
  }

  renderMileage() {
    this.clearMileage();

    const maxLen = 17,
          mileageNode = this.StepNode.querySelector('#costing-run-line'),
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
}

export default CalculatorFirstStep
