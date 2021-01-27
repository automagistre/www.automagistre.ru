class Equipment {
  _node = undefined;

  constructor(equipment) {
    this._equipment = equipment;
  }

  get id() {
    return this._equipment.id;
  }

  get name() {
    return this._equipment.name || '';
  }

  set name(value) {
    throw new Error(`Read only property "name". Can\`t set value:${value}`);
  }

  get range() {
    return this._equipment.mileageRepeat;
  }

  set range(value) {
    throw new Error(`Read only property "range". Can\`t set value:${value}`);
  }

  get works() {
    return this._equipment.works;
  }

  set works(value) {
    throw new Error(`Read only property "works". Can\`t set value:${value}`);
  }

  get node() {
    if (this._node) {
      return this._node;
    }
    throw new Error('Node element is undefined');
  }

  set node(value) {
    throw new Error(`Read only property "works". Can\`t set value:${value}`);
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `<label class="cg-set__radio">
                                <input type="radio" name="equipment" value="${this.id}">
                                <span>${this.name}</span>
                        </label>`;
    this._node = wrapper.querySelector('input');
    this._node.addEventListener('click', () => this.onClick());
    return wrapper.firstChild;
  }

  onClick() { }
}

export default Equipment;
