import zxcvbn from 'zxcvbn';
import config from '../config';
import User from '../entities/user/model';
import { BaseError, InternalServerError } from '../utils/systemErrors';

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
