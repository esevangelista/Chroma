require('dotenv').config();

module.exports = {
  urls: {
    client: process.env.CLIENT_URL,
  },
  db: {
    uri: process.env.MONGODB_URI,
  },
  app: {
    port: process.env.PORT,
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
