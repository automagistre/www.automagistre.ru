import $ from 'jquery'
import 'slick-carousel'
import '../../less/user-content'
import '../../less/4_sections/sec_announces'
import '../../less/5_pages/page_article'


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
}

export default articlePage
