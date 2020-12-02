import Reviews from '../mongo/reviewShema';

export default {
  Query: {
    async getReviews() {
      return Reviews.find().sort({'publishAt': -1}).skip(20).limit(10)
    }
  }
}

