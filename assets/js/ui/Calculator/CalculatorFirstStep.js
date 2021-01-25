import CalculatorSteps from './CalculatorSteps';
import Equipment from './Equipment';
import LoadingSpinner from '../LoadingSpinner';
import {Swiper, Navigation} from 'swiper';
import '../../../less/2_plugins/swiper/swiper.less'

class CalculatorFirstStep extends CalculatorSteps {
  equipment = undefined;
  range = 0;

  constructor(node) {
    Swiper.use([Navigation])
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
      for (let entity of equipments) {
        const equipment = new Equipment(entity),
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
    this.clear()
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

    const maxLen = 35,
          mileageNode = this.mileageNode,
          mileageOnChange = (e) => {
            this.mileageChange(e);
          };
    if (this.equipment) {
      for (let i = 1; i <= maxLen; i++) {
        const wrapper = document.createElement('div'),
              range = i * this.equipment.range;
        wrapper.innerHTML = `<div class="cg-run__step swiper-slide" data-range="${range}">${range + 'к'}</div>`;
        wrapper.firstChild.addEventListener('click', mileageOnChange);
        mileageNode.append(wrapper.firstChild);
      }
    }
    this.mileageSlider = new Swiper(mileageNode.parentNode, {
      nested: true,
      grabCursor: true,
      height: 60,
      slidesPerView : 'auto',
      navigation: {
        nextEl: '.cg-run__next',
        prevEl: '.cg-run__prev',
        disabledClass: 'is-disabled'
      },
      breakpoints: {
        760: {
          slidesOffsetBefore: 60,
          slidesOffsetAfter: 60,
        }
      }
    })
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
