import Zooming from 'zooming';
import { nodesObserver, odometer, updateOdometerData } from '../lib';

const gallerySec = () => {
  const zooming = new Zooming({
    bgOpacity: 0.85,
    scaleBase: 0.6,
  });
  const gallerySecNode = document.querySelectorAll('section.sec-gallery');
  nodesObserver(gallerySecNode, () => {
    zooming.listen('.sec-gallery__img');
  });
  gallerySecNode.forEach((node) => {
    updateOdometerData(node).then(() => odometer(node));
  });
};

export default gallerySec;
