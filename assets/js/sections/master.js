import Swiper, {Pagination, Navigation} from 'swiper';
import '../../less/2_plugins/swiper'

const secMaster = () => {
  const startSlide = Math.floor(Math.random() * Math.floor(5))
  Swiper.use([Navigation, Pagination])
  const swiper = new Swiper(document.getElementById('sec-master-slider'), {
    speed: 800,
    loop: true,
    initialSlide: startSlide,
    navigation: {
      nextEl: '.slick-next',
      prevEl: '.slick-prev',
    },
  })
}

export default secMaster;

//
// arrows: true,
//     dots: true,
//     responsive: [
//   {breakpoint: 760, settings: {arrows: false}},
// ],
// }
