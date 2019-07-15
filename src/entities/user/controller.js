import bcrypt from 'bcrypt';
import escapeStringRegexp from 'escape-string-regexp';
import User from './model';
import Artwork from '../artwork/model';
import { BaseError, InternalServerError } from '../../utils/systemErrors';
import { generateToken } from '../../utils/generateToken';
import { sendConfirmYourAccountEmail } from '../../utils/email/confirmEmail/sendConfirmEmail';
import { addImage } from '../../services/cloud-storage/index';

import config from '../../config';

export const getArtists = async (req, res) => {
  try {
    const { name, region, province, city, artform } = req.query;
    const query = { isArtist: true };
    if (name) {
      query.$or = [
        { firstName: new RegExp(name, 'i') },
        { lastName: new RegExp(name, 'i') },
      ];
    }
    if (region) query['location.region'] = new RegExp(region, 'i');
    if (province) query['location.province'] = new RegExp(province, 'i');
    if (city) query['location.city'] = new RegExp(city, 'i');

    const options = {
      limit: +req.query.limit || 12,
      page: +req.query.page || 1,
      select: ['location', 'firstName', 'lastName', 'image'],
      populate: ['image'],
      sort: 'name',
    };

    const data = await User.paginate(query, options);
    const rawArtists = data.docs;
    await delete data.docs;
    let artists = [];
    if (artform && artform !== 'ANY') {
      await Promise.all(rawArtists.map(async (a) => {
        const count = await Artwork.count({ artform, artist: a._id });
        if (count >= 1) artists.push(a);
      }));
    } else artists = rawArtists;
    let arr = await Promise.all(artists.map(i => Artwork.find({ artist: i._id }).limit(4).select(['title', 'images', 'price', 'artform', 'artist']).populate('images')));
    arr = arr.flat();
    const payload = [];
    artists.forEach(a =>
      payload.push({
        ...a._doc,
        artworks: arr.filter(b => b.artist.toString() === a._id.toString()),
      }));
    return res.status(200).json({
      success: true,
      message: 'Successfully retrieved artists',
      artists: payload,
      pagination: data,
    });
  } catch (err) {
    return res.json(new InternalServerError(err));
  }
};

export const getUsers = async (req, res) => {
  try {
    // @TODO search by location, name, account type
    let { username, email } = req.query;
    const exact = !req.query.exact ? false : req.query.exact === 'true';

    const query = {
      // deletedOn: null,
    };

    if (username) {
      username = escapeStringRegexp(username);
      query.username = exact ? new RegExp(`^${username}$`, 'i') : new RegExp(username, 'i');
    }

    if (email) {
      email = escapeStringRegexp(email);
      query.email = exact
        ? new RegExp(`^${email}$`, 'i')
        : new RegExp(email, 'i');
    }

    const sort = ['username', 'email'].reduce((acc, curr) => {
      const re = new RegExp(curr);
      /* eslint-disable-next-line no-shadow */
      const sortBy = (req.query.sort || []).find(sortBy => re.test(sortBy));
      if (sortBy) return `${acc}${sortBy} `;
      return `${acc}${curr} `;
    }, '');

    const options = {
      limit: +req.query.limit || 10,
      page: +req.query.page || 1,
      select: '-password',
      populate: 'image',
      sort,
    };

    const data = await User.paginate(query, options);
    const users = data.docs;
    delete data.docs;

    return res.status(200).json({
      success: true,
      message: 'Successfully retrieved user list',
      users,
      ...data,
    });
  } catch (err) {
    return res.json(new InternalServerError(err));
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params._id }).populate('image').select('-password');
    if (!user) {
      return res.json(new BaseError(404, 'User not found'));
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

export const addUser = async (req, res) => {
  const { email } = req.body;
  try {
    req.body.password = await bcrypt.hash(req.body.password, 12);
    const confirmToken = await generateToken(20);
    const newUser = new User(req.body);
    newUser.confirmToken = confirmToken;
    await newUser.save();
    sendConfirmYourAccountEmail(email, confirmToken, config.urls.client);
    delete newUser.password;
    return res
      .status(200)
      .json({ success: true, message: 'Please check your email for instructions.' });
  } catch (err) {
    return res.json(new InternalServerError(err));
  }
};

export const updateUser = async (req, res) => {
  try {
    const { _id } = req.params;
    const {
      firstName,
      lastName,
      username,
      currentPassword,
      newPassword,
    } = req.body;
    if (!firstName || !username || !lastName) {
      return res.json(new BaseError(400, 'Missing information.'));
    }
    const info = {
      firstName,
      lastName,
      username,
    };

    const user = await User.findByIdAndUpdate(_id, info, { new: true }).populate('image');
    if (newPassword && currentPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.json(new BaseError(400, 'Incorrect current password.'));
      }
      user.password = await bcrypt.hash(req.body.newPassword, 12);
      await user.save();
    }
    await delete user.password;
    req.session.user = user;
    return res.status(200).json({
      success: true,
      message: 'User information updated.',
      user,
    });
  } catch (err) {
    return res.json(new InternalServerError(err));
  }
};

