import Swiper, { Navigation } from 'swiper';
import '../../less/user-content';
import '../../less/4_sections/sec_announces';
import '../../less/5_pages/page_article';
import Zooming from 'zooming';
import { mobChecker } from '../lib';

const articlePage = () => {
  Swiper.use([Navigation]);

  document.querySelectorAll('.js-ucs-gallery').forEach((node) => {
    new Swiper(node, {
      loop: true,
      speed: 800,
      navigation: {
        nextEl: '.slick-next',
        prevEl: '.slick-prev',
      },
    });
  });

  if (!mobChecker(1025)) {
    const zooming = new Zooming({
      bgOpacity: 0.85,
      scaleBase: 0.6,
    });

    document.querySelectorAll('[data-action="zoom"]').forEach((pic) => {
      zooming.listen(pic);
    });
  }
};

export default articlePage;
