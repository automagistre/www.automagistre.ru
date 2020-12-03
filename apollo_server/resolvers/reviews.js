import Reviews from '../mongo/reviewShema';

export default {
  Query: {

    async getLastReviews(_, args) {
      return Reviews.find().sort({'publishAt': -1}).limit(args.count)
    },

    async getReviewsByPageNumber(_, args) {
      return Reviews.find().sort({'publishAt': -1}).skip(args.count * args.page).limit(args.count)
    },

    async getCountOfReviews() {
      return Reviews.countDocuments()
    }
  }
}

