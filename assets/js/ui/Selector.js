class SelectorItem {

  constructor(node) {
    this._value = node.dataset.val
    this._name = node.innerHTML
    node.addEventListener('click', ()=> this.onSelect(this))
  }

  get value() {
    return this._value
  }

  get name() {
    return this._name
  }

  onSelect() { }

}


class Selector {

  _node = undefined
  _currentSelect = undefined

  constructor(node) {
    this._node = node
    this._listNodes = node.querySelectorAll('.selector__list')
    this._statusNode = node.querySelector('.selector__val')
    this._inputNode = node.querySelector('input')
    this._defaultVal = {
      text: this._statusNode.innerText,
      value: this._statusNode.dataset.val
    }
    this._statusNode.addEventListener('click', ()=> this.show())
    this._initList()
  }

  show() {
    this._node.classList.add('show-list')
  }

  close() {
    this._node.classList.remove('show-list')
  }

  get currentSelect() {
    return this._currentSelect
  }

  clear() {
    this._currentSelect = undefined
    this._inputNode.value = ''
    this._statusNode.dataset.val = this._defaultVal.value
    this._statusNode.innerText = this._defaultVal.text
  }

  destroy() {
    this._node.remove()
  }

  _initList() {
    this._listNodes.forEach( listNode => {
      for (const itemNode of listNode.querySelectorAll('li')) {
        const selectorItem = new SelectorItem(itemNode)
        selectorItem.onSelect = () => this._selectItem(selectorItem)
      }
    })
  }

  _selectItem(item) {
    this.close()
    this._currentSelect = item;
    this._statusNode.innerText = item.name
    this._inputNode.value = this._statusNode.dataset.val = item.value
    this.onChange()
  }

  onChange() {

  }

}


export default Selector
