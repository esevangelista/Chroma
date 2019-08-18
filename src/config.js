require('dotenv').config();

module.exports = {
  urls: {
    client: 'https://artbychroma.com' || 'http://localhost:3000',
  },
  db: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/chroma',
    test: 'mongodb://localhost:27017/chroma',
  },
  app: {
    port: process.env.PORT || 3001,
  },
  zxcvbnOptions: {
    minimumAllowedScore: 3,
  },
  gcp: {
    project: process.env.GCLOUD_PROJECT,
    bucket: process.env.GCS_BUCKET,
    keyfile: process.env.GCS_KEYFILE,
  },
};
