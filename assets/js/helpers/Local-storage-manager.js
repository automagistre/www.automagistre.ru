class LocalStorageManager {

  set manufacturer(manufacturer) {
    localStorage.setItem('manufacturer', manufacturer)
  }

  get manufacturer() {
    return localStorage.getItem('manufacturer')
  }

  set caseName(caseName) {
    localStorage.setItem('caseName', caseName)
  }

  get caseName() {
    return  localStorage.getItem('caseName')
  }

  set caseID(caseID) {
    localStorage.setItem('caseID', caseID)
  }

  get caseID() {
    return localStorage.getItem('caseID')
  }

}

export default LocalStorageManager
