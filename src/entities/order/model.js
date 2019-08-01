import { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import Artwork from '../artwork/model';
import Cart from '../cart/model';
import db from '../../db';


const orderSchema = new Schema({
  ownedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  authorizedRecipient: String,
  mobile: String,
  housenum: String,
  street: String,
  brgy: String,
  region: String,
  province: String,
  city: String,
  landmarks: String,
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
  status: {
    type: String,
    enum: ['RESERVED', 'PENDING', 'CANCELED', 'SHIPPED', 'COMPLETED', 'REFUNDED', 'RETURNED'],
    required: [true, 'Missing status'],
  },
  courier: {
    type: String,
  },
  paymentMethod: {
    type: String,
    default: 'bankdeposit',
  },
  datePurchased: {
    type: Date,
  },
  dateCanceled: Date,
  dateShipped: Date,
  datePaid: Date,
  dateReturned: Date,
  dateRequestReturn: Date,
  dateRefunded: Date,
  dateReceived: {
    type: Date,
  },
  trackingNumber: {
    type: String,
  },
  balance: {
    type: Number,
  },
  shippingFee: {
    type: Number,
  },
  referenceNumber: {
    type: String,
  },
  proofOfPayment: {
    type: Schema.Types.ObjectId,
    ref: 'Image',
  },
  shippingReceipt: {
    type: Schema.Types.ObjectId,
    ref: 'Image',
  },
}, {
  timestamps: true,
  toObject: { virtuals: true },
});

orderSchema.post('save', async function updateProd() {
  await Promise.all(this.products.map(async p => {
    const a = await Artwork.findOne({ _id: p }).select('quantity');
    const quantity = a.quantity - this.tally.get(p.toString());
    const status = quantity === 0 ? 'SOLD' : 'AVAILABLE';
    await Artwork.updateOne(
      { _id: p },
      { quantity, status },
    );
    await Cart.updateOne({ ownedBy: this.ownedBy }, { products: [], tally: {} });
  }));
});

orderSchema.plugin(mongoosePaginate);
const Order = db.model('Order', orderSchema);

export default Order;
