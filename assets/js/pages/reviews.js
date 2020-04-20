import InfiniteGrid, {GridLayout} from '@egjs/infinitegrid'
import reviews from '../ui/reviews';
import Review from '../ui/Review';

const GROUP_COUNT = 5

const getNextReviews = (groupKey, count) => {
  return reviews.slice(groupKey*count, (groupKey + 1)*count).map(reviewObj => {
    const node =  document.createElement('div');
    node.className = 'reviews-list__item just-loaded';
    node.append(new Review(reviewObj).render({isOpen: true}))
    return node;
  });
}

const onLoadReview = reviewNode => {
  console.log(reviewNode)
  return new Promise(resolve => setTimeout(()=> {
    reviewNode.classList.remove('just-loaded')
    resolve();
  }, 800))
}

const reviewPage = () => {
  const igOptions  = {
    horizontal: false,
    useRecycle: false,
    transitionDuration: 0.3
  };
  const ig = new InfiniteGrid("#reviews-grid", igOptions);
  ig.setLayout(GridLayout);
  ig.on("append", e => {
    const nextGroupKey = (+e.groupKey || 0) + 1;

    ig.append(getNextReviews(nextGroupKey, GROUP_COUNT), nextGroupKey);
  });
  ig.on("layoutComplete",
        e=> e.target.forEach(async node => await onLoadReview(node.el)))
  ig.layout();

}

export default reviewPage;
