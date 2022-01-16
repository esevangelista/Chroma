import { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import uniqueValidator from 'mongoose-unique-validator';
import validator from 'validator';
import db from '../../db';
import Cart from '../cart/model';
import Wishlist from '../wishlist/model';

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
  isArtist: {
    type: Boolean,
    required: [true, 'Missing type field'],
    default: false,
  },
  bio: {
    type: String,
  },
  links: {
    type: Map,
    of: String,
  },
  emailVerified: {
    type: Boolean,
    default: false,
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
  location: {
    city: String,
    region: String,
    street: String,
    province: String,
    brgy: String,
    subdivision: String,
    housenum: String,
    landmarks: String,
  },
  rating: Number,
  mobile: String,
}, {
  timestamps: true,
  toObject: { virtuals: true },
});

userSchema.post('save', async (user) => {
  const cart = new Cart({ ownedBy: user._id });
  await cart.save();
  const wishlist = new Wishlist({ ownedBy: user._id });
  await wishlist.save();
});

userSchema.plugin(mongoosePaginate);
userSchema.plugin(uniqueValidator, { message: '{PATH} should be unique.' });
const User = db.model('User', userSchema);

export default User;
