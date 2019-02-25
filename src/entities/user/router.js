import { Router } from 'express';
import * as userController from './controller';
import { alreadyExists, deletePreviousImage, isAuthenticated, isAuthorized, isVerifiedID, passwordStrengthCheck } from '../../middlewares/users';
import { multerUpload } from '../../services/cloud-storage/index';

const router = Router();

router
  .route('/users')
  .post(alreadyExists, passwordStrengthCheck, userController.addUser)
  .get(userController.getUsers);


router
  .route('/users/:_id')
  .put(
    isVerifiedID,
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
    isVerifiedID,
    isAuthenticated,
    isAuthorized,
    passwordStrengthCheck,
    userController.updatePassword,
  );

router
  .route('/upload-profile-image/:_id')
  .put(
    isVerifiedID,
    isAuthenticated,
    isAuthorized,
    deletePreviousImage,
    multerUpload,
    userController.uploadProfile,
  );

export default router;
