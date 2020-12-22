import CalcItem from './CalcItem';
import Dinero from 'dinero.js/src/dinero';

class Part extends CalcItem {
  constructor(item, parent=undefined) {
    super(item);
    this._parent = parent
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
    return this.isSelected ? this.price.multiply(+this._item.count) : Dinero({amount:0});
  }

  set isSelected(value) {
    super.isSelected = value;
    if (this._parent && value) {
      if (!this._parent.isSelected) this._parent.isSelected = true
    }
    this.onChange();
  }

  get isSelected() {
    return super.isSelected
  }

  get isDisabled() {
    return this._node.disabled
  }

  set isDisabled(value) {
    this._node.disabled = value;
  }

}

export default Part;
