class Popup {

  _isOpen = false;
  _node = undefined;

  constructor() { }

  open() {
    const bodyLockPadding = window.innerWidth - document.querySelector('.site-wrapper').offsetWidth + 'px'
    this._node = this.render();
    this._node.classList.add('is-inited', 'is-active');
    document.querySelectorAll('.popup-lock').forEach(node => node.style.paddingRight = bodyLockPadding)
    document.body.classList.add('is-trimmed');
    document.body.append(this._node);
    this.initCloseActions();
    this._isOpen = true;
    this.onOpen();
  }

  close() {
    if (this._isOpen) {
      this._node.classList.remove('is-active');
      setTimeout(() => {
        this._node.classList.remove('is-inited');
      }, 300);
      setTimeout(() => {
        document.querySelectorAll('.popup-lock').forEach(node => node.style.paddingRight = 0)
        document.body.classList.remove('is-trimmed');
      }, 400);
      this._isOpen = false;
      this.onClose();
      setTimeout(()=> this._node.remove(), 500);
    }
  }

  onClose() {}

  onOpen() {}

  initCloseActions() {
    if (!this._node)  return false;

    const popup = this._node,
          closeButton = this._node.querySelector('.js-popup-close');
    popup.addEventListener('click', e => {
      if(e.target === this._node) this.close();
    });
    closeButton.addEventListener('click', ()=> this.close());
  };

  render() {
    const node = document.createElement('div');
    node.innerHTML =
        `<div class="popup">
          <div class="popup__wrap">
            <a class="popup__close js-popup-close"></a>
          <div class="popup__body">
              ${this.renderPopupBody()}
            </div>
          </div>
        </div>`;
    return node.firstElementChild;
  }

  renderPopupBody() {}

}

export default Popup
