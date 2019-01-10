import { Router } from 'express';
import * as passwordController from './controller';
import { isVerified, passwordStrengthCheck } from '../../middlewares/users';

const router = Router();

router
  .route('/password-reset')
  .post(isVerified, passwordController.sendReset);

router
  .route('/password-reset/:token')
  .get(passwordController.verifyResetToken)
  .post(passwordStrengthCheck, passwordController.resetPassword);

export default router;
