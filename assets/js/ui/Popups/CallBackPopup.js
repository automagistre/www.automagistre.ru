import Popup from './Popup';
import { SubscribeForm } from '../forms';
import ServerDataSender from '../../helpers/server-data-sender';
import SuccessFeedBackPopup from './SuccessFeedBackPopup';
import ErrorFeedBackPopup from './ErrorFeedBackPopup';

class CallBackPopup extends Popup {
  renderPopupBody() {
    return `<h4 class="popup__title">Укажите ваш номер телефона</h4>
            <div class="popup-order">
              <div class="popup-order__lead">
                <form class="subscribe callback__form" data-form-type="call">
                  <input class="subscribe__numb_alone" type="tel" data-type="phone" data-required="true" placeholder="Телефон">
                  <div class="subscribe__agree">
                  <label class="subscribe__check">
                      <input class="js-license" data-type="license" data-required="true" type="checkbox" checked><span></span>
                  </label>
                  <div class="subscribe__hint"><span>Я принимаю условия передачи информации и условия политики конфиденциальности</span></div>
                  </div>
                  <a class="btn subscribe__btn sp-ex-right" data-type="submit">
                    <span>Отправить</span>
                    <span class="sp sp-ring sp-spin"></span>
                    <i class="btn__icon-rt icon_arrow-rt"></i>
                  </a>
                </form>
              </div>
              <div class="popup-order__lead">
                 В ближайшее время с вами свяжется наш менеджер <br> для уточнения заявки
              </div>
            </div>`;
  }

  onOpen() {
    const formNode = this._node.querySelector('form.subscribe');
    const scheduleForm = new SubscribeForm(formNode, formNode.dataset.formType || 'call');
    const dataSender = new ServerDataSender();
    const selfForm = this;
    dataSender.onSuccess = () => {
      selfForm.onClose((new SuccessFeedBackPopup('Мы получили ваше пожелание')).open());
      selfForm.close();
      scheduleForm.clear();
    };
    dataSender.onError = () => {
      selfForm.onClose((new ErrorFeedBackPopup('Ошибка соединения, повторите попытку')).open());
      selfForm.close();
    };
    formNode.querySelector('a[data-type="submit"]').addEventListener('click', async () => {
      if (scheduleForm.isValid) {
        await dataSender.sendForm(scheduleForm);
      } else {
        scheduleForm.showInvalidInputs();
      }
    });
  }
}

export default CallBackPopup;
