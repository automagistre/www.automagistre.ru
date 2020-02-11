import {mobChecker, startParallax} from "../lib";
import TweenLite from "gsap/TweenLite";
import CSSPlugin from "gsap/TweenMax"

const expert = document.querySelector('#sec-expert-back');
const secExpert = [
    [expert.querySelector('.sec-expert__lt-img_01'), 14],
    [expert.querySelector('.sec-expert__lt-img_02'), 12],
    [expert.querySelector('.sec-expert__lt-img_03'), 10],
    [expert.querySelector('.sec-expert__lt-img_04'), 8],
    [expert.querySelector('.sec-expert__lt-img_05'), 6],
    [expert.querySelector('.sec-expert__lt-img_06'), 4],
    [expert.querySelector('.sec-expert__lt-img_07'), 2],
    [expert.querySelector('.sec-expert__rt-img_01'), 12],
    [expert.querySelector('.sec-expert__rt-img_02'), 10],
    [expert.querySelector('.sec-expert__rt-img_03'), 8],
    [expert.querySelector('.sec-expert__rt-img_04'), 6],
    [expert.querySelector('.sec-expert__rt-img_05'), 4],
    [expert.querySelector('.sec-expert__rt-img_06'), 2],
];

const expertParr = () => {
    let thisOffset = startParallax(expert);
    if (thisOffset) {
        for (let [sprite, pos] of secExpert) {
            TweenLite.to(sprite, 2, {y: thisOffset / pos, force3D: true, delay: 0.1});
        }
    }
};

if (!mobChecker(1024) && expert) {
    document.addEventListener('scroll', expertParr);
}
