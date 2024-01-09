const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./controllers');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({});

const sess = {
    secret: process.env.SESSION_SALT,
    cookie: {
      maxAge: 600000,
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

sequelize.sync({force: JSON.parse(process.env.SQL_FORCE)}).then(() => {
    app.listen(PORT, ()=> console.log('Now listening at port ' + PORT));
})
