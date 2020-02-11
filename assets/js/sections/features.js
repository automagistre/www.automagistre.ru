import {mobChecker, startParallax} from "../lib";
import TweenLite from "gsap/TweenLite";
import CSSPlugin from "gsap/TweenMax"

const features = document.querySelector('#sec-features-back');

const featuresParr = () => {
    const SEC_FEAT = {
        ltMin: document.querySelector('.sec-features__lt-img_min'),
        ltBig: document.querySelector('.sec-features__lt-img_big'),
        ltBlur: document.querySelector('.sec-features__lt-img_blur'),
        rtMin: document.querySelector('.sec-features__rt-img_min'),
        rtBig: document.querySelector('.sec-features__rt-img_big'),
        rtBlur: document.querySelector('.sec-features__rt-img_blur'),
    };

    let thisOffset = startParallax(features);
    if (thisOffset) {
        TweenLite.to(SEC_FEAT.ltMin,  2, {y: thisOffset / 8, force3D: true, delay: 0.1});
        TweenLite.to(SEC_FEAT.ltBig,  2, {y: thisOffset / 5, force3D: true, delay: 0.1});
        TweenLite.to(SEC_FEAT.ltBlur, 2, {y: thisOffset / 2, force3D: true, delay: 0.1});
        TweenLite.to(SEC_FEAT.rtMin,  2, {y: thisOffset / 7, force3D: true, delay: 0.1});
        TweenLite.to(SEC_FEAT.rtBig,  2, {y: thisOffset / 3, force3D: true, delay: 0.1});
        TweenLite.to(SEC_FEAT.rtBlur, 2, {y: thisOffset / 2, force3D: true, delay: 0.1});
    }

};

if (!mobChecker(1024) && features) {
    document.addEventListener('scroll', featuresParr)
}
