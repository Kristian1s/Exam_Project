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



router.get('/', async function(req, res, next) {
     const genres = await genreService.getAll();
    res.render('genres', { title: 'MovieVault', Genres: genres, isAuthenticated: req.oidc.isAuthenticated() });
  }
);



router.get('/:genre', async function(req, res, next) {
  const Genres = req.params.genre;
const genre = await genreService.find(Genres);

const findMoviesWithGenre = await genreService.findMoviesWithGenreId(genre.id);
 res.render('genre', { title: 'MovieVault', Genre: Genres, GenreMovies: findMoviesWithGenre, isAuthenticated: req.oidc.isAuthenticated() }); 
}
);

module.exports = router;
