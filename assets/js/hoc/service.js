import $ from "jquery";
import 'malihu-custom-scrollbar-plugin';
import 'jquery-scrollify'
import {mobChecker} from "../lib";
import '../sections/start'
import '../sections/features'
import '../sections/gallery'

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
    $.scrollify({
        section: '.js-sec-scroll',
        sectionName: 'section-name',
        easing: 'easeOutExpo',
        scrollSpeed: 1100,
        offset: 0,
        scrollbars: true,
        standardScrollElements: '',
        setHeights: false,
        overflowScroll: true,
        updateHash: true,
        touchScroll: true,
    });
    if (mobChecker(1024)) $.scrollify.disable();
    $(window).resize(() => mobChecker(1024) ? $.scrollify.disable() : $.scrollify.enable());
});
