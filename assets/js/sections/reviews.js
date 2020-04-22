import Review from '../ui/Review';
import $ from 'jquery';
import reviews from '../ui/reviews';


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
    $slider.slick(options);
    return true
  }
  return false
};

const reviewSec = () => {
  const $reviewsNode = $('#sec-reviews-slider');
  if ($reviewsNode) {
     const reviews10 = reviews.sort((a, b) => {
       if (a.publish_at > b.publish_at) return -1;
       if (a.publish_at < b.publish_at) return 1;
       return 0;
     }).slice(0, 10);

     reviews10.forEach(reviewObj => {
       const node = document.createElement('div');
       node.className = 'sec-reviews__slide';
       node.append(new Review(reviewObj).render())
       $reviewsNode.append(node);
     });
     initSlick();
  }
};

export default reviewSec;
