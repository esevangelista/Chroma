import { Router } from 'express';
import * as authController from './controller';
import { isVerified } from '../../middlewares/users';

const router = Router();

router
  .post('/login', isVerified, authController.login)
  .post('/logout', authController.logout)
  .post('/session', authController.session);

export default router;
