import { Router } from 'express';
import * as userController from './controller';

const router = Router();

router
  .route('/users')
  .post(userController.addUser);

export default router;
