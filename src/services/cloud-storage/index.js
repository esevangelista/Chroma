import Multer from 'multer';
import { Storage } from '@google-cloud/storage';
import MulterGoogleCloudStorage from 'multer-google-storage';
import Path from 'path';
import shortid from 'shortid';
import Image from './model';
import * as config from '../../config';
import { InternalServerError } from '../../utils/systemErrors';


const storage = new Storage({
  projectId: config.gcp.project,
  keyFilename: Path.resolve(__dirname, './keyfile.json'),
});
const BUCKET = config.gcp.bucket;

const storageConfig = {
  autoRetry: true,
  keyFilename: Path.resolve(__dirname, './keyfile.json'),
  maxRetries: 3,
  projectId: config.gcp.project,
  bucket: BUCKET,
  filename: function getFilename(req, file, cb) {
    const filename = (file.originalname.toLowerCase()).replace(/[^a-z0-9_.-]+/g, '');
    cb(null, `${req.body.dest}/${shortid.generate()}-${Date.now().toString()}-${filename}`);
  },
};

export const uploadHandler = Multer({
  storage: new MulterGoogleCloudStorage(storageConfig),
});

export const multerUpload = async (req, res, next) => {
  uploadHandler.array('files')(req, res, (err) => {
    if (err) {
      return res.json(new InternalServerError(err));
    }
    return next();
  });
};

export async function addImage(files) {
  const { path, filename } = files;
  const image = new Image({
    publicURL: path,
    folder: filename.split('/')[0],
    filename,
  });
  await image.save();
  return (image);
}

export async function exists(filename) {
  const [bool] = await storage.bucket(BUCKET).file(filename).exists();
  return bool;
}

// add error handling
export async function deleteFile(filename) {
  const fileExists = await exists(filename);
  if (fileExists) {
    await storage.bucket(BUCKET).file(filename).delete();
  }
}

export async function deleteMultiple(files) {
  await files.forEach(file => deleteFile(file.filename));
}

export async function makeFilePublic(filename) {
  await storage.bucket(BUCKET).file(filename).makePublic();
}

export async function makeFilesPublic(files) {
  await files.forEach(file => makeFilePublic(file.filename));
}
