import CalculatorSecondStep from './CalculatorSecondStep';

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



class CalculatorFirstStep {
  equipment = undefined;
  range = 0;

  constructor($el, carModel) {
    this.carModel = carModel;
    this.StepBlock = $el;
    renderModel($el, carModel);
    this.renderEquipments($el, carModel);
    this.renderMileage($el, carModel);
  }

  renderEquipments($el, carModel) {
    const $equipmentsBlock = $el.querySelector('#costing-step_01_model_equipments');
    if ($equipmentsBlock) {
      for (let equipmentId in carModel.equipments) {
        const equipment = carModel.equipments[equipmentId];
        const $equipmentWrapper = document.createElement('label');
        const $equipment = document.createElement('input');
        const $equipmentName = document.createElement('span');

        $equipmentWrapper.className = 'cg-set__radio';
        $equipmentName.innerHTML = equipment.name;

        $equipment.type = 'radio';
        $equipment.name = 'equipment';
        $equipment.value = equipmentId;
        $equipmentWrapper.append($equipment);
        $equipmentWrapper.append($equipmentName);
        $equipmentsBlock.append($equipmentWrapper);

        const equipmentOnChange = (e) => this.equipmentChange(e);
        $equipment.addEventListener('click', equipmentOnChange)
      }
    }
  }

  onChangeEquipment() { }

  onChangeMileage() { }

  equipmentChange(e) {
    this.equipment = this.carModel.equipments[e.target.value];
    this.range = 0;
    this.renderMileage();
    this.onChangeEquipment();
  }

  mileageChange(e) {
    const range = +e.target.dataset.range,
          $mileageBlock = e.target.parentElement;
    this.range = range;
    for (let child of $mileageBlock.childNodes) {
      const childRange = +child.dataset.range;
      child.classList.toggle('is-before', childRange < range);
      child.classList.toggle('is-active', childRange === range);
    }
    this.onChangeMileage()
  }

  renderMileage() {
    const maxLen = 17;
    const $mileageBlock = this.StepBlock.querySelector('#costing-run-line');
    while ($mileageBlock.firstChild) {
      $mileageBlock.removeChild($mileageBlock.firstChild);
    }
    if (this.equipment) {
      for (let i = 2; i <= maxLen; i++) {
        const $mileage = document.createElement('li');
        const range = i * this.equipment.mileageRepeat;
        $mileage.className = 'cg-run__step';
        $mileage.dataset.range = range;
        $mileage.innerHTML = range + 'к';
        $mileageBlock.append($mileage);

        const mileageOnChange = (e) => this.mileageChange(e);
        $mileage.addEventListener('click', mileageOnChange)
      }
    }
  }
}

export default CalculatorFirstStep
