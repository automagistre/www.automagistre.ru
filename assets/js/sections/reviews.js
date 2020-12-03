import Review from '../ui/Review'
import $ from 'jquery'
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
    const reviews10 = await serverData.getLastReviews(8)
    const reviewsCountResponse = await serverData.getCountOfReviews()
    const reviewsCount = Math.floor(reviewsCountResponse.data / 10) * 10
    if (reviews10.response !== 200) return
    reviewsBTN.textContent = `Посмотреть более ${reviewsCount} отзывов`
    reviews10.data.forEach(reviewObj => {
      const node = document.createElement('div')
      node.className = 'sec-reviews__slide'
      node.append(new Review(reviewObj).render())
      $reviewsNode.append(node)
    })
    initSlick()
  }
}

export default reviewSec
