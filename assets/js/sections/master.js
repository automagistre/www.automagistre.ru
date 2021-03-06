import Swiper, { Pagination, Navigation } from 'swiper';

const secMaster = () => {
  const startSlide = Math.floor(Math.random() * Math.floor(5));
  Swiper.use([Navigation, Pagination]);

  const checkArrow = (swiperNode) => {
    const swiperPrev = swiperNode.querySelector('.slick-prev');
    const swiperNext = swiperNode.querySelector('.slick-next');

    swiperNext.classList.toggle('is-hidden', window.innerWidth <= 760);
    swiperPrev.classList.toggle('is-hidden', window.innerWidth <= 760);
  };
  const swiperNode = document.getElementById('sec-master-slider');
  new Swiper(swiperNode, {
    speed: 800,
    loop: true,
    initialSlide: startSlide,
    navigation: {
      nextEl: '.slick-next',
      prevEl: '.slick-prev',
      hiddenClass: 'is-hidden',
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    on: {
      init: () => checkArrow(swiperNode),
      resize: () => checkArrow(swiperNode),
    },
  });
};

export default secMaster;
