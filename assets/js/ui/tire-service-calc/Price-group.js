import PriceItem from './Price-item';

class PriceGroup {

  _items = []

  constructor(group) {
    this._name = group.name
    this._node = this._createNode()
    this._onlyOne = group.onlyOne
    if (group.services) {
      for (const service of group.services) {
        this.addPriceItem(new PriceItem(service));
      }
    }
  }

  get name() {
    return this._name
  }

  addPriceItem(priceItem) {
    if (this._onlyOne) {
      priceItem.onSelect = () => {
        for(const item of this._items) {
          if (item !== priceItem) item.unCheck()
        }
      }
    }
    this._items.push(priceItem)
  }

  _createNode() {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = `<div class="prices_group">
                            <h2 class="sec-about__title">${this.name}</h2> 
                            <div class="prices sec-about__prices"></div>
                         </div>`
    return wrapper.firstElementChild
  }

  updatePrice(tireSelector, carSelector) {
    this._items.forEach(item => item.updatePrice(tireSelector, carSelector))
  }

  render(node) {
    const itemsNode = this._node.querySelector('.prices.sec-about__prices')
    this._items.forEach(item => item.render(itemsNode))
    node.append(this._node)
  }

}

export default PriceGroup;
