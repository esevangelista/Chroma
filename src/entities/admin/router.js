import { Router } from 'express';
import * as adminController from './controller';

const router = Router();

router
  .post('/admin/login', adminController.login)
  .post('/admin/logout', adminController.logout)
  .post('/admin/session', adminController.session);

router
  .get('/admin/users', adminController.isAdmin, adminController.getUsers);

router
  .get('/admin/users/:_id', adminController.isAdmin, adminController.getUser);

router
  .get('/admin/transactions/:_id', adminController.isAdmin, adminController.getTransactions);

router
  .get('/admin/transaction/:_id', adminController.isAdmin, adminController.getTransaction);

export default router;
