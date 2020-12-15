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
      const nextGroupKey = +e.groupKey || 0,
          nextGroup = await this.getNextReviews(nextGroupKey, GROUP_COUNT);
      if (nextGroup.length) {
        this._ig.append(nextGroup, nextGroupKey + 1);
      } else {
        this._ig.off('append', onAppend);
      }
    };
    const onLoadReview = reviewNode => {
      return new Promise(resolve => setTimeout(()=> {
        reviewNode.classList.remove('just-loaded')
        resolve();
      }, 700))
    }
    this._ig = new InfiniteGrid(selector, options);
    this._ig.setLayout(GridLayout);
    this._ig.on('append', onAppend);
    this._ig.on('layoutComplete',
        e=> e.target.forEach(async node => await onLoadReview(node.el)))
  }

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

class reviewsGridAll  extends reviewsGrid {
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


class reviewsGridRender {
  constructor(selector) {
    this._selector = selector
  }

  get selector() {
    return this._selector;
  }

  all() {
    return new reviewsGridAll(this.selector)
  }

}


const reviewPage = async () => {
  const serverData = new ServerData()
  const igRender = new reviewsGridRender('#reviews-grid')
  const titleNode = document.querySelector('.page__title')
  let ig = igRender.all()
  const reviewsCount = await serverData.getCountOfReviews()
  titleNode.textContent = `${reviewsCount.data} ${declOfNum(+reviewsCount.data, ['отзыв', 'отзыва', 'отзывов'])}`
  await import('../../less/3_blocks/block_reviews-list')
  ig.layout();
}

export default reviewPage;
