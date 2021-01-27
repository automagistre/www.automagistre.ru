import { nodesObserver, initParallaxAnimation } from '../lib';

const featuresSec = () => {
  const featuresSecNode = document.querySelector('#sec-features-back');
  const parallaxImages = [
    {
      node: featuresSecNode.querySelector('.sec-features__lt-img_min'),
      img: 'lt-img_min.png',
      position: 8,
    },
    {
      node: featuresSecNode.querySelector('.sec-features__lt-img_big'),
      img: 'lt-img_big.png',
      position: 5,
    },
    {
      node: featuresSecNode.querySelector('.sec-features__lt-img_blur'),
      img: 'lt-img_blur.png',
      position: 2,
    },
    {
      node: featuresSecNode.querySelector('.sec-features__rt-img_min'),
      img: 'rt-img_min.png',
      position: 7,
    },
    {
      node: featuresSecNode.querySelector('.sec-features__rt-img_big'),
      img: 'rt-img_big.png',
      position: 3,
    },
    {
      node: featuresSecNode.querySelector('.sec-features__rt-img_blur'),
      img: 'rt-img_blur.png',
      position: 2,
    },
  ];
  const imgPromises = [];
  nodesObserver([featuresSecNode], () => {
    for (const img of parallaxImages) {
      imgPromises.push(import(/* webpackPrefetch: true */ `../../img/sec-features/${img.img}`).then((res) => {
        img.node.src = res.default;
      }));
    }
    Promise.all(imgPromises).then(() => {
      initParallaxAnimation(featuresSecNode, parallaxImages);
    });
  });
};

export default featuresSec;
