import User from '../user/model';
import Order from '../order/model';
import { BaseError, InternalServerError } from '../../utils/systemErrors';


export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'password') {
      req.session.admin = { username, password };
      return res.status(200).json({
        success: true,
        message: 'Admin authenticated.',
        admin: req.session.admin,
      });
    }
    return res.json(new BaseError(403, 'Forbidden'));
  } catch (err) {
    return res.json(new InternalServerError(err));
  }
};

export const logout = async (req, res) => {
  try {
    await req.session.destroy();
    return res.status(200).json({
      success: true,
      message: 'Admin logged out.',
    });
  } catch (err) {
    return res.json(new InternalServerError(err));
  }
};

export const session = async (req, res) => {
  const { admin } = req.session;
  if (admin && admin.username) delete admin.password;
  return res.status(200).json({
    success: true,
    message: 'Session fetched.',
    admin: admin || null,
  });
};

export const isAdmin = async (req, res, next) => {
  if (!req.session.admin || !req.session.admin.username === 'admin') {
    return res.json(new BaseError(403, 'Forbidden.'));
  }
  return next();
};

export const getUsers = async (req, res) => {
  try {
    const {
      province,
      city,
      rating,
      region,
      isArtist,
      category,
      search,
    } = req.query;
    const query = {};
    if (isArtist) query.isArtist = isArtist;
    if (category === 'name') {
      query.$or = [
        { firstName: new RegExp(search, 'i') },
        { lastName: new RegExp(search, 'i') },
      ];
    }
    if (category === 'email') query.email = new RegExp(search, 'i');
    if (category === 'username') query.username = new RegExp(search, 'i');
    if (region) query['location.region'] = new RegExp(region, 'i');
    if (province) query['location.province'] = new RegExp(province, 'i');
    if (city) query['location.city'] = new RegExp(city, 'i');
    if (rating && parseInt(rating) !== 0) query['rating'] = { $gte: parseInt(rating), $lt: Math.floor(parseInt(rating) + 1) };
    const options = {
      limit: +req.query.limit || 12,
      page: +req.query.page || 1,
      select: ['-password'],
      populate: ['image'],
      sort: req.query.sort || 'firstName',
    };

    const data = await User.paginate(query, options);
    const users = data.docs;
    await delete data.docs;
    return res.status(200).json({
      success: true,
      message: 'Successfully retrieved artists',
      users,
      pagination: data,
    });
  } catch (err) {
    return res.json(new InternalServerError(err));
  }
};

export const getUser = async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.params._id }).populate('image').select('-password').exec();
    if (!user) {
      return res.json(new BaseError(404, 'User not found'));
    }
    if (user.isArtist) {
      const reviews = await Order.find({ seller: user._id, status: 'COMPLETED' })
        .select(['review', 'ownedBy'])
        .sort('-review.createdAt')
        .populate(['review', { path: 'ownedBy', select: ['firstName', 'lastName', 'image'], populate: 'image' }])
        .exec();
      user = { ...user._doc, reviews };
    }
    return res.status(200).json({
      success: true,
      message: 'Successfully fetched user info',
      user,
    });
  } catch (err) {
    return res.json(new InternalServerError(err));
  }
};

export const getTransactions = async (req, res) => {
  try {
    const { _id } = req.params;
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
        'review',
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
      seller: _id,
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

export const getTransaction = async (req, res) => {
  try {
    const { _id } = req.params;
    const transaction = await Order.findById({ seller: _id })
      .populate([
        'products',
        {
          path: 'ownedBy',
          select: ['firstName', 'lastName', 'email', '_id'],
        },
        'proofOfPayment',
        'review',
        'shippingReceipt',
        {
          path: 'products',
          populate: {
            path: 'images',
          },
        },
      ]);
    return res.status(200).json({
      success: true,
      message: 'Transaction retrieved',
      transaction,
    });
  } catch (err) {
    return res.json(new InternalServerError(err));
  }
};
