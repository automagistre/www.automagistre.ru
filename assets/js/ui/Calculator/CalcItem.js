class CalcItem {

  constructor(item) {
    this._item = item;
    this._selected = true;
  }

  get name() {
    return this._item.name || '';
  }

  get note() {
    return this._item.note || '';
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

  onChange() {}
}

export default CalcItem;
