import InfiniteGrid, {GridLayout} from '@egjs/infinitegrid'
import Review from '../ui/Review';
import ServerData from '../helpers/ServerData';
import {declOfNum} from '../lib';

const GROUP_COUNT = 5

class reviewsGrid {
  constructor(selector) {
    const options  = {
      horizontal: false,
      useRecycle: false,
      transitionDuration: 0.3
    }
    const onAppend = async e => {
      if (this._ig.isProcessing()) return
      const nextGroupKey = +e.groupKey || 0;
      this.startLoading()
      const nextGroup = await this.getNextReviews(nextGroupKey, GROUP_COUNT);
      if (nextGroup.length) {
        this._ig.append(nextGroup, nextGroupKey + 1)
      } else {
        this._ig.off('append', onAppend)
      }
      this.endLoading()
    };

    this._ig = new InfiniteGrid(selector, options);
    this._ig.setLayout(GridLayout);
    this._ig.on('append', onAppend);
    this._ig.on('layoutComplete',
        e=> e.target.forEach(review => {
          setTimeout(()=> review.el.classList.toggle('just-loaded', false), 700)
        }))
  }

  startLoading() {
    this._ig.startLoading()
    this.onLoading(true)
  }

  endLoading() {
    this._ig.endLoading()
    this.onLoading(false)
  }

  onLoading(status) {}

  layout() {
    this._ig.layout()
  }

  destroy() {
    return new Promise(resolve => {
      setTimeout(()=> {
        this._ig.destroy();
        resolve();
      }, 500)
    })
  }

  async getNextReviews (groupKey, count) {
    return [];
  }
}

class ReviewsGridAll  extends reviewsGrid {
  constructor(selector) {
    super(selector)
    this._server = new ServerData()
  }

  async getNextReviews(groupKey, count) {
    const response  = await this._server.getReviewsByPageNumber(count, groupKey)
    if (response.response === 200) {
      return  response.data.map(reviewObj => {
        const node =  document.createElement('div');
        node.className = 'reviews-list__item just-loaded';
        node.append(new Review(reviewObj).render({isOpen: true}))
        return node;
      })
    } else {
      return []
    }
  }
}


const reviewPage = async () => {
  const serverData = new ServerData()
  const titleNode = document.querySelector('.page__title')
  const reviewsCount = await serverData.getCountOfReviews()
  if (reviewsCount.response === 200) {
    titleNode.textContent = `${reviewsCount.data} ${declOfNum(+reviewsCount.data, ['отзыв', 'отзыва', 'отзывов'])}`
  }
  await import('../../less/3_blocks/block_reviews-list')
  const ig = new ReviewsGridAll('#reviews-grid'),
        loadingNode = document.querySelector('#js-auto-load-reviews')
  ig.onLoading = status =>{
    loadingNode.classList.toggle('is-loading', status)
  }

  ig.layout();
}

export default reviewPage;
