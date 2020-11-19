import CalculatorSteps from './CalculatorSteps';
import {CalculatorForm} from '../forms';

class calculatorThirdStep extends CalculatorSteps {

  _totalPrice = 0;

  constructor(node) {
    super(node);
    const inputNode = node.querySelector('#cg-order-date');
    this._form = new CalculatorForm(node, inputNode);
    this._form.onChange = () => this.onChange();
    this._totalPriceNode = node.querySelector('.cg-order__cost');
  }

  get totalPrice() {
    return this._totalPrice;
  }

  set totalPrice(value) {
    this._totalPrice = value;
    this._totalPriceNode.innerHTML = value.toString()
    .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + '<i class="icon-rub">a</i>';
  }

  get isValid() {
    return this._form.isValid;
  }

  getFormStatus() {
    const status = {}
    for (let input of this._form.inputs) {
      status[input.name] = input
    }
    return status;
  }

  showInvalidSelections() {
    const calendarUnitNode = this._node.querySelector('.js-costing_calendar_unit'),
          formUnitNode = this._node.querySelector('.js-costing_form_unit'),
          formInputs = this._form.inputs
    let isHighlightCalendar, isHighlightContacts = false
    for (let input of formInputs) {
      if (isHighlightCalendar && isHighlightContacts) break

      if (input.name === 'inline-calendar' && !input.isValid) {
        this.highlightNode(calendarUnitNode).then(() => {})
        isHighlightCalendar = true
      }

      if (isHighlightContacts) continue

      if (input.name !== 'inline-calendar' && !input.isValid) {
        this.highlightNode(formUnitNode).then(() => {})
        isHighlightContacts = true
      }
    }
  }
}

export default calculatorThirdStep;
