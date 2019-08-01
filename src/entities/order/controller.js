import Order from './model';
import Artwork from '../artwork/model';
import { BaseError, InternalServerError } from '../../utils/systemErrors';
import { getTotal } from '../../utils/cart';
import { addImage } from '../../services/cloud-storage/index';
import { createNotification } from '../notifications/controller';

const groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

export const addOrder = async (req, res) => {
  try {
    const { ownedBy } = req.params;
    const {
      products,
      tally,
      mobnum,
      housenum,
      street,
      brgy,
      region,
      province,
      city,
      landmarks,
      authorizedRecipient,
    } = req.body;
    const grouped = groupBy(products, 'artist');
    const invoice = [];
    Object.values(grouped).map(g => invoice.push(new Order({
      products: g,
      tally,
      ownedBy,
      seller: g[0].artist,
      balance: getTotal(g, tally),
      mobile: mobnum,
      housenum,
      street,
      brgy,
      region,
      province,
      city,
      landmarks,
      authorizedRecipient: authorizedRecipient || null,
      datePurchased: new Date(),
      status: 'PENDING',
    })));
    await Promise.all(invoice.map(p => p.mobile ? p.save() : ''));
    await Promise.all(invoice.map(p =>
      p.mobile ?
        createNotification(p.seller, `${req.session.user.firstName} ${req.session.user.lastName} placed an order`, '/my-store/transactions')
        : ''));
    return res.status(200).json({
      success: true,
      message: 'Items in your order/s are now placed. Please wait for the seller\'s message for further instruction.',
    });
  } catch (err) {
    return res.json(new InternalServerError(err));
  }
};

export const getOrders = async (req, res) => {
  try {
    const { ownedBy } = req.params;
    const { status } = req.query;
    const options = {
      limit: +req.query.limit || 12,
      page: +req.query.page || 1,
      populate: [
        {
          path: 'seller',
          select: ['firstName', 'lastName', 'email', '_id'],
        },
        'products',
        'proofOfPayment',
        'shippingReceipt',
        {
          path: 'products',
          populate: {
            path: 'images',
          },
        },
      ],
      sort: req.query.sort ? req.query.sort : '-datePurchased',
    };
    const query = { ownedBy };
    if (status) query.status = status;
    const data = await Order.paginate(query, options);
    const orders = data.docs;
    delete data.docs;
    const pagination = { ...data, limit: req.query.limit || 12 };
    return res.status(200).json({
      success: true,
      message: 'Successfully retrieved all orders',
      orders,
      pagination,
    });
  } catch (err) {
    return res.json(new InternalServerError(err));
  }
};

export const getTransactions = async (req, res) => {
  try {
    const { seller } = req.params;
    const { status, name } = req.query;
    const options = {
      limit: +req.query.limit || 12,
      page: +req.query.page || 1,
      populate: [
        'products',
        {
          path: 'ownedBy',
          select: ['firstName', 'lastName', 'email', '_id'],
        },
        'proofOfPayment',
        'shippingReceipt',
        {
          path: 'products',
          populate: {
            path: 'images',
          },
        },
      ],
      sort: req.query.sort ? req.query.sort : '-datePurchased',
    };
    const query = {
      seller,
    };
    if (status) query.status = status;
    const data = await Order.paginate(query, options);
    let transactions = data.docs;
    if (name) {
      const pattern = new RegExp(`^(${name.toLowerCase().split(' ').join('|')})`);
      transactions = await transactions.filter(t =>
        t.ownedBy.firstName.toLowerCase().match(pattern)
        || t.ownedBy.lastName.toLowerCase().match(pattern));
    }
    delete data.docs;
    const pagination = { ...data, limit: req.query.limit || 12 };
    return res.status(200).json({
      success: true,
      message: 'Successfully retrieved transactions',
      transactions,
      pagination,
    });
  } catch (err) {
    return res.json(new InternalServerError(err));
  }
};

export const uploadProofPayment = async (req, res) => {
  try {
    const { _id } = req.params;
    const image = await addImage(req.files[0]);
    const order = await Order.findByIdAndUpdate(_id, { proofOfPayment: image._id, datePaid: new Date(), status: 'RESERVED' });
    await createNotification(order.seller, `${req.session.user.firstName} ${req.session.user.lastName} uploaded proof of payment for order #${order._id}`, '/my-store/transactions');
    return res.status(200).json({
      success: true,
      message: 'Proof of payment uploaded',
    });
  } catch (err) {
    return res.json(new InternalServerError(err));
  }
};

export const finishTransaction = async (req, res) => {
  try {
    const { _id } = req.params;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(_id, { status, dateReceived: new Date() });
    await createNotification(order.ownedBy, `${req.session.user.firstName} ${req.session.user.lastName} updated status of  #${order._id} to COMPLETED.`, '/orders');
    return res.status(200).json({
      success: true,
      message: 'Transaction updated',
    });
  } catch (err) {
    return res.json(new InternalServerError(err));
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const { _id } = req.params;
    const order = await Order.findById({ _id }).populate(['products']);
    if (order && order.status === 'PENDING') {
      const { products, tally } = order;
      await Promise.all(products.map(p =>
        Artwork.findByIdAndUpdate(
          { _id: p._id },
          { $inc: { quantity: tally.get(p._id.toString()) } },
        )));
      await Order.findByIdAndUpdate(_id, { status: 'CANCELED', dateCanceled: new Date() });
      await createNotification(order.seller, `${req.session.user.firstName} ${req.session.user.lastName} canceled #${order._id}`, '/my-store/transactions');
    }
    return res.status(200).json({
      success: true,
      message: 'Order canceled',
    });
  } catch (err) {
    return res.json(new InternalServerError(err));
  }
};


export const uploadShippingReceipt = async (req, res) => {
  try {
    const { _id } = req.params;
    const { courier, trackingNumber } = req.body;
    const image = await addImage(req.files[0]);
    const order = await Order.findByIdAndUpdate(_id, {
      shippingReceipt: image._id,
      dateShipped: new Date(),
      status: 'SHIPPED',
      courier,
      trackingNumber,
    });
    await createNotification(order.ownedBy, `${req.session.user.firstName} ${req.session.user.lastName} uploaded shipping receipt and tracking details of order #${order._id}`, '/orders');
    return res.status(200).json({
      success: true,
      message: 'Shipping receipt uploaded',
    });
  } catch (err) {
    return res.json(new InternalServerError(err));
  }
};
