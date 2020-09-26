import $ from "jquery";
import 'malihu-custom-scrollbar-plugin';
import 'jquery-scrollify'
import {mobChecker} from "../lib";
import '../sections/start'
import Header from '../ui/Header';
import ScrollToTop from '../ui/ScrollToTop';
import initSections from './initSections';
import animateScrollTo from 'animated-scroll-to';
import {SubscribeForm} from '../ui/forms';
import ModalSelectCar from '../ui/SelectCarModal/Modal';
import LocalStorageManager from '../helpers/Local-storage-manager';

const localStorageManager = new LocalStorageManager()
const manufacturer = document.location.pathname.split('/')[2]
const asideSelectCar = document.querySelector('#site-side-select-car')

if (document.location.pathname.split('/')[2]) {
    localStorageManager.manufacturer = manufacturer
}

new Header();

new ScrollToTop();


initSections();

const $forms = document.querySelectorAll('form.subscribe');
if ($forms){
    $forms.forEach( $form => new SubscribeForm($form))
}

const goToButtons = document.querySelectorAll('[data-scrollTo]');
goToButtons.forEach(btn => {
    const scrollTarget = document.querySelector(btn.dataset.scrollto);
    if (scrollTarget)
        btn.addEventListener('click', ()=>animateScrollTo(scrollTarget))
});

const $scroll_X = $('.js-scroll-x'),
      $scroll_Y = $('.js-scroll-y');

export const initScroll_X = $elem => {
    $elem.mCustomScrollbar({
        axis: 'x',
        scrollButtons: {enable: false},
        scrollbarPosition: 'outside',
        alwaysShowScrollbar: 2,
        updateOnContentResize: true,
        autoDraggerLength: false,
        mouseWheel: {enable: false},
    });
};

export const initScroll_Y = $elem => {
    $elem.mCustomScrollbar({
        axis: 'y',
        scrollButtons: {enable: false},
        scrollbarPosition: 'outside',
        alwaysShowScrollbar: 0,
        autoDraggerLength: false,
        advanced: {
            updateOnContentResize: true
        }
    });
};

$(window).on('load', ()=> {
    if ($scroll_X.length) {
        initScroll_X($scroll_X);
        $(window).resize(() => {
            $scroll_X.mCustomScrollbar('destroy');
            initScroll_X($scroll_X);
        });
    }
    if ($scroll_Y.length) initScroll_Y($scroll_Y);
    $(window).resize(() => mobChecker(1024) ? $.scrollify.disable() : $.scrollify.enable());
});

if (document.querySelector('#modal')) {
    const selectCarModal = ModalSelectCar.instance
    document.querySelectorAll('.js-show-modal').forEach(item => item.addEventListener('click', ()=> selectCarModal.show()))
}


asideSelectCar.classList.toggle('navbar__item_red', !Boolean(localStorageManager.caseName))
asideSelectCar.classList.toggle('is-active', !Boolean(localStorageManager.caseName))
