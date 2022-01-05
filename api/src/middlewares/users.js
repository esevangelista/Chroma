import zxcvbn from 'zxcvbn';
import config from '../config';
import User from '../entities/user/model';
import Image from '../services/cloud-storage/model';
import { deleteFile } from '../services/cloud-storage/index';
import { BaseError, InternalServerError } from '../utils/systemErrors';

export const alreadyExists = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.json(new BaseError(400, 'User already exists.'));
    }
    return next();
  } catch (err) {
    return res.json(new InternalServerError(err));
  }
};

export const isAuthenticated = (req, res, next) => {
  if (!req.session.user) {
    return res.json(new BaseError(403, 'You do not have access for these actions'));
  }
  return next();
};

export const isVerified = async (req, res, next) => {
  try {
    const { email, username } = req.body;
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (!user) {
      return res.json(new BaseError(404, 'User not found.'));
    }
    if (!user.emailVerified) {
      return res.json(new BaseError(400, 'User not found.'));
    }
    return next();
  } catch (err) {
    return res.json(new InternalServerError(err));
  }
};

export const isVerifiedID = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const user = await User.findById(_id);
    if (!user) {
      return res.json(new BaseError(404, 'User not found.'));
    }
    if (!user.emailVerified) {
      return res.json(new BaseError(400, 'User not verified.'));
    }
    return next();
  } catch (err) {
    return res.json(new InternalServerError(err));
  }
};

export const isAuthorized = (req, res, next) => {
  if (req.session.user._id !== req.params._id) {
    return res.json(new BaseError(403, 'You are not authorized for this action.'));
  }
  return next();
};

export const passwordStrengthCheck = async (req, res, next) => {
  let { password } = req.body;
  const { newPassword } = req.body;
  password = password || newPassword;
  if (!password) {
    return res.json(new BaseError(400, 'Please include your password.'));
  }

  const {
    zxcvbnOptions: { minimumAllowedScore },
  } = config;
  const passwordStrength = zxcvbn(password);

  if (minimumAllowedScore > passwordStrength.score) {
    const message = [passwordStrength.feedback.warning || 'Your password is too weak!'];
    return res.json(new BaseError(400, [...message, ...passwordStrength.feedback.suggestions].join(' ')));
  }

  return next();
};

export const deletePreviousImage = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const user = await User.findById(_id).populate('image');
    if (user.image) {
      await Promise.all([
        deleteFile(user.image.filename),
        Image.findByIdAndRemove({ _id: user.image._id }),
        User.findByIdAndUpdate(_id, { image: null }),
      ]);
    }
    return next();
  } catch (err) {
    return res.json(new InternalServerError(err));
  }
};

export const artistCheck = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const user = await User.findById(_id);
    if (!user.isArtist) {
      return res.json(new BaseError(403, 'User is not an artist'));
    }
    return next();
  } catch (err) {
    return res.json(new InternalServerError(err));
  }
};
