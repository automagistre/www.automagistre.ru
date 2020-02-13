import './hoc/service'
import {mobChecker} from "./lib";

const BODY = document.body;

let isMobileView;

isMobileView = mobChecker(1024);

setTimeout(function() {
    BODY.classList.remove('no-start-animations');
}, 500);
