import { Schema } from 'mongoose';
import db from '../../db';

const reviewSchema = new Schema({
  rating: Number,
  review: String,
}, {
  timestamps: true,
});

const Review = db.model('Review', reviewSchema);

export default Review;
