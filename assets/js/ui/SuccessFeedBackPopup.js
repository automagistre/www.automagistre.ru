class SuccessFeedBackPopup {
  _isOpen = false;
  _message= '';
  _node = undefined;

  constructor() { }

  set message(value) {
    this._message = value;
  }

  get message() {
    return this._message
  }

  open() {
    this._node = this.render();
    this._node.classList.add('is-inited', 'is-active');
    document.body.classList.add('is-trimmed');
    document.body.append(this._node);
    this._addActions();
    this._isOpen = true;
  }

  async close() {
    const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));
    if (this._isOpen) {
      this._node.classList.remove('is-active');
      await  timeout(300);
      this._node.classList.remove('is-inited');
      document.body.classList.remove('is-trimmed')
      this._isOpen = false;
      await setTimeout(()=> this._node.remove(), 1000) ;
    }
  }

  _addActions() {
    if (!this._node) {
      return false;
    }
    const popup = this._node,
          closeButton = this._node.querySelector('.js-popup-close');
    popup.addEventListener('click', e => {
      if(e.target === this._node) this.close()
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
              <h4 class="popup__title">Спасибо, что выбрали нас!</h4>
              <div class="popup-order">
                <div class="popup-order__lead">
                  ${this.message}
                </div>
                <div class="popup-order__lead">
                  В ближайшее время с вами свяжется наш менеджер <br> для уточнения заказа
                </div>
                <img class="popup-order__img" src="/img/face_director.png" alt="генеральный директор АвтоМагист">
                <div class="popup-order__note">
                  «Мы очень внимательно относимся к пожеланиям и предложениям клиентов,
                  поэтому если Вы обнаружили в нашей работе какие-либо недочеты, <br>
                  или у Вас есть идеи для улучшения нашего сервиса, <br>
                  огромная просьба – сообщите нам —
                  <a href="mailto:info@automagistre.ru">info@automagistre.ru</a>»
                </div>
                <div class="popup-order__remark">
                  Кирилл Сидоров. Генеральный директор АвтоМагистр
                </div>
              </div>
            </div>
          </div>
        </div>`;
    return node.firstElementChild;
  }
}

export default SuccessFeedBackPopup;
