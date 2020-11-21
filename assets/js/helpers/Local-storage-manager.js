class LocalStorageManager {

  set manufacturer(manufacturer) {
    this.caseName
    localStorage.setItem('manufacturer', manufacturer)
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
