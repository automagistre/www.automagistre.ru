import $ from "jquery";
import 'malihu-custom-scrollbar-plugin';
import 'jquery-scrollify'
import {mobChecker} from "../lib";
import '../sections/start'
import Header from '../ui/Header';
import ScrollToTop from '../ui/ScrollToTop';
import initSections from './initSections';

new Header();
const scrollToTop = new ScrollToTop();

initSections();
scrollToTop.init();



const $scroll_X = $('.js-scroll-x'),
      $scroll_Y = $('.js-scroll-y');

const initScroll_X = $elem => {
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

const initScroll_Y = $elem => {
    $elem.mCustomScrollbar({
        axis: 'y',
        scrollButtons: {enable: false},
        scrollbarPosition: 'outside',
        alwaysShowScrollbar: 0,
        updateOnContentResize: true,
        autoDraggerLength: false,
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
