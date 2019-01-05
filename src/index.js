import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import store from 'connect-mongo';
import db from './db';
import router from './router';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
app.use('*', (req, res) => res.redirect('/'));

const port = process.env.PORT || 3001;
app.listen(port, () => {
  /* eslint-disable-next-line no-console */
  console.log(`Server is listening at port: ${port}`);
});
