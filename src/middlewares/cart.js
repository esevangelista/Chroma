import Cart from '../entities/cart/model';
import { BaseError, InternalServerError } from '../utils/systemErrors';


export const isAuthorized = async (req, res, next) => {
  const { ownedBy } = req.params;
  if (req.session.user._id !== ownedBy) {
    return res.json(new BaseError(403, 'You are not authorized for this action.'));
  }
  return next();
};
