import CalcItem from './CalcItem';

class Work extends CalcItem {
  _parts = [];
  constructor(item) {
    super(item);
  }

  get id() {
    return this._item.id || ''
  }

  get note() {
    return null
  }

  get type() {
    return this._item.type || '';
  }

  get parts() {
    return this._parts;
  }

  addPart(part) {
    this._parts.push(part);
  }

  set isSelected(status) {
    super.isSelected = status;
    this._parts.forEach(part => {
      part.isSelected = status;
    });
    this.onChange();
  }

  get isSelected() {
    return super.isSelected
  }

  get totalPrice() {
    return this.isSelected ? +this._item.price : 0;
  }
}

export default Work;
