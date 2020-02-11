import {mobChecker, startParallax} from "../lib";
import TweenLite from "gsap/TweenLite";
import CSSPlugin from "gsap/TweenMax"

const features = document.querySelector('#sec-features-back');
const secFeatures = [
    [features.querySelector('.sec-features__lt-img_min'), 8],
    [features.querySelector('.sec-features__lt-img_big'), 5],
    [features.querySelector('.sec-features__lt-img_blur'), 2],
    [features.querySelector('.sec-features__rt-img_min'), 7],
    [features.querySelector('.sec-features__rt-img_big'), 3],
    [features.querySelector('.sec-features__rt-img_blur'), 2],
];

const featuresParr = () => {
    let thisOffset = startParallax(features);
    if (thisOffset) {
        for( let [sprite, pos] of secFeatures) {
            TweenLite.to(sprite,  2, {y: thisOffset / pos, force3D: true, delay: 0.1});
        }
    }
};

if (!mobChecker(1024) && features) {
    document.addEventListener('scroll', featuresParr)
}

