import Cart from './model';
import { BaseError, InternalServerError } from '../../utils/systemErrors';
import { getSubtotal } from '../../utils/cart';

export const getCart = async (req, res) => {
  try {
    const { ownedBy } = req.params;
    const cart = await Cart.findOne({ ownedBy }).populate(['products', {
      path: 'products',
      populate: {
        path: 'images',
      },
    }]);
    const total = getSubtotal(cart.products, cart.tally);
    const { products, quantity, tally } = cart;
    return res.status(200).json({
      success: true,
      message: 'Successfully fetched cart',
      products: await products.filter(p => p.status === 'AVAILABLE'),
      total,
      quantity,
      tally,
    });
  } catch (err) {
    return res.json(new InternalServerError(err));
  }
};

export const updateCart = async (req, res) => {
  try {
    const { ownedBy } = req.params;
    const cart = await Cart.findOneAndUpdate(
      { ownedBy },
      { products: req.body.products },
      { new: true },
    ).populate(['products', {
      path: 'products',
      populate: {
        path: 'images',
      },
    }]);
    const { id, val } = req.body.tally;
    await cart.tally.set(id, val);
    await cart.save();
    const total = getSubtotal(cart.products, cart.tally);
    const { products, quantity, tally } = cart;
    return res.status(200).json({
      success: true,
      message: 'Successfully updated cart',
      products,
      total,
      quantity,
      tally,
    });
  } catch (err) {
    return res.json(new InternalServerError(err));
  }
};
