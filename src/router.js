import { Router } from 'express';
import userRouter from './entities/user/router';
import authRouter from './entities/auth/router';
import passwordResetRouter from './services/password-reset/router';
import artworkRouter from './entities/artwork/router';
import cartRouter from './entities/cart/router';
import wishlistRouter from './entities/wishlist/router';
import orderRouter from './entities/order/router';
import notificationRouter from './entities/notifications/router';

const router = Router();

router.use(authRouter);
router.use(userRouter);
router.use(passwordResetRouter);
router.use(artworkRouter);
router.use(cartRouter);
router.use(wishlistRouter);
router.use(orderRouter);
router.use(notificationRouter);

export default router;
