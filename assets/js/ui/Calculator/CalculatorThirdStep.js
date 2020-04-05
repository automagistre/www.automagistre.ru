import CalculatorSteps from './CalculatorSteps';
import {CalculatorForm} from '../forms';

class calculatorThirdStep extends CalculatorSteps {

  _totalPrice = 0;

  constructor(node) {
    super(node);
    const inputNode = node.querySelector('#cg-order-date');
    this._form = new CalculatorForm(node, inputNode);
    this._totalPriceNode = node.querySelector('.cg-order__cost');
  }

  get totalPrice() {
    return this._totalPrice;
  }

  set totalPrice(value) {
    this._totalPrice = value;
    this._totalPriceNode.innerHTML = value.toString()
    .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + '<i class="icon-rub">a</i>';
    this.onChange();
  }

  get isValid() {
    return this._form.isValid;
  }

  showInvalidSelections() {
    const calendarUnitNode = this._node.querySelector('.js-costing_calendar_unit'),
          formUnitNode = this._node.querySelector('.js-costing_form_unit'),
          formStatus = this._form.getInputsStatus();
    if (!formStatus['calendar'].isValid) {
      console.log(formStatus['calendar'].isValid);
      this.highlightNode(calendarUnitNode).then(() => {})
    }
    if (!formStatus['name'].isValid || !formStatus['phone'].isValid || !formStatus['license'].isValid) {
      this.highlightNode(formUnitNode).then(() => {})
    }
  }

}

export default calculatorThirdStep;
