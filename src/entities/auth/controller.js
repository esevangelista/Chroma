import bcrypt from 'bcrypt';
import User from '../user/model';
import { BaseError, InternalServerError } from '../../utils/systemErrors';

export const login = async (req, res) => {
  try {
    const { email, username } = req.body;
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (!user) {
      return res.json(new BaseError(404, 'User not found.'));
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.json(new BaseError(400, 'Incorrect password'));
    }
    delete user.password;
    req.session.user = user;
    return res.status(200).json({
      success: true,
      message: 'User authenticated.',
      user,
    });
  } catch (err) {
    return res.json(new InternalServerError(err));
  }
};

export const logout = async (req, res) => {
  try {
    await req.session.destroy();
    return res.status(200).json({
      success: true,
      message: 'User logged out',
    });
  } catch (err) {
    return res.json(new InternalServerError(err));
  }
};

export const session = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Session fetched.',
    user: req.session.user || null,
  });
};
