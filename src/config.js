require('dotenv').config();

module.exports = {
  urls: {
    client: process.env.CLIENT_URL || 'http://localhost:3001',
  },
  db: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/chroma',
    test: 'mongodb://localhost:27017/chroma_test',
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
