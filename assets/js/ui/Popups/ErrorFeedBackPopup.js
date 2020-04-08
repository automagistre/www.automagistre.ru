import Popup from './Popup';

class ErrorFeedBackPopup extends Popup{

  _message= '';

  constructor() {
    super();
  }

  set message(value) {
    this._message = value;
  }

  get message() {
    return this._message || '';
  }


  renderPopupBody() {
    return `<h4 class="popup__title">Возникла ошибка!</h4>
            <div class="popup-order">
              <div class="popup-order__lead">
                 ${this.message}
              </div>
              
              <img class="popup-order__img" src="/img/face_medved.png" alt="генеральный директор АвтоМагист">
              <div class="popup-order__note">
                  «Мы очень внимательно относимся к пожеланиям клиентов,
                  поэтому если ошибка будет повторяться, <br>
                  огромная просьба – сообщите нам —
                 <a href="mailto:info@automagistre.ru">info@automagistre.ru</a>»
              </div>
            </div>`;
  }
}

export default ErrorFeedBackPopup;
