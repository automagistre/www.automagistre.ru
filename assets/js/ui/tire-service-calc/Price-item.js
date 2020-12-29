import PriceCalculatorFactory from './Price-calculator';
import Dinero from 'dinero.js/src/dinero'


class PriceItem {

  _name = undefined
  _price = Dinero({amount: 0})

  constructor(item) {
    this._name = item.name
    this._id = item.id
    this._calculator = PriceCalculatorFactory.getPriceCalculator(this._id)
    this._node = this._createNode()
    this._inputNode = this._node.querySelector('input')
  }

  _createNode () {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = `<div class="prices__row">
                            <div class="prices__check">
                                <label class="form__checkbox">
                                    <input type="checkbox">
                                    <span></span>
                                </label>
                            </div>
                            <div class="prices__note">${this.name}</div>
                            <div class="prices__cost">${this.price.toFormat()}<i class="icon-rub">a</i></div>
                         </div>`
    return wrapper.firstElementChild
  }

  get name() {
    return this._name
  }

  get price() {
    return this._price
  }

  get isChecked () {
    return this._inputNode.checked
  }

  set price(value) {
    this._price = value
    this._node.querySelector('.prices__cost').innerHTML = `${this.price.toFormat()}<i class="icon-rub">a</i>`
  }

  updatePrice(tireSelector, carSelector) {
    this.price = this._calculator.getPrice(tireSelector, carSelector)
  }

  render(node) {
    node.append(this._node)
    this._node.querySelector('.prices__note').addEventListener('touchstart', e => {
      e.stopPropagation()
      e.preventDefault()
      this._inputNode.checked = !this._inputNode.checked
      this.onChange()
    })
    this._inputNode.addEventListener('change', ()=> {
      this.onChange()
    })
  }

  onChange() { }

  unCheck() {
    this._inputNode.checked = false
  }
}

export default PriceItem
