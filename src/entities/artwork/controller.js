import Artwork from './model';
import { BaseError, InternalServerError } from '../../utils/systemErrors';
import { addImage } from '../../services/cloud-storage/index';


export const addArtwork = async (req, res) => {
  try {
    const newArtwork = new Artwork(req.body);
    await newArtwork.save();
    return res.status(200).json({
      success: true,
      message: 'New artwork added.',
      artwork: newArtwork,
    });
  } catch (err) {
    return res.json(new InternalServerError(err));
  }
};

export const addImages = async (req, res) => {
  try {
    const { files } = req;
    if (!files) {
      return res.json(new BaseError(404, 'File upload error'));
    }
    const images = await Promise.all(files.map(file => addImage(file)));
    return res.status(200).json({
      success: true,
      message: 'Uploaded images!',
      images,
    });
  } catch (err) {
    return res.json(new InternalServerError(err));
  }
};

export const updateImages = async (req, res) => {
  try {
    const { files } = req;
    const { _id } = req.params;
    if (!files) {
      return res.json(new BaseError(404, 'File upload error'));
    }
    const images = await Promise.all(files.map(file => addImage(file)));
    await Artwork.findByIdAndUpdate(_id, { images });
    const artwork = await Artwork.findById(_id);
    return res.status(200).json({
      success: true,
      message: 'Successfully updated artwork',
      artwork,
    });
  } catch (err) {
    return res.json(new InternalServerError(err));
  }
};
