import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const ReviewsSchema = new Schema({
  _id: String,
  author: String,
  content: String,
  publishAt: Date
})

const Reviews = mongoose.model('review', ReviewsSchema, 'review')

export default Reviews
