import bcrypt from 'bcrypt';
import User from './model';
import { BaseError, InternalServerError } from '../../utils/systemErrors';
import { generateToken } from '../../utils/generateToken';
import { sendConfirmYourAccountEmail } from '../../utils/email/confirmEmail/sendConfirmEmail';
import config from '../../config';

export const addUser = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return next(new BaseError(400, 'User already exists.'));
  }

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
    return next(new InternalServerError(err));
  }
};
