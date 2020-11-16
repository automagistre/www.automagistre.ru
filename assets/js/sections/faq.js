import {initTabs, mobChecker} from "../lib";
import {SubscribeForm} from '../ui/forms';
import PerfectScrollbar from 'perfect-scrollbar';

const faqSec = () => {
  const $form  = document.querySelector('section.sec-faq')
                         .querySelector('.sec-faq__form');
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
  new SubscribeForm($form);
};

export default faqSec;

