import { Router } from 'express';
import userRouter from './entities/user/router';
import authRouter from './entities/auth/router';
import passwordResetRouter from './services/password-reset/router';
import artworkRouter from './entities/artwork/router';

const router = Router();

router.use(authRouter);
router.use(userRouter);
router.use(passwordResetRouter);
router.use(artworkRouter);

export default router;
