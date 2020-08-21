import './hoc/service'
import {mobChecker} from "./lib";
import ServerData from './helpers/ServerData';

const BODY = document.body;

let isMobileView;

isMobileView = mobChecker(1024);

setTimeout(function() {
    BODY.classList.remove('no-start-animations');
}, 500);
