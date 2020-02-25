import $ from "jquery";
import 'malihu-custom-scrollbar-plugin';
import 'jquery-scrollify'
import {mobChecker} from "../lib";
import '../sections/start'


if (document.querySelector('section.sec-start')){
    require.ensure([], require => {
        require('../sections/start').default();
    })
}

if(document.querySelector('section.sec-expert')) {
    require.ensure([], require => {
       require('../sections/expert').default();
    })
}

if(document.querySelector('section.sec-features')) {
    require.ensure([], require => {
        require('../sections/features').default();
    })
}

if (document.querySelector('section.sec-faq')){
    require.ensure([], require => {
        require('../sections/faq').default();
    })
}

if (document.querySelector('section.sec-work')){
    require.ensure([], require => {
        require('../sections/work').default();
    })
}

if (document.querySelector('section.sec-gallery')){
    require.ensure([], require => {
        require('../sections/gallery').default();
    })
}

if (document.querySelector('section.sec-map')){
    require.ensure([], require => {
        require('../sections/map').default();
    })
}

if (document.querySelector('section.sec-services')){
    require.ensure([], require => {
        require('../sections/services').default();
    })
}

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
