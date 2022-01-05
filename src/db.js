import mongoose from 'mongoose';
import config from './config';

mongoose.Promise = global.Promise;

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  // socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};

const db = mongoose.createConnection(config.db.uri, options);

// eslint-disable-next-line no-console
db.on('error', err => console.log(err));
// eslint-disable-next-line no-console
db.once('open', () => console.log('Successfully connected to MongoDB'));

export default db;
