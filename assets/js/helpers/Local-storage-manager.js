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
    localStorage.getItem('caseName')
  }

}

export default LocalStorageManager
