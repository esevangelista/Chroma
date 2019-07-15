import { all } from 'redux-saga/effects';
import authSagas from './auth';
import userSagas from './users';
import productSagas from './products';
import artworkSagas from './artworks';
import cartSagas from './cart';
import wishlistSagas from './wishlist';
import artistSagas from './artists';


export default function* rootSaga() {
  yield all([
    ...authSagas,
    ...userSagas,
    ...wishlistSagas,
    ...cartSagas,
    ...artworkSagas,
    ...artistSagas,
    ...productSagas,
  ]);
}
