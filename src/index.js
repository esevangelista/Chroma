import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import store from 'connect-mongo';
import db from './db';
import router from './router';

const app = express();

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
app.use('*', (req, res) => res.redirect('/'));

const corsOpt = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
};
app.use(corsOpt);


const port = process.env.PORT || 3001;
app.listen(port, () => {
  /* eslint-disable-next-line no-console */
  console.log(`Server is listening at port: ${port}`);
});

export default app;
