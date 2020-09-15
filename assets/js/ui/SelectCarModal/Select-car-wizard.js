import $ from 'jquery'
import 'slick-carousel'
import ServerData from '../../helpers/ServerData';

class SelectCarWizard {

  steps = []

  constructor(node) {
    this.steps[0] = new SelectCarWizardStepManufacturer(node)
    this.steps[1] = new SelectCarWizardStepModel(node)
    this.steps[1].init()
    this.steps[0].setActive(this.steps[0])
    node.querySelectorAll('.js-select-manufacturer').forEach( node=> {
      node.addEventListener('click', ()=> this.changeStep(1))
    })


  }

  changeStep(num) {
    for (let i = 0; i < this.steps.length; i++) {
      this.steps[i].setComplete(i < num)
      this.steps[i].setActive(this.steps[num])
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

    this.$slider = $('#select-car-slider').slick(options)

    document.querySelectorAll('.js-set-start-slide').forEach(btnNode => {
      const sliderToGo = btnNode.dataset.slide || 0;
      const manufacturer = btnNode.dataset.content;
      btnNode.addEventListener('click', ()=> {
        this.$slider.slick('slickGoTo', sliderToGo, false)
        this._selectedContent.manufacturer = manufacturer
      })
    })
    this._indicatorNode = node.querySelector('.modal__step[data-step="manufacturer"]')
    this._node = node.querySelector('#modal-tab_01')
  }

}

class ModelItem {

  constructor(model) {
    this._model = model
  }

  render(node) {
    const wrapper = document.createElement('div')
    const carImage = `${this._model.manufacturer.toLowerCase()}_${this._model.caseName.toUpperCase()}.jpg`
    wrapper.innerHTML =
        `<div class="modal__model">
            <div class="car-card">
                <h4 class="car-card__title">${this._model.name}</h4>
                <div class="car-card__pict">
                    <img class="car-card__img" src="/images/car-find/${carImage}" alt="${this._model.name}">
                </div>
                <div class="car-card__info">
                    <div class="car-card__code">${this._model.caseName}</div>
                    <div class="car-card__year">${this._model.yearFrom} - ${this._model.yearTill || 'н.в'}</div>
                </div>
                <a class="car-card__link js-car-card" role="button"></a>
            </div>
         </div>
        `
    this._node = wrapper.lastElementChild
    node.append(this._node)
  }

}


class SelectCarWizardStepModel extends SelectCarWizardStep {

  constructor(node) {
    super();
    this._server = new ServerData()
    this._indicatorNode = node.querySelector('.modal__step[data-step="model"]')
    this._node = node.querySelector('#modal-tab_02')
  }

  async init() {
    const models = await this._server.getVehiclesByManufacturer('Nissan')
    const modelItem = models.map(model => new ModelItem(model))
    const nodeForAppend = this._node.querySelector('.modal__models')
    modelItem.forEach(modelItem => modelItem.render(nodeForAppend))
  }

}


export default SelectCarWizard
