var express = require('express');
var router = express.Router();
/* const {getData} = require("../public/javascripts/ApiWrite"); */

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    let pages = 5;
    let movies = [];
    for (let number = 0; number < pages; number++) {
      const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=6a1bd996ef94ac5a2174249827b1e01e&language=en-US&page=${number}`);
      const data = await response.json();
      movies = movies.concat(data.results);
    }
    res.render('top100', { title: 'MovieDatabase', movies: movies });
  } catch (error) {
    console.error('Error retrieving data:', error);
    next(error);
  }
});

module.exports = router;
