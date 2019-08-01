import { Schema } from 'mongoose';
import db from '../../db';

const notificationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: String,
  link: String,
  read: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const Notification = db.model('Notification', notificationSchema);

export default Notification;
