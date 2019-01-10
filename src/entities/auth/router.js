import { Router } from 'express';
import * as authController from './controller';
import { isAuthenticated, isVerified } from '../../middlewares/users';

const router = Router();

router
  .post('/login', isVerified, authController.login)
  .post('/logout', isVerified, isAuthenticated, authController.logout)
  .post('/session', isVerified, isAuthenticated, authController.session);

export default router;
