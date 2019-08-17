import { Router } from 'express';
import * as artworkController from './controller';
import { isAuthenticated } from '../../middlewares/users';
import { isArtist, validateArtwork, canEdit } from '../../middlewares/artwork';
import { multerUpload } from '../../services/cloud-storage/index';

const router = Router();

router
  .route('/artwork')
  .post(
    isAuthenticated,
    isArtist,
    validateArtwork,
    artworkController.addArtwork,
  )
  .get(artworkController.getArtworks);


router
  .route('/upload-artwork-images')
  .post(
    isAuthenticated,
    isArtist,
    multerUpload,
    artworkController.addImages,
  );

// router
//   .route('/update-artwork-images/:_id')
//   .put(
//     isAuthenticated,
//     isArtist,
//     multerUpload,
//     artworkController.updateImages,
//   );

router
  .route('/artwork/:_id')
  .get(artworkController.getArtwork)
  .put(
    isAuthenticated,
    isArtist,
    canEdit,
    artworkController.updateArtwork,
  );
export default router;
