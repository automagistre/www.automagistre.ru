class CalcItem {

  constructor(id, item) {
    this.id = id;
    this._item = item;
    this._selected = true;
  }

  get name() {
    return this._item.name || '';
  }

  set name(value) {
    throw new Error('Read only property "name". Can`t set value:' + value)
  }

  get note() {
    return this._item.note || '';
  }

  set note(value) {
    throw new Error('Read only property "note". Can`t set value:' + value)
  }

  set totalPrice(value) {
    throw new Error('Read only property "totalPrice". Can`t set value:' + value)
  }

  get totalPrice() { }

  get isSelected() { }

  set isSelected(value) {
    this._selected = value;
    this._node.checked = value;
  }

  toString() {
    const count = +this._item.count,
        unit = this._item.unit || 'шт',
        totalPrice = this.totalPrice;
    return ` ${count > 1 ? count + unit + ' - ' : ''}${totalPrice}`
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML =
        `<li class="cg-price__item">
            <div class="cg-price__line">
                <label class="cg-price__check">
                  <input type="checkbox" value="${this.id}">
                  <span>${this.name}</span>
                </label>
                <div class="cg-price__cost">
                    ${this.toString()}
                    <i class="icon-rub">a</i>
                </div>
                <div class="cg-price__info">
                    <span>${this.note || ''}</span>
                </div>
            </div>
        </li>`;
    this._node = wrapper.querySelector('input');
    this._node.addEventListener('click', e => this.isSelected = e.target.checked);
    return wrapper.firstChild;
  }
}

export default CalcItem;
