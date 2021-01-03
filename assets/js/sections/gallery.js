import {nodesObserver, odometer, updateOdometerData} from '../lib';
import Zooming from "zooming"


const gallerySec = () => {
    const zooming = new Zooming({
        'bgOpacity': 0.85,
        'scaleBase': 0.6,
    })
    const gallerySecNode = document.querySelectorAll('section.sec-gallery')
    nodesObserver(gallerySecNode,() => {
            zooming.listen('.sec-gallery__img');
        })
    gallerySecNode.forEach(node => {
        updateOdometerData(node).then(()=>odometer(node))
    })

}

export default gallerySec
