import {nodesObserver, odometer} from '../lib';
import Zooming from "zooming";


const gallerySec = () => {
    const zooming = new Zooming({
        'bgOpacity': 0.85,
        'scaleBase': 0.6,
    });
    nodesObserver(document.querySelectorAll('section.sec-gallery'),
        () => {
            zooming.listen('.sec-gallery__img');
        })
    odometer(document.querySelector('.sec-gallery__facts'));
};

export default gallerySec;
