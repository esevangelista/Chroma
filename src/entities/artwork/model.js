import { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import Image from '../../services/cloud-storage/model';
import Wishlist from '../wishlist/model';
import db from '../../db';

/* @TODO
  - middleware : delete document if artist is deleted
  - middleware: delete image if deleted on parent and vice versa
*/

const artworkSchema = new Schema({
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Missing artist/user ID field'],
  },
  title: {
    type: String,
    required: [true, 'Missing art title'],
    minlength: 1,
    maxlength: 40,
  },
  description: {
    type: String,
    // maxlength: 350,
  },
  medium: {
    type: [String],
    required: [true, 'Missing art medium'],
  },
  dimensions: {
    // required: [true, 'Missing dimensions'],
    height: Number,
    width: Number,
    depth: Number,
  },
  style: {
    type: String,
    required: [true, 'Missing style'],
  },
  subject: {
    type: [String],
  },
  artform: {
    type: String,
    enum: ['PAINTING', 'PHOTOGRAPHY', 'DRAWING', 'SCULPTURE', 'COLLAGE', 'PRINT', 'DIGITAL ART'],
    required: [true, 'Missing form field'],
  },
  // materials: {
  //   type: [String],
  //   required: [true, 'Missing materials field'],
  // },
  price: {
    type: Number,
    required: [true, 'Missing price value'],
  },
  status: {
    type: String,
    enum: ['IN-STOCK', 'SOLD', 'HIDDEN', 'AVAILABLE'],
    required: [true, 'Missing status'],
    default: 'AVAILABLE',
  },
  quantity: {
    type: Number,
    default: 1,
    required: [true, 'Missing quantity value'],
  },
  images: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Image',
    }],
    required: [true, 'Missing image url/s'],
    maxlength: 7,
    minlength: 1,
  },
}, {
  timestamps: true,
  toObject: { virtuals: true },
});

artworkSchema.pre('remove', async function (next) {
  if (this.images) {
    await Promise.all(this.images.map(i => Image.findByIdAndRemove({ _id: i._id })));
  }
  return next();
});

artworkSchema.virtual('wishCount').get(async function getCount() {
  const count = await Wishlist.count({ products: { $in: [this._id] } });
  return count;
});

artworkSchema.plugin(mongoosePaginate);
const Artwork = db.model('Artwork', artworkSchema);

export default Artwork;
