class LocalStorageEventDispatcher {

  detail = {
    key: '',
    oldValue: '',
    newValue: ''
  }

  dispatch(detail) {
    this.detail = detail
    document.dispatchEvent(new CustomEvent('localDataChanged', { detail: this.detail, bubbles: true }))

  }
}

class LocalStorageManager {

  constructor() {
    this.eventDispather = new LocalStorageEventDispatcher()
  }

  set manufacturer(manufacturer) {
    localStorage.setItem('manufacturer', manufacturer)
    const detail = {
      key: 'manufacturer',
      oldValue: localStorage.getItem('manufacturer'),
      newValue: manufacturer
    }
    this.eventDispather.dispatch(detail)
  }

  get manufacturer() {
    return localStorage.getItem('manufacturer') || ''
  }

  set caseName(caseName) {
    localStorage.setItem('caseName', caseName)
  }

  get caseName() {
    return  localStorage.getItem('caseName') || ''
  }

  set caseID(caseID) {
    localStorage.setItem('caseID', caseID)
    const detail = {
      key: 'caseID',
      oldValue: localStorage.getItem('caseID'),
      newValue: caseID
    }
    this.eventDispather.dispatch(detail)
  }

  get caseID() {
    return localStorage.getItem('caseID') || ''
  }

  removeItems(items) {
    for (let item of items) {
      localStorage.removeItem(item)
    }
  }

}

export default LocalStorageManager
