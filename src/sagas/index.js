import { all } from 'redux-saga/effects';
import authSagas from './auth';
import userSagas from './users';
import productSagas from './products';
import artworkSagas from './artworks';
import cartSagas from './cart';
import wishlistSagas from './wishlist';
import artistSagas from './artists';
import orderSagas from './orders';
import transactionSagas from './transactions';
import notifSagas from './notifications';

export default function* rootSaga() {
  yield all([
    ...authSagas,
    ...userSagas,
    ...wishlistSagas,
    ...cartSagas,
    ...orderSagas,
    ...artworkSagas,
    ...artistSagas,
    ...productSagas,
    ...transactionSagas,
    ...notifSagas,
  ]);
}
