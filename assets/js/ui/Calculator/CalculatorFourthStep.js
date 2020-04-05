import CalculatorSteps from './CalculatorSteps';

class CalculatorFourthStep extends CalculatorSteps {

  constructor(node) {
    super();
    this._cgStatusNameNode = node.querySelector('.js-cg-status__name');
    this._cgStatusCarNode = node.querySelector('.js-cg-status__car');
    this._cgStatusDateNode = node.querySelector('.js-cg-status__date');
    this._cgStatusTotalNode = node.querySelector('.js-cg-status__total');
  }

  set car(value) {
    this._car = value;
    this._cgStatusCarNode.innerHTML = value;
  }

  get car() {
    return this._car
  }

  set name(value) {
    this._name = value;
    this._cgStatusNameNode.innerHTML = value;
  }

  get name() {
    return this._name
  }

  set date(value) {
    this._date = value;
    this._cgStatusDateNode.innerHTML = value;
  }

  get date() {
    return this._date
  }

  set totalPrice(value) {
    this._totalPrice = value;
    this._cgStatusTotalNode.innerHTML = value;
  }

  get totalPrice() {
    return this._totalPrice
  }

  clear() {
    this.car = '';
    this.name = '';
    this.date = '';
    this.total = '';
  }

}

export  default CalculatorFourthStep;
