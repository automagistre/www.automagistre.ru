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
    const modelStr = `${value.manufacture} ${value.name}(${value.model})`;
    this._car = value;
    this._cgStatusCarNode.innerHTML = modelStr;
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
    if (!value) return
    this._date = value;
    const d = new Date(value);
    const ye = new Intl.DateTimeFormat('ru', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('ru', { month: 'long' }).format(d);
    const da = new Intl.DateTimeFormat('ru', { day: '2-digit' }).format(d);

    this._cgStatusDateNode.innerHTML = `${da} ${mo} ${ye}`;
  }

  get date() {
    return this._date
  }

  set totalPrice(value) {
    this._totalPrice = value;
    this._cgStatusTotalNode.innerHTML = value.toString()
    .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + '<i class="icon-rub">a</i>';;
  }

  get totalPrice() {
    return this._totalPrice
  }

  clear() {
    this.car = '';
    this.name = '';
    this.date = new Date();
    this.total = '';
  }

}

export  default CalculatorFourthStep;
