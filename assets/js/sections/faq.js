import {initTabs} from "../lib";
import {SubscribeForm} from '../ui/forms';

const faqSec = () => {
  const $form  = document.querySelector('section.sec-faq')
                         .querySelector('.sec-faq__form');
  const tabs = 'sec-faq-tabs',
        body = 'sec-faq-body';
  initTabs(tabs, body);
  new SubscribeForm($form);
};

export default faqSec;
