import $ from 'jquery'
import 'slick-carousel'

class SelectCarWizard {

  steps = []

  constructor(node) {
    this.steps[0] = new  SelectCarWizardStepManufacturer(node)
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
  }
}


class SelectCarWizardStep {

  _selectedContent = {}
  _indicatorNode = undefined
  _node = undefined

  setActive(entity) {
    this._indicatorNode.classList.toggle('is-active', entity === this)
    this._node.classList.toggle('is-active', entity === this)
    if (this.isActive) this._indicatorNode.classList.remove('is-complete')
  }

  setComplete(test) {
    this._indicatorNode.classList.toggle('is-complete', test)
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
    this._indicatorNode = node.querySelector('.modal__step[data-step="Manufacturer"]')
    this._node = node.querySelector('#modal-tab_01')
  }

}


export default SelectCarWizard
