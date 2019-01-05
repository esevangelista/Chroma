import { Router } from 'express';

import userRouter from './entities/user/router';

const router = Router();

router.use(userRouter);

export default router;
