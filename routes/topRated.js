var express = require('express');
var router = express.Router();
var db = require("../models");
var MovieService = require("../services/movieService");
var movieService = new MovieService(db);
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
