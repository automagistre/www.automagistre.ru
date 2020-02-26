import {mobChecker, startParallax} from "../lib";
import TweenMax from "gsap/TweenMax";

const initParallaxAnimation = () => {
    const features = document.querySelector('#sec-features-back');
    if (!mobChecker(1024) && features) {
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
                    TweenMax.to(sprite,  2, {y: thisOffset / pos, force3D: true, delay: 0.1});
                }
            }
        };
        document.addEventListener('scroll', featuresParr)
    } else {
        throw new Error('Failed init parallax in sec-features')
    }
};

const featuresSec = () => {
    initParallaxAnimation();
};

export default featuresSec;
