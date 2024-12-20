const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const eqHelpers = require('handlebars-helpers')
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./controllers');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({
  helpers: {
    eq: eqHelpers,
  }
});

const DAY_EPOCH_MILLI = 3600000 * 24;

const sess = {
    secret: process.env.SESSION_SALT,
    cookie: {
      maxAge: DAY_EPOCH_MILLI * 7,
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Set middleware
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);


const IS_TEST_ENV = process.env.NODE_ENV === 'test';

if(!IS_TEST_ENV) {
  sequelize.sync({force: JSON.parse(process.env.SQL_FORCE)}).then(() => {
    app.listen(PORT, ()=> console.log('Now listening at port http://localhost:' + PORT));
  });
}

module.exports = app;

