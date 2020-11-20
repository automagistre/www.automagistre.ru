import CalcItem from './CalcItem';

class Part extends CalcItem {
  constructor(item) {
    super(item);
  }

  get id() {
    return this._item.id || ''
  }

  get manufacturer() {
    return this._item.manufacture
  }

  get note() {
    return `Производитель ${this.manufacturer}`
  }

  get count() {
    return this._item.count || 0
  }

  get totalPrice() {
    return this.isSelected ? +this._item.count * +this._item.price : 0;
  }

  set isSelected(value) {
    super.isSelected = value;
    this.onChange();
  }

  get isSelected() {
    return super.isSelected
  }

  get isDisabled() {
    return this._node.disabled
  }

  set isDisabled(value) {
    if (value) this.isSelected = false;
    this._node.disabled = value;
  }

}

export default Part;
