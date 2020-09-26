import Popup from './Popup';

class inDevPopup extends Popup{

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
    return `<h4 class="popup__title">Страница в разработке</h4>
            <div class="popup-order">
              <div class="popup-order__lead">
                 ${this.message}
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
            </div>`;
  }
}

export default inDevPopup;
