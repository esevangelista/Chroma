import { Schema } from 'mongoose';
import db from '../../db';

const resetTokenDuration = '1d';

const passwordResetSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', index: true },
  token: { type: String, unique: true, index: true },
  createdAt: { type: Date, default: Date.now, expires: resetTokenDuration },
});

const PasswordReset = db.model('PasswordReset', passwordResetSchema);

export default PasswordReset;
