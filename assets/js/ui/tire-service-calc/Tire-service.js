class TireService {

  _priceGroups = []

  constructor(node) {
    this._node = node

  }

  addPriceGroup(group) {
    this._priceGroups.push(group)
  }

  hide() {
    this._node.style.display = 'none'
  }

  show() {
    this._node.style.display = 'block'
  }

  updatePrice(tireSelector, carSelector) {
    this._priceGroups.forEach(item => item.updatePrice(tireSelector, carSelector))
  }

  render() {
    this._priceGroups.forEach(group => group.render(this._node))
  }

  get totalCost() {
    let cost = 0
    for (let group of this._priceGroups) {
      cost += group.totalCost
    }
    return cost
  }

}

export default TireService
