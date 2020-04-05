import CalculatorSteps from './CalculatorSteps';
import {CalculatorForm} from '../forms';

class calculatorThirdStep extends CalculatorSteps {

  _totalPrice = 0;

  get totalPrice() {
    return this._totalPrice;
  }

  set totalPrice(value) {
    this._totalPrice = value;
    this._totalPriceNode.innerHTML = value.toString()
    .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + '<i class="icon-rub">a</i>'
    this.onChange();
  }

  constructor(node) {
    super(node);
    const inputNode = node.querySelector('#cg-order-date');
    this._form = new CalculatorForm(node, inputNode);
    this._totalPriceNode = node.querySelector('.cg-order__cost');
  }

  get isValid() {
    return this._form.isValid;
  }
}

export default calculatorThirdStep;
