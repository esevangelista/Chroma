import { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

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
    maxlength: 350,
  },
  medium: {
    type: String,
    required: [true, 'Missing art medium'],
  },
  dimensions: {
    // required: [true, 'Missing dimensions'],
    height: Number,
    width: Number,
    depth: Number,
    unitOfMeasurement: String,
  },
  style: {
    type: String,
    required: [true, 'Missing style'],
  },
  subject: {
    type: String,
  },
  theme: {
    type: String,
  },
  artform: {
    type: String,
    enum: ['PAINTING', 'PHOTOGRAPHY', 'DRAWING', 'SCULPTURE', 'COLLAGE', 'PRINT', 'DIGITAL ART'],
    required: [true, 'Missing materials field'],
  },
  materials: {
    type: [String],
    required: [true, 'Missing materials field'],
  },
  price: {
    type: Number,
    required: [true, 'Missing price value'],
  },
  keywords: {
    type: [String],
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
      classification: {
        type: String,
        enum: ['FULL FRONTAL', 'IN-ROOM', 'CLOSE-UP', 'IN-PROGRESS', 'BACK', 'FRAMED', 'PACKAGED'],
        required: true,
      },
    }],
    required: [true, 'Missing image url/s'],
    maxlength: 7,
    minlength: 1,
  },
}, {
  timestamps: true,
});

artworkSchema.plugin(mongoosePaginate);
const Artwork = db.model('Artwork', artworkSchema);

export default Artwork;
