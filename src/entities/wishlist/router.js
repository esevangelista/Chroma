import { Router } from 'express';
import * as wishController from './controller';
import { isAuthenticated } from '../../middlewares/users';
import { isAuthorized } from '../../middlewares/cart';

const router = Router();

router
  .route('/wishlist/:ownedBy')
  .get(
    isAuthenticated,
    isAuthorized,
    wishController.getWishlist,
  )
  .put(
    isAuthenticated,
    isAuthorized,
    wishController.updateWishlist,
  );
router
  .route('/wishlist-count/:_id')
  .get(wishController.getWishlistCount);

export default router;
