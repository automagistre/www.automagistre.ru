import InfiniteGrid, {GridLayout} from '@egjs/infinitegrid'
import reviews from '../ui/reviews';
import Review from '../ui/Review';

const getReviews = () => {
  return reviews;
}

const reviewPage = () => {
  const igOptions  = {
    horizontal: false,
    useRecycle: false
  };
  const ig = new InfiniteGrid("#reviews-grid", igOptions),
        reviewsList = getReviews();
  ig.setLayout(GridLayout);

  const reviewNodes =  reviewsList.map(reviewObj => {
    const node =  document.createElement('div');
    node.className = 'reviews-list__item';
    node.append(new Review(reviewObj).render({isOpen: true}))
    return node;
  })
  ig.append(reviewNodes.slice(0, 10));
}

export default reviewPage;
