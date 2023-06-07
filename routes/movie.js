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
var ReviewService = require("../services/reviewService");
var UserService = require('../services/userService');
var userService = new UserService(db);
var reviewService = new ReviewService(db);
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('movie', { title: 'MovieVault', isAuthenticated: req.oidc.isAuthenticated()});
})

router.get('/:title', async function(req, res, next) {
  //title to acess
  
  const title = req.params.title;
 
     const movie = await movieService.find(title);
     let review = await reviewService.findWithMovieId(movie.id)
    
     //If user is signed in
     if (req.oidc.isAuthenticated()){
     const username = req.oidc.user.name;
     //Check if user has a profile
     const userExists = await userService.find(username);
     console.log('userExists :', userExists);

     //if user has a profile
     if(userExists){
      res.render('movie', { title: 'MovieVault', Movie: movie, UserInfo: userExists, Reviews: review, isAuthenticated: req.oidc.isAuthenticated() });
     }
     res.render('movie', { title: 'MovieVault', Movie: movie, UserInfo: false, Reviews: review, isAuthenticated: req.oidc.isAuthenticated() });
    }
    res.render('movie', { title: 'MovieVault', Movie: movie, UserInfo: false, Reviews: false, isAuthenticated: req.oidc.isAuthenticated() });
  }
);


router.post('/review', async function(req, res, next) {
const {rating, review, UserName, MovieId} = req.body;
console.log('{rating, review, UserName, MovieId} :', {rating, review, UserName, MovieId});
const user = await userService.find(UserName);
const userId = user.id;
const movieReview = await reviewService.create(review,rating,MovieId, userId);
res.status(200).json({ message: 'Review posted' });
})

module.exports = router;
