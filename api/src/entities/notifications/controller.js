import Notification from './model';
import { InternalServerError } from '../../utils/systemErrors';

export async function createNotification(user, content, link) {
  const notification = new Notification({
    user,
    content,
    link,
  });
  await notification.save();
}

export const getNotifications = async (req, res) => {
  try {
    const { user } = req.params;
    const notifications = await Notification.find({ user });
    return res.status(200).json({
      success: true,
      message: 'Successfully retrieved notifications',
      notifications,
    });
  } catch (err) {
    return res.json(new InternalServerError(err));
  }
};

export const readNotifications = async (req, res) => {
  try {
    const { user } = req.params;
    await Notification.updateMany(
      { user },
      { $set: { read: true } },
    );
    const notifications = await Notification.find({ user });
    return res.status(200).json({
      success: true,
      message: 'Successfully retrieved notifications',
      notifications,
    });
  } catch (err) {
    return res.json(new InternalServerError(err));
  }
};
