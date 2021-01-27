import Dinero from 'dinero.js/src/dinero';

class TireService {
  _priceGroups = []

  constructor(node) {
    this._node = node;
  }

  addPriceGroup(group) {
    this._priceGroups.push(group);
  }

  hide() {
    this._node.style.display = 'none';
  }

  show() {
    this._node.style.display = 'block';
  }

  updatePrice(tireSelector, carSelector) {
    this._priceGroups.forEach((item) => item.updatePrice(tireSelector, carSelector));
  }

  render() {
    this._priceGroups.forEach((group) => group.render(this._node));
  }

  get totalCost() {
    let cost = Dinero({ amount: 0 });
    for (const group of this._priceGroups) {
      cost = cost.add(group.totalCost);
    }
    return cost;
  }

  getSelected() {
    const selectedItems = [];
    for (const group of this._priceGroups) {
      for (const item of group.items) {
        if (item.isChecked) {
          selectedItems.push(item);
        }
      }
    }
    return selectedItems;
  }
}

export default TireService;
