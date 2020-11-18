import $ from "jquery";
import PerfectScrollbar from 'perfect-scrollbar'
import 'jquery-scrollify'
import {mobChecker} from "../lib";
import '../sections/start'
import Header from '../ui/Header';
import ScrollToTop from '../ui/ScrollToTop';
import initSections from './initSections';
import animateScrollTo from 'animated-scroll-to';
import ModalSelectCar from '../ui/SelectCarModal/Modal';
import LocalStorageManager from '../helpers/Local-storage-manager';

const localStorageManager = new LocalStorageManager()
const manufacturer = document.location.pathname.split('/')[2]


if (document.location.pathname.split('/')[2]) {
    localStorageManager.manufacturer = manufacturer
}

Header.instance;

new ScrollToTop();


initSections();

const goToButtons = document.querySelectorAll('[data-scrollTo]');
goToButtons.forEach(btn => {
    const scrollTarget = document.querySelector(btn.dataset.scrollto);
    if (scrollTarget)
        btn.addEventListener('click', ()=>animateScrollTo(scrollTarget))
});

const customScrollBarOptions = {
    handlers: ['drag-thumb', 'wheel', 'touch'],
    swipeEasing: true,
    maxScrollbarLength: 150
}

document.querySelectorAll('.js-scroll-x').forEach(el => new PerfectScrollbar(el, {
    ...customScrollBarOptions,
    suppressScrollY: true
}))
document.querySelectorAll('.js-scroll-y').forEach(el => new PerfectScrollbar(el, {
    ...customScrollBarOptions,
    suppressScrollX: true
}))

$(window).on('load', ()=> {
    $(window).resize(() => mobChecker(1024) ? $.scrollify.disable() : $.scrollify.enable());
});

if (document.querySelector('#modal')) {
    const selectCarModal = ModalSelectCar.instance
    document.querySelectorAll('.js-show-modal').forEach(item => item.addEventListener('click', ()=> selectCarModal.show()))
}

if (document.querySelector('aside.site-side')) {
    const asideSelectCar = document.querySelector('#site-side-select-car')
    asideSelectCar.classList.toggle('navbar__item_red', !Boolean(localStorageManager.caseName))
    asideSelectCar.classList.toggle('is-active', !Boolean(localStorageManager.caseName))
}
