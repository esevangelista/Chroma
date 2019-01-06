import { Router } from 'express';
import * as userController from './controller';
import { isAuthenticated, isAuthorized, passwordStrengthCheck } from '../../middlewares/users';

const router = Router();

router
  .route('/users')
  .post(passwordStrengthCheck, userController.addUser)
  .get(userController.getUsers);

router
  .route('/users/:_id')
  .put(
    isAuthenticated,
    isAuthorized,
    userController.updateUser,
  )
  .get(userController.getUser);

router
  .route('/verify-account/:confirmToken')
  .put(userController.verifyAccount);

router
  .route('/update-password/:_id')
  .put(
    isAuthenticated,
    isAuthorized,
    passwordStrengthCheck,
    userController.updatePassword,
  );

export default router;
