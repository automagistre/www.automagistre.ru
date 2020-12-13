import $ from 'jquery'
import 'slick-carousel'
import '../../less/user-content'
import '../../less/4_sections/sec_announces'
import '../../less/5_pages/page_article'
import 'zooming'
import Zooming from 'zooming';

const articlePage = () => {
  $('.js-ucs-gallery').slick({
    arrows: true,
    dots: false,
    infinite: true,
    speed: 800,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: '<button type=\'button\' class=\'slick-arrow slick-prev\'></button>',
    nextArrow: '<button type=\'button\' class=\'slick-arrow slick-next\'></button>',
  })

  const zooming = new Zooming({
    'bgOpacity': 0.85,
    'scaleBase': 0.6,
  });

  document.querySelectorAll('[data-action="zoom"]').forEach(pic => {
    zooming.listen(pic)
  })
}

export default articlePage
