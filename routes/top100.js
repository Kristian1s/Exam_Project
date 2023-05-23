var express = require('express');
var router = express.Router();
 const {GetMovieDetails} = require("../public/javascripts/GetMovieDetails"); 

/* GET home page. */
router.get('/', async function(req, res, next) {
     const movieDetails = await GetMovieDetails();
    res.render('top100', { title: 'MovieDatabase', movies: movieDetails });
  }
);

module.exports = router;
