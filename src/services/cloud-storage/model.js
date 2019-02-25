import { Schema } from 'mongoose';
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
    enum: ['ARTWORK', 'USERS', 'OTHERS'],
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

const Image = db.model('Image', imageSchema);

export default Image;
