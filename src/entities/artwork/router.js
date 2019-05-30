import { Router } from 'express';
import * as artworkController from './controller';
import { isAuthenticated } from '../../middlewares/users';
import { isArtist, validateArtwork, deletePreviousImages } from '../../middlewares/artwork';
import { multerUpload } from '../../services/cloud-storage/index';

const router = Router();

router
  .route('/artwork')
  .post(
    isAuthenticated,
    isArtist,
    validateArtwork,
    artworkController.addArtwork,
  );


router
  .route('/upload-artwork-images')
  .post(
    isAuthenticated,
    isArtist,
    multerUpload,
    artworkController.addImages,
  );

router
  .route('/update-artwork-images/:_id')
  .put(
    isAuthenticated,
    isArtist,
    deletePreviousImages,
    multerUpload,
    artworkController.updateImages,
  );

// router
//   .route('/update-artwork/:_id')
//   .put(
//     isAuthenticated,
//     isArtist,
//     artworkController.updateArtwork,
//   );

export default router;
