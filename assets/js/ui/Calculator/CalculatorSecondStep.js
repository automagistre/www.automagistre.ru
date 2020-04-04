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

  onChange() {}

}

class CalculatorSecondStep {
  _works = [];
  range = undefined;

  constructor(node, equipment) {
    this.equipment = equipment;
    this.worksNode = node.querySelector('#costing-step_02_works');
    this.recommendationsNode = node.querySelector('#costing-step_02_recommendations');
    this.worksTotalNode = node.querySelector('#costing-step_02_works_total');
    this.totalNode = node.querySelector('#costing-step_02_total');
  }

  get worksPrice() {
    return this._calculateTotalsPrices('work');
  }

  set worksPrice(value) {
    throw new Error('Read only property "worksPrice". Can`t set value:' + value)
  }

  get recommendationsPrice() {
    return this._calculateTotalsPrices('recommendation');
  }

  set recommendationsPrice(value) {
    throw new Error('Read only property "recommendationsPrice". Can`t set value:' + value)
  }

  get totalPrice() {
    return this.worksPrice + this.recommendationsPrice;
  }

  set totalPrice(value) {
    throw new Error('Read only property "totalPrice". Can`t set value:' + value)
  }


  get selectedWorks() {

  }

  set selectedWorks(value) {
    throw new Error('Can not set value read only property "selectedWorks":' + value)
  }

  addWork(work) {
    this._works.push(work);
  }

  _renderItems() {
    const worksNode = this.worksNode,
          recommendationsNode = this.recommendationsNode,
          works = this.equipment.works;
    const onChange = () => this._renderTotalPrices();

    if (works) {
      for (let [workID, work] of Object.entries(works)) {
        if (this.range % work.repeat === 0){
          const isSelect = work.type === 'work',
                workEntity = new Work(workID, work);
                workEntity.onChange = onChange;

          const parent = workEntity.type === 'work' ? worksNode : recommendationsNode,
                workNode = workEntity.render();

          workEntity.isSelected = isSelect;
          this.addWork(workEntity);
          parent.append(workNode);

          if (work.parts) {
            const partsNode =  document.createElement('ul');
            partsNode.className = 'cg-price__list';

            for (let [partID, part] of Object.entries(work.parts)){
              const partEntity = new Part(partID, part);
              partEntity.onChange = onChange;

              const partNode = partEntity.render();
              partEntity.isSelected = isSelect;
              workEntity.addPart(partEntity);
              partsNode.append(partNode);
            }
            workNode.append(partsNode);
          }
        }
      }
    }
    this._renderTotalPrices();
  }

  onChange() {}

  _calculateTotalsPrices(type) {
    let total = 0;
    for (let work of this._works.filter( work => work.type === type)) {
      total += work.totalPrice;
      total += work.parts.reduce((acc, part) => acc + part.totalPrice, 0)
    }
    return total;
  }

  _renderTotalPrices() {
    const worksNode = this.worksTotalNode,
          recommendationsNode = this.totalNode;
    worksNode.innerHTML =
        `${this.worksPrice}<i class="icon-rub">a</i></div>`;
    recommendationsNode.innerHTML =
        `${this.totalPrice}<i class="icon-rub">a</i></div>`;
  }

  render (equipment, range) {
    this.equipment = equipment;
    this.range = range;
    this._renderItems()
  }

  clear () {
    const worksNode = this.worksNode,
          recommendationsNode = this.recommendationsNode;
    while (worksNode.firstChild) {
      worksNode.removeChild(worksNode.firstChild)
    }
    while (recommendationsNode.firstChild) {
      recommendationsNode.removeChild(recommendationsNode.firstChild)
    }
    this.equipment = undefined;
    this._works = [];
    this._renderTotalPrices();
  }
}

export default CalculatorSecondStep;
