import { Schema } from 'mongoose';
import db from '../../db';

const cartSchema = new Schema({
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
  tally: {
    type: Map,
    of: Number,
    default: {},
  },
}, {
  timestamps: true,
});

cartSchema.virtual('quantity').get(function getQuantity() {
  let sum = 0;
  for (const val of this.tally.values()) sum += val;
  return sum;
});

cartSchema.pre('save', async function filterProd() {
  this.products = await this.products.filter(p => p.status === 'AVAILABLE');
});
const Cart = db.model('Cart', cartSchema);

export default Cart;
