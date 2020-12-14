import {initTabs, mobChecker} from "../lib";
import {SubscribeForm} from '../ui/forms';
import ServerDataSender from '../helpers/server-data-sender';
import SuccessFeedBackPopup from '../ui/Popups/SuccessFeedBackPopup';
import ErrorFeedBackPopup from '../ui/Popups/ErrorFeedBackPopup';


const faqSec = () => {
  const faqSecNode = document.querySelector('section.sec-faq')

  const formNode = faqSecNode.querySelector('.sec-faq__form');
  const tabs = 'sec-faq-tabs',
        body = 'sec-faq-body';
  if (mobChecker(760)) {
    new PerfectScrollbar('#sec-faq-tabs', {
      handlers: ['touch'],
      swipeEasing: true,
      maxScrollbarLength: 150,
      suppressScrollY: true
    })
  }
  initTabs(tabs, body);
  const faqForm = new SubscribeForm(formNode, 'question');
  const dataSender = new ServerDataSender()
  dataSender.onSuccess = () => {
    (new SuccessFeedBackPopup('Мы получили Ваш вопрос.')).open()
    faqForm.clear()
  }
  dataSender.onError = () => {
    (new ErrorFeedBackPopup('Ошибка соединения, повторите попытку')).open()
  }
  formNode.querySelector('a[data-type="submit"]').addEventListener('click', async ()=>{
    if (faqForm.isValid) await dataSender.sendForm(faqForm)
    else faqForm.showInvalidInputs()
  })
};

export default faqSec;

