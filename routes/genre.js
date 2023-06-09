var express = require('express');
var router = express.Router();
var db = require("../models");
var GenreService = require("../services/genreService");
var genreService = new GenreService(db);




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
