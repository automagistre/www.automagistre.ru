import Review from '../ui/Review'
import $ from 'jquery'
import 'slick-carousel'
import ServerData from '../helpers/ServerData'


const initSlick = () => {
  const $slider = $('#sec-reviews-slider'),
        options = {
          arrows: true,
          dots: true,
          infinite: true,
          speed: 800,
          autoplay: false,
          slidesToShow: 3,
          slidesToScroll: 1,
          prevArrow: '<button type=\'button\' class=\'slick-arrow slick-prev\'></button>',
          nextArrow: '<button type=\'button\' class=\'slick-arrow slick-next\'></button>',
          responsive: [
            {breakpoint: 1100, settings: {slidesToShow: 2}},
            {breakpoint: 760, settings: {slidesToShow: 2, arrows: false}},
            {breakpoint: 540, settings: {slidesToShow: 1, arrows: false}},
          ],
        };
  if ($slider.length) {
    $slider.slick(options)
    return true
  }
  return false
}

const reviewSec = async () => {
  const secReviewNode = document.querySelector('section.sec-reviews'),
        reviewsBTN = secReviewNode.querySelector('.sec-reviews__more-btn')
  const serverData = new ServerData()
  const $reviewsNode = $('#sec-reviews-slider')
  if ($reviewsNode) {
    const {response, data: {totalCount, reviews}} = await serverData.getReviewsByPageNumber(8)
    if (response === 200) {
      if (totalCount){
        reviewsBTN.textContent = `Посмотреть более ${Math.floor(totalCount / 10) * 10} отзывов`
      }
      reviews.forEach(reviewObj => {
        const node = document.createElement('div')
        node.className = 'sec-reviews__slide'
        node.append(new Review(reviewObj).render())
        $reviewsNode.append(node)
      })
      initSlick()
    }
  }
}

export default reviewSec
