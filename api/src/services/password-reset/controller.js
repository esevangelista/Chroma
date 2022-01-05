import bcrypt from 'bcrypt';
import User from '../../entities/user/model';
import PasswordReset from './model';
import { BaseError, InternalServerError } from '../../utils/systemErrors';
import { sendPasswordResetEmail } from '../../utils/email/pwResetEmail/sendResetEmail';
import { generateToken } from '../../utils/generateToken';

export const sendReset = async (req, res) => {
  if (!req.body.email) {
    return res.status(400).json({
      success: false,
      message: 'Please include your email.',
    });
  }
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json(new BaseError(404, 'User does not exist'));
    }
    const token = await generateToken(18);
    await PasswordReset.create({ user, token });
    sendPasswordResetEmail(email, token);
    return res
      .status(200)
      .json({
        success: true,
        message: 'Please check your email for instructions.',
      });
  } catch (err) {
    return res.json(new InternalServerError(err));
  }
};

export const verifyResetToken = async (req, res) => {
  try {
    const pwReset = await PasswordReset.findOne({ token: req.params.token });
    return pwReset == null
      ? res
        .status(200)
        .json({
          success: true,
          message: ' Password reset token expired.',
          valid: false,
        })
      : res
        .status(200)
        .json({
          success: true,
          message: 'Password reset token verified.',
          valid: true,
        });
  } catch (err) {
    return res.json(new InternalServerError(err));
  }
};

export const resetPassword = async (req, res) => {
  if (!req.body.password) {
    return res.json(new BaseError(400, 'Please include your password.'));
  }
  try {
    const pwReset = await PasswordReset.findOne({ token: req.params.token })
      .populate('user')
      .exec();

    if (!pwReset) {
      return res.json(new BaseError(401, 'Invalid reset token. Token may have expired.'));
    }
    await PasswordReset.findOneAndRemove({ token: req.params.token });
    const user = await User.findOne({ _id: pwReset.user._id }).exec();
    const newEncryptedPassword = await bcrypt.hash(req.body.password, 12);
    user.password = newEncryptedPassword;
    await user.save();
    return res.json({
      success: true,
      message: 'Password updated. You may now login in your account.',
    });
  } catch (err) {
    return res.json(new InternalServerError(err));
  }
};
