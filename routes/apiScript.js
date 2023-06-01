var express = require("express");
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

router.post("/genre", async function (req, res, next) {
  let genreArray = req.body.GenreArray;

  for (const genre of genreArray) {
    const genreExists = await genreService.find(genre);

    if (!genreExists) {
      await genreService.create(genre);
    }
  }
  res.sendStatus(200);
});

router.post("/year", async function (req, res, next) {
  let yearsArray = req.body.YearsArray;
  for (const year of yearsArray) {
    const yearExists = await yearService.find(year);

    if (!yearExists) {
      await yearService.create(year);
    }
  }

  res.sendStatus(200);
});

router.post("/rating", async function (req, res, next) {
  let ratingsArray = req.body.RatingsArray;
  for (const rating of ratingsArray) {
    const roundedRating = parseFloat(rating.toFixed(1));
    const ratingExists = await ratingService.findStartsWith(roundedRating);

    if (!ratingExists) {
      await ratingService.create(roundedRating);
    }
  }

  res.sendStatus(200);
});

router.post("/director", async function (req, res, next) {
  let directorArray = req.body.DirectorArray;
  for (const director of directorArray) {
    const directorExists = await directorService.find(director);
    if (!directorExists) {
     await directorService.create(director);
    }
  }

  res.sendStatus(200);
});

router.post("/actor", async function (req, res, next) {
  let actorsArray = req.body.ActorsArray;
  for (const actor of actorsArray) {
    const actorExists = await actorService.find(actor);

    if (!actorExists) {
      await actorService.create(actor);
    }
  }

  res.sendStatus(200);
});

router.post("/movie", async function (req, res, next) {
  let movieArray = req.body.MovieArray
  for (const movie of movieArray) {
    const movieExists = await movieService.findOne(movie.title);
    if (!movieExists) {
      const directorSearch = await directorService.find(movie.director);
      const directorId = directorSearch.dataValues.id;
      const yearKey = await yearService.find(movie.year);
      const roundedRating = parseFloat(movie.rating.toFixed(1));

      const ratingExists = await ratingService.findStartsWith(roundedRating);
      await movieService.create(movie.title,movie.plot,movie.runtime,movie.poster,directorId,yearKey.id,ratingExists.id);
    }
  }

  res.sendStatus(200);
});

router.post("/movieActors", async function (req, res, next) {
  let movieActorsArray = req.body.MovieActorArray;

  for (const movie of movieActorsArray) {
    const title = movie.title;
    const actors = movie.actors;
    const movieFind = await movieService.findOne(title);
    
    for (const actor of actors) {
      const findActor = await actorService.find(actor);
      const actorId = findActor.id;
      const movieId = movieFind.id;

      const checkForExistence = await actorService.existingRelationship(actorId, movieId);
      if (!checkForExistence) {
        await actorService.insertMovieActor(actorId, movieId);
      }
    }
  }
  
  res.sendStatus(204);
});




router.post("/movieGenres", async function (req, res, next) {
  let movieGenres = req.body.MovieGenres;
  console.log('movieGenres :', movieGenres);
  for(const movie of movieGenres){
    const title = movie.title;
    const genres = movie.genres;
    const movieFind = await movieService.findOne(title);
  
  for(const genre of genres){
    const findGenre = await genreService.find(genre);
    const genreId = findGenre.id;
    const movieId = movieFind.id;

    const checkForExistence = await genreService.existingRelationship(genreId, movieId);
    if(!checkForExistence){
      await genreService.insertMovieGenre(genreId, movieId);
    }
  }
  }
  
    res.sendStatus(204);
 
});
module.exports = router;
