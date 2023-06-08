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
var UserService = require("../services/userService");
var userService = new UserService(db);

/* GET home page. */
router.get('/', async function(req, res, next) {
  const movies = await movieService.getAll();
if(req.oidc.user){
  const username = req.oidc.user.name;
  const userHasProfile = await userService.find(username);
  if(userHasProfile){
    res.render('topRated', { title: 'MovieVault', Movies: movies, HasProfile: userHasProfile, isAuthenticated: req.oidc.isAuthenticated()});
  }
}
res.render('topRated', { title: 'MovieVault', Movies: movies, HasProfile: false, isAuthenticated: req.oidc.isAuthenticated()});
  }
);

module.exports = router;
