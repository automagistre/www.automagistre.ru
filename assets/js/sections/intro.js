import {SubscribeForm} from '../ui/forms';
import ServerDataSender from '../helpers/server-data-sender';
import SuccessFeedBackPopup from '../ui/Popups/SuccessFeedBackPopup';
import ErrorFeedBackPopup from '../ui/Popups/ErrorFeedBackPopup';

const introSec = () => {
  const formNode  = document.querySelector('section.sec-intro')
  .querySelector('.sec-intro__form');

  if (!formNode) return

  const scheduleForm = new SubscribeForm(formNode, formNode.dataset.formType || 'schedule');
  const dataSender = new ServerDataSender()
  dataSender.onSuccess = () => {
    (new SuccessFeedBackPopup('Мы уже обрабатываем вашу заявку.')).open()
  }
  dataSender.onError = () => {
    (new ErrorFeedBackPopup('Ошибка соединения, повторите попытку')).open()
  }
  formNode.querySelector('a[data-type="submit"]').addEventListener('click', async ()=>{
    if (scheduleForm.isValid) await dataSender.sendForm(scheduleForm)
  })
}

export default introSec
