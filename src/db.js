import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const db = mongoose.createConnection('mongodb://localhost/chroma', { useNewUrlParser: true });

/* eslint-disable-next-line no-console */
db.on('error', err => console.log(err));
/* eslint-disable-next-line no-console */
db.once('open', () => console.log('Successfully connected to MongoDB'));

export default db;
