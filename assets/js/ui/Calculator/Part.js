import CalcItem from './CalcItem';

class Part extends CalcItem {
  constructor(id, item) {
    super(id, item);
  }

  get totalPrice() {
    return this.isSelected ? +this._item.count * +this._item.price : 0;
  }

  get isSelected() {
    return this._selected;
  }

  set isSelected(value) {
    super.isSelected = value;
    this.onChange();
  }

  get isDisabled() {}

  set isDisabled(value) {
    if (value) this.isSelected = false;
    this._node.disabled = value;
  }

}

export default Part;
