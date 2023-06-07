require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var topRatedRouter = require('./routes/topRated');
var apiScriptRouter = require('./routes/apiScript')
var genreRouter = require('./routes/genre');
var movieRouter = require('./routes/movie');
var profileRouter = require('./routes/profile');
var db = require("./models");
db.sequelize.sync({ force: false })

var app = express();


const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: 'http://localhost:3000',
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: 'https://dev-hyspsddpa65uyong.us.auth0.com',
  secret: process.env.SECRET,
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.use(function (req, res, next) {
  res.locals.user = req.oidc.user;
  next();
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/topRated', topRatedRouter);
app.use('/apiScript', apiScriptRouter)
app.use('/genre', genreRouter);
app.use('/movie', movieRouter);
app.use('/profile', profileRouter) 
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
