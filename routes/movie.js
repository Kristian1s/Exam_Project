var express = require('express');
var router = express.Router();
var db = require("../models");
var MovieService = require("../services/movieService");
var movieService = new MovieService(db);
var UserService = require('../services/userService');
var userService = new UserService(db);
var ReviewService = require("../services/reviewService");
var reviewService = new ReviewService(db);

const { requiresAuth } = require('express-openid-connect');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('movie', { title: 'MovieVault', isAuthenticated: req.oidc.isAuthenticated()});
})

router.get('/:title', async function(req, res, next) {
  const title = req.params.title;
  const movie = await movieService.find(title);
  let reviews = await reviewService.findManyWithMovieId(movie.id);


  if (req.oidc.isAuthenticated()) {
    const username = req.oidc.user.name;

 
    const userExists = await userService.find(username);
   


   
    if (userExists) {
      return res.render('movie', {title: 'MovieVault',Movie: movie,UserInfo: userExists,Reviews: reviews,isAuthenticated: req.oidc.isAuthenticated()});
    }

    return res.render('movie', {title: 'MovieVault',Movie: movie,UserInfo: false,Reviews: reviews,isAuthenticated: req.oidc.isAuthenticated()});
  }

  return res.render('movie', {title: 'MovieVault',Movie: movie,UserInfo: false,Reviews: false,isAuthenticated: req.oidc.isAuthenticated()});
});


router.post('/review',requiresAuth(), async function(req, res, next) {

const {rating, review, UserName, MovieId} = req.body;

const user = await userService.find(UserName);
const userId = user.id;

const movieReview = await reviewService.create(review,rating,MovieId, userId);
res.status(200).json({ message: 'Review posted' });
})

module.exports = router;
