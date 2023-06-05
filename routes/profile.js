var express = require('express');
var router = express.Router();
var db = require("../models");
var GenreService = require("../services/genreService");
var genreService = new GenreService(db);
var YearService = require("../services/yearService");
var yearService = new YearService(db);
var DirectorService = require("../services/directorService");
var directorService = new DirectorService(db);
var MovieService = require("../services/movieService");
var movieService = new MovieService(db);
var ActorService = require("../services/actorService");
var actorService = new ActorService(db);
var RatingService = require("../services/ratingService");
var ratingService = new RatingService(db);
const { requiresAuth } = require('express-openid-connect');
const UserService = require('../services/userService');
const userService = new UserService(db);
/* GET home page. */
router.get('/', requiresAuth(), async function(req, res, next) {
  const movies = await movieService.getAll();
  res.render('profile', { title: 'MovieVault', Movies: movies, isAuthenticated: req.oidc.isAuthenticated()});
}
);

router.get('/:username', requiresAuth(), async function(req, res, next) {
  const movies = await movieService.getAll();
  const username = req.params.username;
  let findUser = await userService.findOne(username);
  if(findUser){
    res.render('profile', {user: findUser, isAuthenticated: req.oidc.isAuthenticated(), Movies: movies })
  }
  res.render('profile', { title: 'MovieVault', Movies: movies, isAuthenticated: req.oidc.isAuthenticated()});
}
);

router.post('/', requiresAuth(), async function(req, res, next) {
  const { nickname, age, bio, avatar } = req.body;

  const movies = await movieService.getAll();
  res.render("profile", { title: 'MovieVault', Movies: movies, isAuthenticated: req.oidc.isAuthenticated()});
});

module.exports = router;
