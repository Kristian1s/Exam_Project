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
router.get('/', async function(req, res, next) {
     const top100Movies = await movieService.getAll();
     console.log('top100Movies :', top100Movies);

    res.render('profile', { title: 'MovieDatabase', Movies: top100Movies });
  }
);

module.exports = router;
