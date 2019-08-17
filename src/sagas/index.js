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
import chatSagas from './chat';
import adminSagas from './admin';

export default function* rootSaga() {
  yield all([
    ...adminSagas,
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
    ...chatSagas,
  ]);
}
