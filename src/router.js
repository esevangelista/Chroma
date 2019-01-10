import { Router } from 'express';
import userRouter from './entities/user/router';
import authRouter from './entities/auth/router';
import passwordResetRouter from './services/password-reset/router';

const router = Router();

router.use(authRouter);
router.use(userRouter);
router.use(passwordResetRouter);

export default router;
