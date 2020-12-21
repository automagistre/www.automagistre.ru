import Swiper, {Pagination, Navigation} from 'swiper';
import '../../less/2_plugins/swiper/swiper'
import '../../less/2_plugins/swiper/pagination'
import '../../less/4_sections/sec_announces'
import '../../less/3_blocks/block_blog-card'

const initSlickSlider = () => {
  Swiper.use([Pagination, Navigation])

  document.querySelectorAll('.js-announces-slider').forEach(node => {
    const nextArrow = node.querySelector('.slick-next'),
          prevArrow = node.querySelector('.slick-prev')
    new Swiper(node.firstElementChild, {
      speed: 800,
      navigation: {
        nextEl: nextArrow,
        prevEl: prevArrow,
        disabledClass: 'is-disable'
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
      breakpoints: {
        1024: {
          slidesPerView: 3
        },
        600: {
          slidesPerView: 2
        }
      }

    })
  })
};

const secAnnounces = () => {
  initSlickSlider()
}

export default secAnnounces;
