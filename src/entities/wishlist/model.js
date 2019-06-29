import { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import db from '../../db';

const wishSchema = new Schema({
  ownedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Artwork',
    }],
    default: [],
  },
}, {
  timestamps: true,
});
wishSchema.plugin(mongoosePaginate);
const Wishlist = db.model('Wishlist', wishSchema);

export default Wishlist;
