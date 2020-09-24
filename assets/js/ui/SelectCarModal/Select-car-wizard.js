import $ from 'jquery'
import 'slick-carousel'
import ServerData from '../../helpers/ServerData';
import Selector from '../Selector';

class SelectCarWizard {

  steps = []

  constructor(node) {
    this.steps[0] = new SelectCarWizardStepManufacturer(node)
    this.steps[1] = new SelectCarWizardStepModel(node)
    this.steps[0].setActive(this.steps[0])
    node.querySelectorAll('.js-select-manufacturer').forEach( node=> {
      node.addEventListener('click', ()=> this.changeStep(1))
    })
    node.querySelector('.modal__step[data-step="manufacturer"]').addEventListener('click', ()=> {
      this.steps[1].clear()
      this.changeStep(0)
    })
  }

  changeStep(num) {
    const data = {
      manufacturer: this.steps[0].content.manufacturer
    }
    for (let i = 0; i < this.steps.length; i++) {
      // this.steps[i].setComplete(i < num)
      this.steps[i].setActive(this.steps[num])
    }
    if (num === 1) {
      this.steps[1].renderModels(data.manufacturer)
    }
    document.querySelector('#modal-head').classList.toggle('on-step-two', num === 1)
  }
}


class SelectCarWizardStep {

  _selectedContent = {}
  _indicatorNode = undefined
  _node = undefined

  constructor() {

  }

  setActive(entity) {
    this._indicatorNode.classList.toggle('is-active', entity === this)
    this._node.classList.toggle('is-active', entity === this)
    if (this.isActive) this._indicatorNode.classList.remove('is-complete')
  }

  setComplete(test) {
    this._indicatorNode.classList.toggle('is-completed', test)
  }

  get content() {
    return this._selectedContent
  }

  get isActive() {
    return this._indicatorNode.classList.contains('is-active')
  }
}


class SelectCarWizardStepManufacturer extends SelectCarWizardStep {

  constructor(node) {
    super()
    const options = {
      arrows: true,
      dots: false,
      infinite: true,
      speed: 0,
      fade: true,
      autoplay: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: '<button type=\'button\' class=\'slick-arrow slick-prev\'></button>',
      nextArrow: '<button type=\'button\' class=\'slick-arrow slick-next\'></button>',
      responsive: [
        {breakpoint: 768, settings: {arrows: false}},
      ],
    }

    this._node = node.querySelector('#modal-tab_01')
    this.$slider = $('#select-car-slider').slick(options)

    document.querySelectorAll('.js-set-start-slide').forEach(btnNode => {
      const sliderToGo = btnNode.dataset.slide || 0;
      btnNode.addEventListener('click', ()=> {
        this.$slider.slick('slickGoTo', sliderToGo, false)
      })
    })

    this._node.querySelectorAll('.js-select-manufacturer').forEach( node => {
      node.addEventListener('click', () => this._selectedContent.manufacturer = node.dataset.manufactirer)
    })
    this._indicatorNode = node.querySelector('.modal__step[data-step="manufacturer"]')
  }

}

class ModelItem {

  constructor(model) {
    this._model = model
  }

  render(node) {
    const wrapper = document.createElement('div')

    wrapper.innerHTML =
        `<div class="modal__model">
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
        `
    this._node = wrapper.lastElementChild

    const carImageName = `${this._model.manufacturer.toLowerCase()}_${this._model.caseName.toUpperCase()}.jpg`
    const carImage = new Image()
    carImage.src = `/images/car-find/${carImageName}`
    carImage.onerror = () => { carImage.src = "/images/car-find/default.jpg" }
    carImage.alt = `${this._model.name}`
    carImage.classList.add('car-card__img')
    this._node.querySelector('div.car-card__pict').append(carImage)
    node.append(this._node)
  }

  get yearFrom() {
    return +this._model.yearFrom
  }

  get yearTill() {
    return +this._model.yearTill
  }

  hide() {
    this._node.classList.add('is-hidden')
  }

  show() {
    this._node.classList.remove('is-hidden')
  }
}


class SelectCarWizardStepModel extends SelectCarWizardStep {

  constructor(node) {
    super();
    this._server = new ServerData()
    this._indicatorNode = node.querySelector('.modal__step[data-step="model"]')
    this._node = node.querySelector('#modal-tab_02')
    this._modelListNode = this._node.querySelector('.modal__models')
  }

  async renderModels(manufacturer) {
    let yearMin = Infinity, yearMax = - Infinity;
    const models = await this._server.getVehiclesByManufacturer(manufacturer)
    this._models = models.map(model => new ModelItem(model))

    this._models.forEach(modelItem => {
      modelItem.render(this._modelListNode)
      yearMin = Math.min(modelItem.yearFrom, modelItem.yearTill || (new Date()).getFullYear(), yearMin)
      yearMax = Math.max(modelItem.yearFrom, modelItem.yearTill || (new Date()).getFullYear(), yearMax)
    })
    this.initYearSelector(yearMin, yearMax)
  }

  initYearSelector(minYear, maxYear) {
    const selectorNode = document.querySelector('#modal__selector')
    let wrapper = document.createElement('div')
    wrapper.innerHTML = `
        <div class="selector modal__selector">
            <input value="0" type="hidden">
            <div class="selector__val" data-val="0">Выбрать год</div>
            <div class="selector__drop selector__years"></div>
        </div>`
    let currentYear = Math.trunc(minYear / 10) * 10

    while (currentYear <= maxYear) {
      const newDecYearWrapper = document.createElement('div')
      if (currentYear % 10 === 0) {
        newDecYearWrapper.innerHTML = `
            <div class="selector__years-col">
                <div class="selector__years-title">${currentYear}e</div>
                <ul class="selector__list selector__years-list">
                </ul>
            </div>`
        for (let i = 0; i < 10 && currentYear <=maxYear; i++, currentYear++) {
          const yearListItemWrapper = document.createElement('div')
          yearListItemWrapper.innerHTML = `<li data-val="${currentYear}">${currentYear}</li>`
          newDecYearWrapper.firstElementChild.lastElementChild.append(yearListItemWrapper.firstElementChild)
        }
      }
      wrapper.firstElementChild.lastElementChild.append(newDecYearWrapper.firstElementChild)
    }
    console.log(wrapper);

    selectorNode.append(wrapper.firstElementChild)

    this._yearSelector = new Selector(selectorNode.firstElementChild)
    this._yearSelector.onChange = ()=> {
      this.filterModelsByYear(+this._yearSelector.currentSelect.value);
    }
  }

  clear() {
    while (this._modelListNode.firstChild) {
      this._modelListNode.removeChild(this._modelListNode.firstChild)
    }

    this._yearSelector.clear()
  }

  filterModelsByYear(year) {
    for (const model of this._models) {
      if(model.yearFrom <= year && (year <= model.yearTill || !model.yearTill)) {
        model.show()
      } else {
        model.hide()
      }
    }
  }

}


export default SelectCarWizard