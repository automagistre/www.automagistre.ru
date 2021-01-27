import InfiniteGrid, { GridLayout } from '@egjs/infinitegrid';
import Review from '../ui/Review';
import ServerData from '../helpers/ServerData';
import { declOfNum } from '../lib';

const GROUP_COUNT = 5;
const PAUSE_GROUP_COUNT = 2;

class reviewsGrid {
  constructor(selector) {
    const options = {
      horizontal: false,
      useRecycle: false,
      transitionDuration: 0.3,
    };

    const onAppend = async (e) => {
      if (this._ig.isProcessing()) {
        return;
      }

      this._nextGroupKey = +e.groupKey || 0;
      if (this._nextGroupKey % PAUSE_GROUP_COUNT === 0 && this._nextGroupKey !== 0) {
        this.pause();
      }
      this.startLoading();
      const nextGroup = await this.getNextReviews(this._nextGroupKey, GROUP_COUNT);
      if (nextGroup.length) {
        this._ig.append(nextGroup, this._nextGroupKey + 1);
      } else {
        this.pause();
      }
      this.endLoading();
    };

    this._ig = new InfiniteGrid(selector, options);
    this._ig.setLayout(GridLayout);
    this.appendhandeler = onAppend.bind(this);
    this._ig.on('append', this.appendhandeler);
  }

  pause() {
    this._ig.off('append', this.appendhandeler);
    this.onPause();
  }

  onPause() { }

  start() {
    this._ig.on('append', this.appendhandeler);
    this._ig.on('layoutComplete',
      (e) => e.target.forEach((review) => {
        setTimeout(() => review.el.classList.toggle('just-loaded', false), 700);
      }));
    this._ig.layout();
    this.onStart();
  }

  onStart() { }

  startLoading() {
    this._ig.startLoading();
    this.onLoading(true);
  }

  endLoading() {
    this._ig.endLoading();
    this.onLoading(false);
  }

  onLoading() {}

  destroy() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this._ig.destroy();
        resolve();
      }, 500);
    });
  }

  async getNextReviews() {
    return [];
  }
}

class ReviewsGridAll extends reviewsGrid {
  _lastUUID = undefined

  constructor(selector) {
    super(selector);
    this._server = new ServerData();
  }

  async getNextReviews(groupKey, count) {
    const { response, data: { reviews, pageInfo: { endCursor, hasNextPage } } } = await this._server.getReviewsByPageNumber(count, this._lastUUID);

    if (!hasNextPage || response !== 200) {
      return [];
    }

    this._lastUUID = endCursor;
    return reviews.map((reviewObj) => {
      const node = document.createElement('div');
      node.className = 'reviews-list__item just-loaded';
      node.append(new Review(reviewObj).render({ isOpen: true }));
      return node;
    });
  }
}

const reviewPage = () => {
  const serverData = new ServerData();
  const titleNode = document.querySelector('.page__title');

  serverData.getCountOfReviews().then(({ response, data: reviewsCount }) => {
    if (response === 200) {
      titleNode.textContent = `${reviewsCount} ${declOfNum(+reviewsCount, ['отзыв', 'отзыва', 'отзывов'])}`;
    }
  });

  import('../../less/3_blocks/block_reviews-list');
  const ig = new ReviewsGridAll('#reviews-grid');
  const loadingNode = document.querySelector('#js-auto-load-reviews');
  ig.onLoading = (status) => {
    loadingNode.classList.toggle('is-loading', status);
  };

  const continueBtn = document.querySelector('#js-more-load-data');
  continueBtn.addEventListener('click', () => ig.start());
  ig.onStart = () => continueBtn.classList.toggle('is-hidden', true);
  ig.onPause = () => continueBtn.classList.toggle('is-hidden', false);

  ig.start();
};

export default reviewPage;
