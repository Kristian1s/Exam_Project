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


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('movie', { title: 'MovieDatabase'});
})

router.get('/:title', async function(req, res, next) {
  const title = req.params.title;
     const movie = await movieService.find(title);
     

    res.render('movie', { title: 'MovieDatabase', Movie: movie });
  }
);

module.exports = router;
