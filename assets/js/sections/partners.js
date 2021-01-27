import Swiper, { Pagination, Navigation, Autoplay } from 'swiper';
import { nodesObserver } from '../lib';

const initPartnersSec = (secNode) => {
  Swiper.use([Navigation, Pagination, Autoplay]);

  const checkArrow = (btns) => {
    for (const btn of btns) {
      btn.classList.toggle('is-hidden', window.innerWidth <= 1024);
    }
  };

  const swiperNode = secNode.querySelector('.js-partners-swiper');

  const prevBtn = secNode.querySelector('.slick-prev');
  const nextBtn = secNode.querySelector('.slick-next');

  const swiper = new Swiper(swiperNode, {
    speed: 800,
    loop: true,
    slidesPerView: 'auto',
    centeredSlides: true,
    roundLengths: true,
    autoplay: {
      delay: 2000,
    },
    navigation: {
      nextEl: nextBtn,
      prevEl: prevBtn,
      hiddenClass: 'is-hidden',
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    on: {
      init: () => checkArrow([prevBtn, nextBtn]),
      resize: () => checkArrow([prevBtn, nextBtn]),
    },
  });
  swiper.autoplay.stop();

  nodesObserver([secNode], () => swiper.autoplay.start());
};

const partnersSec = () => {
  const secNodes = document.querySelectorAll('section.sec-partners');
  secNodes.forEach((secNode) => initPartnersSec(secNode));
};

export default partnersSec;
