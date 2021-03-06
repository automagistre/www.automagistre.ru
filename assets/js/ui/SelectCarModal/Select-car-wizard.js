import ServerData from '../../helpers/ServerData';
import Selector from '../Selector';
import LocalStorageManager from '../../helpers/Local-storage-manager';
import LoadingSpinner from '../LoadingSpinner';
import errorMessages from '../../Errors/ErrorMassges';
import { manufacturerID } from '../../vars/manufactirerID';
import { initModalSlider } from '../../sections/start';
import ModalSelectCar from './Modal';

const localStorageManager = new LocalStorageManager();

const manufacturerStepList = {
  nissan: 0,
  infiniti: 2,
  toyota: 1,
  lexus: 3,
};

class SelectCarWizard {
  steps = []

  constructor(node) {
    this.steps[0] = new SelectCarWizardStepManufacturer(node);
    this.steps[1] = new SelectCarWizardStepModel(node);
    this.steps[0].setActive(this.steps[0]);
    node.querySelectorAll('.js-select-manufacturer').forEach((node) => {
      node.addEventListener('click', () => this.changeStep(1));
    });
    node.querySelector('.modal__step[data-step="manufacturer"]').addEventListener('click', () => {
      this.changeStep(0);
    });
  }

  changeStep(num) {
    const data = {
      manufacturer: this.steps[0].content.manufacturer,
    };
    for (let i = 0; i < this.steps.length; i++) {
      // this.steps[i].setComplete(i < num)
      this.steps[i].setActive(this.steps[num]);
    }
    if (num === 1) {
      this.steps[1].renderModels(manufacturerID[data.manufacturer.toLowerCase()]);
    }
    document.querySelector('#modal-head').classList.toggle('on-step-two', num === 1);
  }

  onOpen() {
    this.steps[0]._slider.update();
    this.steps[0]._slider.lazy.load();
  }
}

class SelectCarWizardStep {
  _selectedContent = {}

  _indicatorNode = undefined

  _node = undefined

  constructor() {

  }

  setActive(entity) {
    this._indicatorNode.classList.toggle('is-active', entity === this);
    this._node.classList.toggle('is-active', entity === this);
    if (this.isActive) {
      this._indicatorNode.classList.remove('is-complete');
    }
  }

  setComplete(test) {
    this._indicatorNode.classList.toggle('is-completed', test);
  }

  get content() {
    return this._selectedContent;
  }

  get isActive() {
    return this._indicatorNode.classList.contains('is-active');
  }
}

class SelectCarWizardStepManufacturer extends SelectCarWizardStep {
  constructor(node) {
    super();
    this._selectedContent.manufacturer = localStorageManager.manufacturer;

    this._node = node.querySelector('#modal-tab_01');
    this._sliderNode = this._node.querySelector('#select-car-slider');
    this._slider = initModalSlider(this._sliderNode);

    this._node.querySelectorAll('.js-select-manufacturer').forEach((node) => {
      node.addEventListener('click', () => this._selectedContent.manufacturer = node.dataset.manufactirer);
    });
    this._indicatorNode = node.querySelector('.modal__step[data-step="manufacturer"]');

    const currentManufacturer = localStorageManager.manufacturer;
    if (currentManufacturer) {
      this._slider.slideToLoop(manufacturerStepList[currentManufacturer], 500);
    }
  }
}

class ModelItem {
  constructor(model, targetID) {
    this._targetID = targetID;
    this._model = model;
  }

  render(node) {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = `<div class="modal__model">
            <div class="car-card">
                <h4 class="car-card__title">${this._model.name}</h4>
                <div class="car-card__pict"> </div>
                <div class="car-card__info">
                    <div class="car-card__code">${this._model.caseName}</div>
                    <div class="car-card__year">${this._model.yearFrom} - ${this._model.yearTill || 'н.в'}</div>
                </div>
                <a class="car-card__link js-car-card" role="button"></a>
            </div>
         </div>
        `;
    this._node = wrapper.lastElementChild;

    const carImageName = `${this._model.manufacturer.toLowerCase()}_${this._model.caseName.toUpperCase()}.jpg`;
    const carImage = new Image();
    carImage.src = `/images/car-find/${carImageName}`;
    carImage.onerror = () => { carImage.src = '/images/car-find/default.jpg'; };
    carImage.alt = `${this._model.name}`;
    carImage.classList.add('car-card__img');
    this._node.querySelector('div.car-card__pict').append(carImage);
    this._node.addEventListener('click', async () => await this.select());
    node.append(this._node);
  }

  get yearFrom() {
    return +this._model.yearFrom;
  }

  get yearTill() {
    return +this._model.yearTill;
  }

  get name() {
    return this._model.name;
  }

  get caseName() {
    return this._model.caseName;
  }

  get caseID() {
    return this._model.id;
  }

  get manufacturer() {
    return this._model.manufacturer;
  }

  hide() {
    this._node.classList.add('is-hidden');
  }

  show() {
    this._node.classList.remove('is-hidden');
  }

  unSelect() {
    this._node.firstElementChild.classList.remove('is-selected');
  }

  select() {
    const prevManufacturer = localStorageManager.manufacturer;
    localStorageManager.manufacturer = this.manufacturer;
    localStorageManager.caseName = this.caseName;
    localStorageManager.caseID = this.caseID;
    this.onSelect();
    this._node.firstElementChild.classList.add('is-selected');
    const modal = ModalSelectCar.instance;
    setTimeout(() => {
      if (this.manufacturer.toLowerCase() === prevManufacturer.toLowerCase()) {
        modal.hide();
      } else {
        location.href = `${location.origin}${location.pathname}?brand=${this.manufacturer.toLowerCase()}${this._targetID ? `#${this._targetID}` : ''}`;
      }
    }, 300);
  }

