import { Router } from 'express';
import * as cartController from './controller';
import { isAuthenticated } from '../../middlewares/users';
import { isAuthorized } from '../../middlewares/cart';

const router = Router();

router
  .route('/cart/:ownedBy')
  .get(
    isAuthenticated,
    isAuthorized,
    cartController.getCart,
  )
  .put(
    isAuthenticated,
    isAuthorized,
    cartController.updateCart,
  );

export default router;
