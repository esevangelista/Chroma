import Artwork from '../entities/artwork/model';
import Image from '../services/cloud-storage/model';
import { BaseError, InternalServerError } from '../utils/systemErrors';
import { deleteMultiple } from '../services/cloud-storage/index';


export const isArtist = async (req, res, next) => {
  if (!req.session.user.isArtist) {
    return res.json(new BaseError(403, 'User is not an artist!'));
  }
  return next();
};

export const validateArtwork = async (req, res, next) => {
  const reqdKeys =
    [
      'artist',
      'title',
      'medium',
      'dimensions',
      'style',
      'artform',
      'materials',
      'price',
      'status',
      'quantity',
      'images',
    ];
  const dimensionKeys = ['height', 'width', 'depth', 'unitOfMeasurement'];
  if (!Object.keys(req.body).includes(...reqdKeys)) {
    return res.json(new BaseError(400, 'Missing required info.'));
  }
  if (!Object.keys(req.body.dimensions).includes(...dimensionKeys)) {
    return res.json(new BaseError(400, 'Missing required dimension info.'));
  }
  return next();
};

export const deletePreviousImages = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const art = await Artwork.findById(_id).populate('images');
    if (art.images) {
      await Promise.all([
        deleteMultiple(art.images),
        art.images.forEach(img => Image.findByIdAndRemove({ _id: img._id })),
      ]);
      art.findByIdAndUpdate(_id, { images: null });
    }
    return next();
  } catch (err) {
    return res.json(new InternalServerError(err));
  }
};

