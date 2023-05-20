var express = require('express');
var router = express.Router();
 const {get100Titles, storeMovieDetails} = require("../public/javascripts/ApiWrite"); 

/* GET home page. */
router.get('/', async function(req, res, next) {
     const movieDetails = await storeMovieDetails();
    res.render('top100', { title: 'MovieDatabase', movies: movieDetails });
  }
);

module.exports = router;
