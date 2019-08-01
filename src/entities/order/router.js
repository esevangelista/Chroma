import { Router } from 'express';
import * as orderController from './controller';
import { isAuthenticated } from '../../middlewares/users';
import { isAuthorized, isAuthorizedTransaction } from '../../middlewares/cart';
import { multerUpload } from '../../services/cloud-storage/index';

const router = Router();

router
  .route('/orders/:ownedBy')
  .post(
    isAuthenticated,
    isAuthorized,
    orderController.addOrder,
  )
  .get(
    isAuthenticated,
    isAuthorized,
    orderController.getOrders,
  );

router.route('/transactions/:seller')
  .get(
    isAuthenticated,
    isAuthorizedTransaction,
    orderController.getTransactions,
  );
router
  .route('/upload-shipping-receipt/:_id')
  .put(
    isAuthenticated,
    multerUpload,
    orderController.uploadShippingReceipt,
  );

router
  .route('/upload-proof-of-payment/:_id')
  .put(
    isAuthenticated,
    multerUpload,
    orderController.uploadProofPayment,
  );

router
  .route('/complete-transaction/:_id')
  .put(
    isAuthenticated,
    orderController.finishTransaction,
  );

router
  .route('/cancel-order/:_id')
  .put(
    isAuthenticated,
    orderController.cancelOrder,
  );

export default router;
