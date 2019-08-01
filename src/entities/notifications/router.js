import { Router } from 'express';
import * as notificationController from './controller';
import { isAuthenticated } from '../../middlewares/users';

const router = Router();

router
  .route('/notifications/:user')
  .get(
    isAuthenticated,
    notificationController.getNotifications,
  )
  .put(
    isAuthenticated,
    notificationController.readNotifications,
  );

export default router;
