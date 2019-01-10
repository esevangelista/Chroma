import { Router } from 'express';
import userRouter from './entities/user/router';
import authRouter from './entities/auth/router';

const router = Router();

router.use(authRouter);
router.use(userRouter);

export default router;
