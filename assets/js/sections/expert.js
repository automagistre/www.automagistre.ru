import Swiper, { Navigation } from 'swiper';
import { initParallaxAnimation, nodesObserver } from '../lib';
import VideoPopup from '../ui/Popups/VideoPopup';

const initSlider = (node) => {
  Swiper.use([Navigation]);
  const nextArrow = node.querySelector('.slick-next');
  const prevArrow = node.querySelector('.slick-prev');

  const secExpertSliderNode = node.querySelector('#sec-expert-slider');

  const swiper = new Swiper(secExpertSliderNode, {
    speed: 800,
    navigation: {
      prevEl: prevArrow,
      nextEl: nextArrow,
      disabledClass: 'is-disable',
    },
  });

  node.querySelectorAll('.js-expert-btn').forEach((btn) => btn.addEventListener('click', (event) => swiper.slideTo(+event.currentTarget.dataset.num)));

  node.querySelectorAll('.js-expert-video')
    .forEach((videoBtn) => videoBtn.addEventListener('click', (event) => {
      const videoPopup = new VideoPopup(event.currentTarget.dataset.videoId);
      videoPopup.open();
    }));
};

const expertSec = () => {
  const expertBackNode = document.querySelector('#sec-expert-back');
  const expertSecNode = document.querySelector('section.sec-expert');
  const expertBackImages = [
    {
      node: expertBackNode.querySelector('.sec-expert__lt-img_01'),
      img: 'lt-img_01.png',
      position: 14,
    },
    {
      node: expertBackNode.querySelector('.sec-expert__lt-img_02'),
      img: 'lt-img_02.png',
      position: 12,
    },
    {
      node: expertBackNode.querySelector('.sec-expert__lt-img_03'),
      img: 'lt-img_03.png',
      position: 10,
    },
    {
      node: expertBackNode.querySelector('.sec-expert__lt-img_04'),
      img: 'lt-img_04.png',
      position: 8,
    },
    {
      node: expertBackNode.querySelector('.sec-expert__lt-img_05'),
      img: 'lt-img_05.png',
      position: 6,
    },
    {
      node: expertBackNode.querySelector('.sec-expert__lt-img_06'),
      img: 'lt-img_06.png',
      position: 4,
    },
    {
      node: expertBackNode.querySelector('.sec-expert__lt-img_07'),
      img: 'lt-img_07.png',
      position: 2,
    },
    {
      node: expertBackNode.querySelector('.sec-expert__rt-img_01'),
      img: 'rt-img_01.png',
      position: 12,
    },
    {
      node: expertBackNode.querySelector('.sec-expert__rt-img_02'),
      img: 'rt-img_02.png',
      position: 10,
    },
    {
      node: expertBackNode.querySelector('.sec-expert__rt-img_03'),
      img: 'rt-img_03.png',
      position: 8,
    },
    {
      node: expertBackNode.querySelector('.sec-expert__rt-img_04'),
      img: 'rt-img_04.png',
      position: 6,
    },
    {
      node: expertBackNode.querySelector('.sec-expert__rt-img_05'),
      img: 'rt-img_05.png',
      position: 4,
    },
    {
      node: expertBackNode.querySelector('.sec-expert__rt-img_06'),
      img: 'rt-img_06.png',
      position: 2,
    },
  ];
  const imgPromises = [];

  nodesObserver([expertBackNode], () => {
    for (const img of expertBackImages) {
      imgPromises.push(import(/* webpackPrefetch: true */ `../../img/sec-expert/${img.img}`).then((res) => {
        img.node.src = res.default;
      }));
    }
    Promise.all(imgPromises).then(() => { initParallaxAnimation(expertBackNode, expertBackImages); });
  });
  initSlider(expertSecNode);
};

export default expertSec;
