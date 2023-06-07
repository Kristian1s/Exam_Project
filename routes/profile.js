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
const WatchlistService = require('../services/watchlistService');
const watchlistService = new WatchlistService(db);
const ReviewService = require("../services/reviewService");
const reviewService = new ReviewService(db);




//Profile loaded for non signed in users
 router.get('/',  async function(req, res, next) {
  const movies = await movieService.getAll();
  res.render('profile', { title: 'MovieVault', UserInfo: false, Movies: movies,WatchList: false, isAuthenticated: req.oidc.isAuthenticated()});
}
); 



//Profile loaded for signed in users
router.get('/:username', requiresAuth(), async function(req, res, next) {
  const user = req.params.username;
  const movies = await movieService.getAll();
  const userExistsInDb = await userService.find(user);
  if(userExistsInDb){
    const userId = userExistsInDb.id;
    const watchList = await watchlistService.findWithUserId(userId);
    res.render("profile" , {title:'MovieVault', UserInfo: userExistsInDb, Movies: movies, WatchList: watchList, isAuthenticated: req.oidc.isAuthenticated()})
  }else{
  res.render('profile', { title: 'MovieVault', UserInfo: false, Movies: movies, WatchList: false, isAuthenticated: req.oidc.isAuthenticated()});
}
}
); 



router.post('/', requiresAuth(), async function(req, res, next) {
  const username = req.oidc.user.name;
  const { nickname, age, bio, avatar } = req.body.FormData; 
  const movies = await movieService.getAll();
const userExists = await userService.find(username);
if(userExists){
  const updatedUser = await userService.update(username, nickname, avatar, age, bio);
  res.redirect(`/profile/${username}`);
}else{
const createdUser = await userService.create(username, nickname, avatar, age, bio)
res.redirect(`/profile/${username}`);
}});

router.delete("/", requiresAuth(), async function(req, res, next) {
  const username = req.body.Username;
  let user = await userService.find(username);
  let userId = user.id;
  let usersWatchlist = await watchlistService.findWithUserId(userId)
  if(usersWatchlist){
   let destroyWatchlist = await watchlistService.destroyWatchlist(userId)
  }
  let userReview = await reviewService.findWithUserId(userId);
  if(userReview){
  await reviewService.destroyReviews(userId)
}
  await userService.deleteProfile(username);
  
  res.status(200).json({ message: 'Profile deleted' });
});


router.post("/watchlist", requiresAuth(), async function(req, res, next) {
  const {MovieId, UserName} = req.body;

   const user = await userService.find(UserName);
  const userId = user.id;
  const makeWatchlist = await watchlistService.create(MovieId, userId,)
  res.status(200).json({ message: 'Movie Added to watchlist' }); 
});

module.exports = router;
