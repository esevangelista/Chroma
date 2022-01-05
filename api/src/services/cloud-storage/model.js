import { Schema } from 'mongoose';
import { deleteFile } from './index';
import db from '../../db';

const imageSchema = new Schema({
  publicURL: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  folder: {
    type: String,
    enum: ['ARTWORKS', 'USERS', 'PAYMENT', 'SHIPPING', 'OTHERS'],
    required: [true, 'Missing filename'],
  },
  filename: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Missing filename'],
  },
}, {
  timestamps: true,
});

imageSchema.post('remove', (next) => {
  if (this.publicURL) deleteFile(this);
  return next();
});
const Image = db.model('Image', imageSchema);

export default Image;