export const changeEmail = async (req, res) => {
  try {
    const { _id } = req.params;
    const { email } = req.body;
    const confirmToken = await generateToken(20);
    sendConfirmYourAccountEmail(email, confirmToken, config.urls.client);
    await User.findByIdAndUpdate(_id, { email, confirmToken, emailVerified: false }, { new: true });
    return res.status(200).json({
      success: true,
      message: 'Please check your email for instructions.',
    });
  } catch (err) {
    return res.json(new InternalServerError(err));
  }
};
export const verifyAccount = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { confirmToken: req.params.confirmToken },
      { confirmReceivedAt: new Date() },
      { new: true },
    );

    if (!user) {
      return res.json(new BaseError(400, 'Invalid confirmation token.'));
    }
    await User.findByIdAndUpdate(user._id, { emailVerified: true }).exec();
    return res.json({ success: true, message: 'Your email is now confirmed.' });
  } catch (error) {
    return res.json(new InternalServerError(error));
  }
};

export const uploadProfile = async (req, res) => {
  try {
    const { _id } = req.params;
    const image = await addImage(req.files[0]);
    await User.findByIdAndUpdate(_id, { image: image._id });
    return res.status(200).json({
      success: true,
      message: 'User profile image updated.',
    });
  } catch (err) {
    return res.json(new InternalServerError(err));
  }
};

export const updateArtistBio = async (req, res) => {
  try {
    const { _id } = req.params;
    const {
      bio,
      fb,
      twitter,
      instagram,
      pinterest,
      tumblr,
      web,
      housenum,
      brgy,
      street,
      region,
      province,
      city,
    } = req.body;
    const user = await User.findById(_id).populate('image');
    if (bio) {
      user.bio = bio;
      await user.save();
    }
    if (!user.links) user.links = {};
    await user.links.set('fb', fb || '');
    await user.links.set('twitter', twitter || '');
    await user.links.set('instagram', instagram || '');
    await user.links.set('pinterest', pinterest || '');
    await user.links.set('tumblr', tumblr || '');
    await user.links.set('web', web || '');
    user.location.housenum = housenum || '';
    user.location.brgy = brgy || '';
    user.location.street = street || '';
    user.location.region = region || '';
    user.location.province = province || '';
    user.location.city = city || '';
    await user.save();
    delete user.password;
    req.session.user = user;
    return res.status(200).json({
      success: true,
      message: 'Successfully updated artist\'s bio and links',
      user,
    });
  } catch (err) {
    return res.json(new InternalServerError(err));
  }
};

export const activateArtist = async (req, res) => {
  try {
    const { _id } = req.params;
    const { toArtist } = req.body;
    const user = await User.findByIdAndUpdate(_id, { isArtist: toArtist }, { new: true }).populate('image');
    delete user.password;
    req.session.user = user;
    if (!toArtist) {
      await Artwork.updateMany({ artist: _id }, { $set: { status: 'HIDDEN' } });
    } else {
      await Artwork.updateMany({ artist: _id }, { $set: { status: 'AVAILABLE' } });
    }
    return res.status(200).json({
      success: true,
      message: 'User type updated',
      user,
    });
  } catch (err) {
    return res.json(new InternalServerError(err));
  }
};

export const updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.json(new BaseError(400, 'Missing information.'));
  }
  try {
    const user = await User.findById(req.params._id);
    const isMatch = await bcrypt.compare(req.body.currentPassword, user.password);

    if (!isMatch) {
      return res.json(new BaseError(400, 'Incorrect current password.'));
    }

    user.password = await bcrypt.hash(req.body.newPassword, 12);
    await user.save();
    delete user.password;
    return res.status(200).json({
      success: true,
      message: 'Password updated.',
    });
  } catch (err) {
    return res.json(new InternalServerError(err));
  }
};