  onSelect() {}
}

class SelectCarWizardStepModel extends SelectCarWizardStep {
  _isInit = false

  _isLoading = false

  _targetToScroll = ''

  _models = []

  constructor(node) {
    super();
    this._server = new ServerData();
    this._indicatorNode = node.querySelector('.modal__step[data-step="model"]');
    this._node = node.querySelector('#modal-tab_02');
    this._modelListNode = this._node.querySelector('.modal__models');
  }

  async renderModels(manufacturerID) {
    this.clear();
    const spinner = new LoadingSpinner(this._modelListNode, 1);

    spinner.show();
    this._isLoading = true;
    const { response, data } = await this._server.getVehiclesByManufacturerID(manufacturerID);
    spinner.remove();
    this._isLoading = false;
    if (response !== 200) {
      if (this._isInit) {
        this.clear();
      }
      this._modelListNode.innerHTML = `
            <div class="modal__errors">
                <div class="modal__errors_name">${errorMessages.serverErrorResponse}</div>
                <div><a class="btn btn_big sec-start__slide-btn js-reload-modal-step2" href="">Обновить</a></div>
            </div>`;
      this._modelListNode.querySelector('.js-reload-modal-step2').addEventListener('click', (e) => {
        e.preventDefault();
        if (!this._isLoading) {
          this.clear();
          this.renderModels(manufacturerID);
        }
      });
      return;
    }
    let yearMin = Infinity; let
      yearMax = -Infinity;

    const onSelect = async () => {
      this._models.forEach((model) => model.unSelect());
    };

    this._models = data.sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      const aYear = a.yearFrom;
      const bYear = b.yearFrom;
      if (aName < bName) { return -1; }
      if (bName < aName) { return 1; }
      if (aYear < bYear) { return -1; }
      if (bYear < aYear) { return 1; }
      return 0;
    }).map((model) => {
      const modelEntity = new ModelItem(model, this.targetToScroll);
      modelEntity.onSelect = onSelect;
      return modelEntity;
    });

    this._models.forEach((modelItem) => {
      modelItem.render(this._modelListNode);
      yearMin = Math.min(modelItem.yearFrom, modelItem.yearTill || (new Date()).getFullYear(), yearMin);
      yearMax = Math.max(modelItem.yearFrom, modelItem.yearTill || (new Date()).getFullYear(), yearMax);
    });
    this.initYearSelector(yearMin, yearMax);
    this.initSearchInput();
    this._isInit = true;
  }

  set targetToScroll(value) {
    this._targetToScroll = value || '';
  }

  get targetToScroll() {
    return this._targetToScroll || '';
  }

  initSearchInput() {
    this._searchInputNode = document.querySelector('#modal-input-search');
    this._searchInputNode.addEventListener('input', () => {
      this.filterByName(this._searchInputNode.value);
      this._yearSelector.clear();
    });
  }

  initYearSelector(minYear, maxYear) {
    const selectorNode = document.querySelector('#modal__selector');
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
        <div class="selector modal__selector">
            <input value="0" type="hidden">
            <div class="selector__val" data-val="0">Выбрать год</div>
            <div class="selector__drop selector__years"></div>
        </div>`;
    let currentYear = Math.trunc(minYear / 10) * 10;

    while (currentYear <= maxYear) {
      const newDecYearWrapper = document.createElement('div');
      if (currentYear % 10 === 0) {
        newDecYearWrapper.innerHTML = `
            <div class="selector__years-col">
                <div class="selector__years-title">${currentYear}e</div>
                <ul class="selector__list selector__years-list">
                </ul>
            </div>`;
        for (let i = 0; i < 10 && currentYear <= maxYear; i++, currentYear++) {
          if (currentYear < minYear) {
            continue;
          }
          const yearListItemWrapper = document.createElement('div');
          yearListItemWrapper.innerHTML = `<li data-val="${currentYear}">${currentYear}</li>`;
          newDecYearWrapper.firstElementChild.lastElementChild.append(yearListItemWrapper.firstElementChild);
        }
      }
      wrapper.firstElementChild.lastElementChild.append(newDecYearWrapper.firstElementChild);
    }

    selectorNode.append(wrapper.firstElementChild);

    this._yearSelector = new Selector(selectorNode.firstElementChild);
    this._yearSelector.onChange = () => {
      this.filterModelsByYear(+this._yearSelector.currentSelect.value);
      this._searchInputNode.value = '';
    };
  }

  clear() {
    while (this._modelListNode.firstChild) {
      this._modelListNode.removeChild(this._modelListNode.firstChild);
    }
    if (this._isInit) {
      this._models = undefined;
      this._yearSelector.destroy();
      this._searchInputNode.value = '';
    }
    this._isInit = false;
  }

  filterModelsByYear(year) {
    for (const model of this._models) {
      if (model.yearFrom <= year && (year <= model.yearTill || !model.yearTill)) {
        model.show();
      } else {
        model.hide();
      }
    }
  }

  filterByName(filterString) {
    filterString = filterString.toLowerCase();
    for (const model of this._models) {
      const fullName = `${model.name.toLowerCase()}#${model.caseName.toLowerCase()}`;
      if (fullName.includes(filterString)) {
        model.show();
      } else {
        model.hide();
      }
    }
  }
}

export default SelectCarWizard;
