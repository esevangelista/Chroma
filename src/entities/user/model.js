import { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import uniqueValidator from 'mongoose-unique-validator';
import validator from 'validator';

import db from '../../db';

/* @TODO
-> location (country,city/municipality)
-> currency (USD or PH Peso)
-> Description/About
-> add default image public url
*/
const userSchema = new Schema({
  email: {
    type: String,
    trim: true,
    index: true,
    lowercase: true,
    required: [true, 'Missing email field.'],
    unique: true,
    validate: [validator.isEmail, 'invalid email address'],
  },
  username: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Missing username field.'],
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'Missing password field.'],
  },
  firstName: {
    type: String,
    trim: true,
    // required: [true, 'Missing name field.'],
  },
  lastName: {
    type: String,
    trim: true,
    // required: [true, 'Missing name field.'],
  },
  accountType: {
    type: String,
    required: [true, 'Missing type field'],
    enum: ['BUYER', 'SELLER', 'BOTH'],
    default: 'BUYER',
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  updatedAt: {
    type: Date,
  },
  confirmToken: { type: String },
  confirmReceivedAt: {
    type: Date,
  },
  image: {
    type: Schema.Types.ObjectId,
    ref: 'Image',
    // default:
  },
}, {
  timestamps: true,
  toObject: { virtuals: true },
});

userSchema.plugin(mongoosePaginate);
userSchema.plugin(uniqueValidator, { message: '{PATH} should be unique.' });
const User = db.model('User', userSchema);

export default User;
