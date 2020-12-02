import {mobChecker, nodesObserver, startParallax} from '../lib';
import TweenMax from "gsap/TweenMax";


const initParallaxAnimation = (features, images) => {
    if (!mobChecker(1024) && features) {
        const featuresParr = () => {
            let thisOffset = startParallax(features);
            if (thisOffset) {
                for( let image of images) {
                    TweenMax.to(image.node,  2, {y: thisOffset / image.position, force3D: true, delay: 0.1});
                }
            }
        };
        document.addEventListener('scroll', featuresParr)
    } else {
        throw new Error('Failed init parallax in sec-features')
    }
};

const featuresSec = () => {
    const featuresSecNode = document.querySelector('#sec-features-back');
    const parallaxImages = [
        {
            node: featuresSecNode.querySelector('.sec-features__lt-img_min'),
            img: 'lt-img_min.png',
            position: 8
        },
        {
            node: featuresSecNode.querySelector('.sec-features__lt-img_big'),
            img: 'lt-img_big.png',
            position: 5
        },
        {
            node: featuresSecNode.querySelector('.sec-features__lt-img_blur'),
            img: 'lt-img_blur.png',
            position: 2
        },
        {
            node: featuresSecNode.querySelector('.sec-features__rt-img_min'),
            img: 'rt-img_min.png',
            position: 7
        },
        {
            node: featuresSecNode.querySelector('.sec-features__rt-img_big'),
            img: 'rt-img_big.png',
            position: 3
        },
        {
            node: featuresSecNode.querySelector('.sec-features__rt-img_blur'),
            img: 'rt-img_blur.png',
            position: 2
        },
    ]
    const imgPromises = []
    for (let img of parallaxImages) {
        imgPromises.push(import(`../../img/sec-features/${img.img}`).then(res=>{
            img.node.src = res.default
        }))
    }
    Promise.all(imgPromises).then(()=>{
        nodesObserver(document.querySelectorAll('section.sec-features'), ()=> {
            initParallaxAnimation(featuresSecNode, parallaxImages);
        })
    })
}

export default featuresSec;
