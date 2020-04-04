import CalcItem from './CalcItem';

class Work extends CalcItem {
  _parts = [];
  constructor(id, item) {
    super(id, item);
  }

  get type() {
    return this._item.type || '';
  }

  set type(value) {
    throw new Error('Read only property "type". Can`t set value:' + value)
  }

  get parts() {
    return this._parts;
  }

  set parts(value) {
    throw new Error('Read only property "parts". Can`t set value:' + value)
  }

  addPart(part) {
    this._parts.push(part);
  }

  set isSelected(status) {
    super.isSelected = status;
    this._parts.forEach(part => {
      part.isSelected = status;
      part.isDisabled = !status;
    });
    this.onChange();
  }

  get isSelected() {
    return this._selected;
  }

  get totalPrice() {
    return this.isSelected ? +this._item.price : 0;
  }


  onChange() {}
}

export default Work;
