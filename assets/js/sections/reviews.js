import Review from '../ui/Review'
import ServerData from '../helpers/ServerData'
import Swiper, {Pagination, Navigation} from 'swiper';
import {declOfNum} from '../lib'

const reviewSec = async () => {
  Swiper.use([Pagination, Navigation])
  const secReviewNode = document.querySelector('section.sec-reviews'),
        reviewsBTN = secReviewNode.querySelector('.sec-reviews__more-btn'),
        serverData = new ServerData(),
        swiperNode = secReviewNode.querySelector('.swiper-container'),
        swiperPrevBtn = secReviewNode.querySelector('.slick-prev'),
        swiperNextBtn = secReviewNode.querySelector('.slick-next'),
        swiperPaginationNode = secReviewNode.querySelector('.slick-dots')

  const checkArrow = btns => {
    for (let btn of btns)
      btn.classList.toggle('is-hidden', window.innerWidth <= 760)
  }

  if (swiperNode) {
    const {response, data: {totalCount, reviews}} = await serverData.getReviewsByPageNumber(8)
    if (response === 200) {
      if (totalCount){
        reviewsBTN.textContent = `Посмотреть еще ${totalCount} ${declOfNum(+totalCount, ['отзыв', 'отзыва', 'отзывов'])}`
      }
      reviews.forEach(reviewObj => {
        const node = document.createElement('div')
        node.className = 'sec-reviews__slide swiper-slide'
        node.append(new Review(reviewObj).render())
        swiperNode.firstElementChild.append(node)
      })
      new Swiper(swiperNode, {
        loop: true,
        speed: 800,
        pagination: {
          el: swiperPaginationNode,
          clickable: true,
          bulletElement: 'li',
          bulletClass: 'pagination-btn',
          bulletActiveClass: 'slick-active',
          renderBullet: () => `<li class="pagination-btn" role="presentation">
                                <button  type="button" role="tab"></button>
                               </li>`
        },
        navigation: {
          prevEl: swiperPrevBtn,
          nextEl: swiperNextBtn,
          disabledClass: 'is-disable'
        },
        breakpoints: {
          1100: {
            slidesPerView: 3
          },
          540: {
            slidesPerView: 2
          }
        },
        on:{
          init: () => checkArrow([swiperPrevBtn, swiperNextBtn]),
          resize: () => checkArrow([swiperPrevBtn, swiperNextBtn])
        }
      })
    }
  }
}

export default reviewSec
