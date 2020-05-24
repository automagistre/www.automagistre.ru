class TireService {

  _priceGroups = []

  constructor(node) {
    this._node = node

  }

  addPriceGroup(group) {
    this._priceGroups.push(group)
  }

  hide() {
    this._node.styles.display = 'none'
  }

  show() {
    this._node.styles.display = 'block'
  }

  updatePrice(tireSelector, carSelector) {
    this._priceGroups.forEach(item => item.updatePrice(tireSelector, carSelector))
  }

  render() {
    this._priceGroups.forEach(group => group.render(this._node))
  }

}

export default TireService
