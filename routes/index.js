var express = require('express');
var router = express.Router();
var { writeDataToDb } = require('../public/javascripts/CollectData/InsertDataToDb');
var db = require("../models");
var MovieService = require("../services/movieService");
var movieService = new MovieService(db);
const ReviewService = require("../services/reviewService");
const reviewService = new ReviewService(db);

function getRandomNumber() {
  return Math.floor(Math.random() * 200) + 1;
}

let flag = true;

router.get('/', async function (req, res, next) {
  if (flag) {
    await writeDataToDb();
    flag = false;
  }
  const randomId = getRandomNumber();
  const top10RatedMovies = await movieService.findTen();
  const recentReviews = await reviewService.findRecentReviews();
  const findGoodReviewedMovies = await reviewService.findHighReview();
  const featuredMovie = await movieService.findRandom(randomId);

  let combinedData = {
    highlyRatedMovie: null,
    movieDetails: null
  };

  if (recentReviews) {
    if (findGoodReviewedMovies.length > 0) {
      const randomIndex = Math.floor(Math.random() * findGoodReviewedMovies.length);
      const randomMovie = findGoodReviewedMovies[randomIndex];
      const movieDetails = await movieService.find(randomMovie.Movie.Title); 

      combinedData = {
        highlyRatedMovie: randomMovie,
        movieDetails: movieDetails
      };
    }
  }
  res.render('index', {title: 'MovieVault',Top10: top10RatedMovies, FeaturedMovie: featuredMovie, Reviews: recentReviews,GoodMovie: combinedData,isAuthenticated: req.oidc.isAuthenticated(),
  
  });
});


module.exports = router;
