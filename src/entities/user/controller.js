import bcrypt from 'bcrypt';
import escapeStringRegexp from 'escape-string-regexp';
import User from './model';
import { BaseError, InternalServerError } from '../../utils/systemErrors';
import { generateToken } from '../../utils/generateToken';
import { sendConfirmYourAccountEmail } from '../../utils/email/confirmEmail/sendConfirmEmail';
import { addImage } from '../../services/cloud-storage/index';

import config from '../../config';

export const getUsers = async (req, res) => {
  try {
    // @TODO search by location, name, account type
    let { username, email } = req.query;
    const exact = !req.query.exact ? false : req.query.exact === 'true';

    const query = {
      deletedOn: null,
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
    const user = await User.findOne({ _id: req.params._id });
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
    const { firstName, lastName, username } = req.body;
    if (!firstName || !username || !lastName) {
      return res.json(new BaseError(400, 'Missing information.'));
    }
    const info = {
      firstName,
      lastName,
      username,
    };

    const user = await User.findByIdAndUpdate(_id, { info });
    return res.status(200).json({
      success: true,
      message: 'User information updated.',
      user,
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
      return res.json(new BaseError(409, 'Invalid confirmation token.'));
    }
    await User.findByIdAndUpdate(user._id, { emailVerified: true }).exec();
    return res.json({ success: true, message: 'Your email is now confirmed.' });
  } catch (error) {
    return res.json(new InternalServerError(error));
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

export const uploadProfile = async (req, res) => {
  try {
    const { _id } = req.params;
    const image = await addImage(req.files[0]);
    await User.findByIdAndUpdate(_id, { image: image._id });
    const user = await User.findById(_id);
    return res.status(200).json({
      success: true,
      message: 'User profile image updated.',
      user,
    });
  } catch (err) {
    return res.json(new InternalServerError(err));
  }
};

export const activateArtist = async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await User.findByIdAndUpdate(_id, { isArtist: true });
    return res.status(200).json({
      success: true,
      message: 'User is now a verified seller/artist',
      user,
    });
  } catch (err) {
    return res.json(new InternalServerError(err));
  }
};

export const updateArtistBio = async (req, res) => {
  try {
    const { _id } = req.params;
    const { links, bio } = req.body;
    if (!links && !bio) {
      return res.json(new BaseError(400, 'Missing info'));
    }
    const user = await User.findById(_id);
    if (bio) {
      user.bio = bio;
      await user.save();
    }
    if (links) {
      Object.entries(links).forEach(([key, value]) => user.set(`links.${key}`, `${value}`));
      await user.save();
    }
    return res.status(200).json({
      success: true,
      message: 'Successfully updated artist\'s bio and links',
      user,
    });
  } catch (err) {
    return res.json(new InternalServerError(err));
  }
};

