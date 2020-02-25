import {odometer} from "../lib";
import Zooming from "zooming";

if (document.querySelector('section.sec-gallery')) {
    const zooming = new Zooming({
        'bgOpacity': 0.85,
        'scaleBase': 0.6,
    });
    zooming.listen('.sec-gallery__img');

    odometer('facts');
}

