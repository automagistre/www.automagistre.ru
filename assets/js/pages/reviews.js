import InfiniteGrid, {GridLayout} from '@egjs/infinitegrid'
import reviews from '../ui/reviews';
import Review from '../ui/Review';

const GROUP_COUNT = 5

const getNextReviews = (groupKey, count) => {
  return  reviews.slice(groupKey*count, (groupKey + 1)*count).map(reviewObj => {
    const node =  document.createElement('div');
    node.className = 'reviews-list__item just-loaded';
    node.append(new Review(reviewObj).render({isOpen: true}))
    return node;
  });
}

const onLoadReview = reviewNode => {
  return new Promise(resolve => setTimeout(()=> {
    reviewNode.classList.remove('just-loaded')
    resolve();
  }, 700))
}

const reviewPage = () => {
  const igOptions  = {
    horizontal: false,
    useRecycle: false,
    transitionDuration: 0.3
  };
  const ig = new InfiniteGrid("#reviews-grid", igOptions);
  const onAppend =  e => {
    const nextGroupKey = (+e.groupKey || 0) + 1,
        nextGroup = getNextReviews(nextGroupKey, GROUP_COUNT);
    if (nextGroup.length) {
      ig.append(nextGroup, nextGroupKey);
    } else {
      ig.off('append', onAppend);
    }
  }
  ig.setLayout(GridLayout);
  ig.on("append", onAppend);
  ig.on("layoutComplete",
        e=> e.target.forEach(async node => await onLoadReview(node.el)))
  ig.layout();

}

export default reviewPage;
