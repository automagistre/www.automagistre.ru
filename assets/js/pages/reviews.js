import InfiniteGrid, {GridLayout} from '@egjs/infinitegrid'
import reviews from '../ui/reviews';
import Review from '../ui/Review';

const GROUP_COUNT = 5

class reviewsGrid {
  constructor(selector) {
    const options  = {
      horizontal: false,
      useRecycle: false,
      transitionDuration: 0.3
    };
    const onAppend =  e => {
      const nextGroupKey = (+e.groupKey || 0) + 1,
          nextGroup = this.getNextReviews(nextGroupKey, GROUP_COUNT);
      if (nextGroup.length) {
        this._ig.append(nextGroup, nextGroupKey);
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

  getNextReviews (groupKey, count) {
    return [];
  }
}

class reviewsGridAll  extends reviewsGrid {
  constructor(selector) {
    super(selector);
  }

  getNextReviews(groupKey, count) {
    return  reviews.slice(groupKey*count, (groupKey + 1)*count).map(reviewObj => {
      const node =  document.createElement('div');
      node.className = 'reviews-list__item just-loaded';
      node.append(new Review(reviewObj).render({isOpen: true}))
      return node;
    });
  }

}

class reviewsGridFilterByManufacture extends reviewsGrid {
  constructor(selector, manufacture) {
    super(selector);
    this.manufacture = manufacture.toLowerCase()
  }

  getNextReviews(groupKey, count) {
    return  reviews.filter(reviewObj => reviewObj.manufacturer.trim().toLowerCase() === this.manufacture)
                   .slice(groupKey*count, (groupKey + 1)*count).map(reviewObj => {
      const node =  document.createElement('div');
      node.className = 'reviews-list__item just-loaded';
      node.append(new Review(reviewObj).render({isOpen: true}))
      return node;
    });
  }
}

class reviewsGridFilterByModel extends reviewsGrid {
  constructor(selector, model) {
    super(selector);
    this.model = model.toLowerCase()
  }

  getNextReviews(groupKey, count) {
    const temp = reviews.filter(reviewObj => reviewObj.model.trim().toLowerCase() === this.model)
    .slice(groupKey*count, (groupKey + 1)*count).map(reviewObj => {
      const node =  document.createElement('div');
      node.className = 'reviews-list__item just-loaded';
      node.append(new Review(reviewObj).render({isOpen: true}))
      return node;
    });

    return temp
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

  byManufacture(manufacture) {
    return new reviewsGridFilterByManufacture(this.selector, manufacture)
  }

  byModel(model) {
    return new reviewsGridFilterByModel(this.selector, model)
  }
}

const reviewPage = () => {
  const igRender = new reviewsGridRender('#reviews-grid'),
        filtersNode = document.querySelector('#reviews-filters');
  let ig = igRender.all()
  ig.layout();
  filtersNode.querySelector('[data-filter=all]')
            .addEventListener('click', (e)=> {
              e.preventDefault();
              ig.destroy().then(()=> {
                ig = igRender.all();
                ig.layout();
              });
            });
  filtersNode.querySelector('[data-filter=brand]')
            .addEventListener('click', (e)=> {
              e.preventDefault();
              ig.destroy().then(()=> {
                ig = igRender.byManufacture(e.target.innerText);
                ig.layout();
              });
            })
  filtersNode.querySelector('[data-filter=model]')
            .addEventListener('click', (e)=> {
              e.preventDefault();
              ig.destroy().then(()=> {
                ig = igRender.byModel(e.target.innerText);
                ig.layout();
              });
            })
}

export default reviewPage;
