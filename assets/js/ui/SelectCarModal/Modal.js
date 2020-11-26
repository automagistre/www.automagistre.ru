import SelectCarWizard from './Select-car-wizard';

let singleton = Symbol();
let singletonEnforcer = Symbol();


class ModalSelectCar {

  constructor(enforcer) {
    if (enforcer !== singletonEnforcer){
      throw "Instantiation failed: use Singleton.getInstance() instead of new.";
    }

    const node = document.querySelector('#modal')
    if (!node) return

    node.querySelector('.js-modal-close')
        .addEventListener('click', ()=> this.hide())

    this.carSeletWizard = new SelectCarWizard(node)
    this._node = node

  }

  show(first=false) {
    this._node.classList.add('is-active')
    document.body.classList.add('is-cut')
    if (!first) this.carSeletWizard.changeStep(1)
  }

  hide() {
    this._node.classList.remove('is-active')
    document.body.classList.remove('is-cut')
  }

  static get instance() {
    if (!this[singleton])
      this[singleton] = new ModalSelectCar(singletonEnforcer);
    return this[singleton];
  }

  get isInit() {
    return Boolean(this._node)
  }

}

export default ModalSelectCar
