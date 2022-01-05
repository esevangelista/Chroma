import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import store from 'connect-mongo';
import * as favicon from 'serve-favicon';
import path from 'path';
import cors from 'cors';
import cron from 'node-cron';
import db from './db';
import router from './router';
import { updateOverdueTransactions } from './utils/overdueChecker';

require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const MongoStore = store(session);
const sessionStore = new MongoStore({
  mongooseConnection: db,
});


app.use(session({
  key: 'chroma',
  secret: 'chroma',
  resave: true,
  saveUninitialized: true,
  store: sessionStore,
  checkExpirationInterval: 9000000,
  expiration: 86400000,
}));
app.use('/api', router);
// app.use('*', (req, res) => res.redirect('/'));

cron.schedule('0 0 19 * 0-7', () => {
  updateOverdueTransactions();
});

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, '../build')));
  app.use(favicon(path.join(__dirname, '../build', 'chroma.ico')));
}

const port = process.env.PORT || 3001;
app.listen(port, () => {
  /* eslint-disable-next-line no-console */
  console.log(`Server is listening at port: ${port}`);
});

export default app;
