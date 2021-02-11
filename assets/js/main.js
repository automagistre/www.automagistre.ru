import './hoc/service';
import Dinero from 'dinero.js/src/dinero';
import { nodesObserver } from './lib';
import inDevPopup from './ui/Popups/InDevPopup';
import initGarage from './lk/index';

initGarage();

Dinero.globalLocale = 'ru-RU';
Dinero.defaultCurrency = 'RUB';
Dinero.globalFormat = '0,0';

const BODY = document.body;

if ('loading' in HTMLImageElement.prototype) {
  document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
    img.src = img.dataset.src;
  });
} else {
  import('lazysizes');
}

const lazyLoadNodes = document.querySelectorAll('.lazy');
nodesObserver(lazyLoadNodes, (node) => node.classList.remove('lazy'));

setTimeout(() => {
  BODY.classList.remove('no-start-animations');
}, 500);

document.querySelectorAll('.js-in-dev').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const popup = new inDevPopup();
    popup.message = 'Мы работаем над новым функционалом, в скором времени все заработает';
    popup.open();
  });
});

setTimeout(() => {
  document.querySelectorAll('[loading="lazy"]').forEach((node) => node.loading = 'auto');
}, 3000);
