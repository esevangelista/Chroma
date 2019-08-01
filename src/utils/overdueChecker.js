import Order from '../entities/order/model';
import Artwork from '../entities/artwork/model';
import { createNotification } from '../entities/notifications/controller';

const getPendingOrders = async () => {
  let orders = await Order.find({ status: 'PENDING' });
  orders = orders.filter(p =>
    `${p.datePurchased.getFullYear()}${p.datePurchased.getMonth()}${p.datePurchased.getDate() + 7}`
    ===
    `${new Date().getFullYear()}${new Date().getMonth()}${new Date().getDate()}`);
  return orders;
};

const adjustStocks = async (products, tally) => {
  await Promise.all(products.map(p =>
    Artwork.findByIdAndUpdate(
      { _id: p._id },
      { $inc: { quantity: tally.get(p._id.toString()) } },
    )));
};

export const updateOverdueTransactions = async () => {
  try {
    const overdue = await getPendingOrders();
    await Promise.all(overdue.map(o =>
      Order.findByIdAndUpdate(
        { _id: o._id },
        { status: 'CANCELED', dateCanceled: new Date() },
      )));
    await Promise.all(overdue.map(o => createNotification(o.ownedBy, ` Order #${o._id} has been canceled due to non-payment before or until payment was due.`, '/orders')));
    await Promise.all(overdue.map(o => createNotification(o.seller, ` Order #${o._id} has been canceled due to non-payment before or until payment was due.`, '/my-store/transactions')));
    await Promise.all(overdue.map(o => adjustStocks(o.products, o.tally)));

    /* eslint-disable-next-line no-console */
    console.log('Cron job success');
  } catch (err) {
    /* eslint-disable-next-line no-console */
    console.log(err);
    console.log('Cron job error');
  }
};
