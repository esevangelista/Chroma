import escapeStringRegexp from 'escape-string-regexp';
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

export const getArtwork = async (req, res) => {
  try {
    const { _id } = req.params;
    if (_id) {
      const artwork = await Artwork.findById(_id).populate(['artist', 'images']);
      delete artwork.artist.password;
      return res.status(200).json({
        success: true,
        message: 'Successfully fetched artwork.',
        artwork,
      });
    }
    return res.json(new BaseError(404, 'No id.'));
  } catch (err) {
    return res.json(new InternalServerError(err));
  }
};

export const getArtworks = async (req, res) => {
  try {
    const {
      artist,
      title,
      medium,
      minHeight,
      maxHeight,
      minWidth,
      maxWidth,
      minDepth,
      maxDepth,
      style,
      subject,
      artform,
      minPrice,
      maxPrice,
      status,
    } = req.query;
    const query = { };
    if (title) query.title = new RegExp(escapeStringRegexp(title), 'i');
    if (medium) query.medium = { $in: medium };
    if (style) query.style = new RegExp(escapeStringRegexp(style), 'i');
    if (artform) query.artform = new RegExp(`^${escapeStringRegexp(artform)}$`, 'i');
    if (subject) query.subject = { $in: subject };
    if (status) query.status = { $in: status };
    if (minPrice || maxPrice) {
      if (minPrice) query.price = { $gte: minPrice };
      if (maxPrice) query.price = { ...query.price, $lte: maxPrice };
    }
    if (maxHeight || minHeight) {
      if (maxHeight) query['dimensions.height'] = { ...query['dimensions.height'], $lte: maxHeight };
      if (minHeight) query['dimensions.height'] = { ...query['dimensions.height'], $gte: minHeight};
    }
    if (maxWidth || minWidth) {
      if (maxWidth) query['dimensions.width'] = { ...query['dimensions.width'], $lte: maxWidth };
      if (minWidth) query['dimensions.width'] = { ...query['dimensions.width'], $gte: minWidth };
    }
    if (maxDepth || minDepth) {
      if (maxDepth) query['dimensions.depth'] = { ...query['dimensions.depth'], $lte: maxDepth };
      if (minDepth) query['dimensions.depth'] = { ...query['dimensions.depth'], $gte: minDepth };
    }
    if (artist) {
      query.artist = {};
      query.artist._id = artist;
    }

    const options = {
      limit: +req.query.limit || 12,
      page: +req.query.page || 1,
      populate: ['artist', 'images'],
      sort: req.query.sort ? req.query.sort : { title: 1 },
    };
    const data = await Artwork.paginate(query, options);
    const artworks = data.docs;
    delete data.docs;
    const pagination = { ...data, limit: req.query.limit || 12};
    return res.status(200).json({
      success: true,
      message: 'Successfully retrieved artworks',
      artworks,
      pagination,
    });
  } catch (err) {
    return res.json(new InternalServerError(err));
  }
};
export const addImages = async (req, res) => {
  try {
    const { files } = req;
    if (!files || files.length === 0) {
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

export const updateArtwork = async (req, res) => {
  try {
    const { _id } = req.params;
    await Artwork.findByIdAndUpdate(_id, req.body);
    return res.status(200).json({
      success: true,
      message: 'Successfully updated artwork',
    });
  } catch (err) {
    return res.json(new InternalServerError(err));
  }
};

export const deleteArtwork = async (req, res) => {
  try {
    const { _id } = req.params;
    return res.status(200).json({
      success: true,
      message: 'Successfully deleted artwork',
    });
  } catch (err) {
    return res.json(new InternalServerError(err));
  }
};

// export const updateImages = async (req, res) => {
//   try {
//     const { files } = req;
//     const { _id } = req.params;
//     if (!files) {
//       return res.json(new BaseError(404, 'File upload error'));
//     }
//     const images = await Promise.all(files.map(file => addImage(file)));
//     await Artwork.findByIdAndUpdate(_id, { images });
//     const artwork = await Artwork.findById(_id);
//     return res.status(200).json({
//       success: true,
//       message: 'Successfully updated artwork',
//       artwork,
//     });
//   } catch (err) {
//     return res.json(new InternalServerError(err));
//   }
// };
