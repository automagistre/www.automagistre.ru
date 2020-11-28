import './hoc/service'
import {mobChecker} from "./lib";
import ServerData from './helpers/ServerData';
import inDevPopup from './ui/Popups/InDevPopup';

const BODY = document.body;

let isMobileView;

if ('loading' in HTMLImageElement.prototype) {
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        img.src = img.dataset.src
    })
} else {
    require.ensure([], require => {
        require('lazysizes')
    })
}

isMobileView = mobChecker(1024);

setTimeout(function() {
    BODY.classList.remove('no-start-animations');
}, 500);


document.querySelectorAll('.js-in-dev').forEach(link => {
    link.addEventListener('click', e =>{
        e.preventDefault()
        const popup = new inDevPopup()
        popup.message = 'Мы работаем над новым функционалом, в скором времени все заработает'
        popup.open()
    })
})
