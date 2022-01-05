import Wishlist from './model';
import { BaseError, InternalServerError } from '../../utils/systemErrors';

export const updateWishlist = async (req, res) => {
  try {
    const { ownedBy } = req.params;
    await Wishlist.findOneAndUpdate(
      { ownedBy },
      { products: req.body.products },
    );
    return res.status(200).json({
      success: true,
      message: 'Successfully updated list',
    });
  } catch (err) {
    return res.json(new InternalServerError(err));
  }
};

export const getWishlist = async (req, res) => {
  try {
    const { ownedBy } = req.params;
    const options = {
      limit: +req.query.limit || 12,
      page: +req.query.page || 1,
      populate: ['products',
        {
          path: 'products',
          populate: { path: 'images' },
        },
        {
          path: 'products',
          populate: {
            path: 'artist',
            select: ['firstName', 'lastName', 'email', '_id'],
          },
        },
      ],
      sort: req.query.sort ? req.query.sort : { title: 1 },
    };
    const data = await Wishlist.paginate({ ownedBy }, options);
    const wishlist = data.docs;
    delete data.docs;
    const pagination = { ...data, limit: req.query.limit || 12 };
    return res.status(200).json({
      success: true,
      message: 'Successfully fetched your wishlist',
      wishlist: wishlist[0].products.filter(p => p.status === 'AVAILABLE'),
      pagination,
    });
  } catch (err) {
    return res.json(new InternalServerError(err));
  }
};

export const getWishlistCount = async (req, res) => {
  try {
    const { _id } = req.params;
    const wishCount = Wishlist.count({ products: { $in: [_id] } });
    return res.status(200).json({
      success: true,
      message: 'Successfully fetched amount of wishlist count',
      wishCount,
    });
  } catch (err) {
    return res.json(new InternalServerError(err));
  }
};
