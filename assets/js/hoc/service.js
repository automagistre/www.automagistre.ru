import '../sections/start'
import Header from '../ui/Header';
import ScrollToTop from '../ui/ScrollToTop';
import initSections from './initSections';
import animateScrollTo from 'animated-scroll-to';
import ModalSelectCar from '../ui/SelectCarModal/Modal';
import LocalStorageManager from '../helpers/Local-storage-manager';
import {BRAND_SELECTED} from '../vars/globals';

const localStorageManager = new LocalStorageManager()
const manufacturer = BRAND_SELECTED

const currentManufacturer = localStorageManager.manufacturer
if (manufacturer) {
    if (currentManufacturer.toLowerCase() !== manufacturer.toLowerCase())
        localStorageManager.removeItems(['caseID', 'caseName'])
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

if (document.querySelector('#modal')) {
    const selectCarModal = ModalSelectCar.instance
    document.querySelectorAll('.js-show-modal').forEach(item => item.addEventListener('click', ()=> selectCarModal.show(item)))
}

if (document.querySelector('aside.site-side')) {
    const asideSelectCar = document.querySelector('#site-side-select-car')
    asideSelectCar.classList.toggle('navbar__item_red', !Boolean(localStorageManager.caseName))
    asideSelectCar.classList.toggle('is-active', !Boolean(localStorageManager.caseName))
}
