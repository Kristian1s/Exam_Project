var express = require('express');
var router = express.Router();
var db = require("../models");
var GenreService = require("../services/genreService");
var genreService = new GenreService(db);
var YearService = require('../services/yearService');
var yearService = new YearService(db);
var DirectorService = require('../services/directorService');
var directorService = new DirectorService(db);
var MovieService = require('../services/movieService');
var movieService = new MovieService(db);
var ActorService = require('../services/actorService');
var actorService = new ActorService(db);
var RatingService = require('../services/ratingService');
var ratingService = new RatingService(db);

router.post('/genre', async function(req, res, next) {
    let genre = req.body.genreName;
    const genreExists = await genreService.find(genre);
  
    if (!genreExists) {
      await genreService.create(genre);
      res.sendStatus(200); 
    } else {
      res.sendStatus(204);
    }
  });

  router.post('/year', async function(req, res, next) {
    let year = req.body.Year;
    const yearExists = await yearService.find(year);
  
    if (!yearExists) {
      await yearService.create(year);
      res.sendStatus(200); 
    } else {
      res.sendStatus(204);
    }
  });

  router.post('/rating', async function(req, res, next) {
    let rating = req.body.Rating;
    const ratingExists = await ratingService.find(rating);
  
    if (!ratingExists) {
      await ratingService.create(rating);
      res.sendStatus(200); 
    } else {
      res.sendStatus(204);
    }
  });

  router.post('/director', async function(req, res, next) {
    let director = req.body.Name;
    const directorExists = await directorService.find(director);
  
    if (!directorExists) {
      await directorService.create(director);
      res.sendStatus(200); 
    } else {
      res.sendStatus(204);
    }
  });



  router.post('/actor', async function(req, res, next) {
    let name = req.body.ActorName;
    const actorExists = await actorService.find(name);
  
    if (!actorExists) {
      await actorService.create(name);
      res.sendStatus(200); 
    } else {
      res.sendStatus(204);
    }
  });

  router.post('/movie', async function(req, res, next) {
    let {Title, Plot, Runtime, Poster, Director, Genre, Year, Rating} = req.body;
    const movieExists = await movieService.find(Title);
    const directorKey = await directorService.find(Director);
    const yearKey = await yearService.find(Year);
    const ratingKey = await ratingService.find(Rating);
    const genreIDs = [];
    for (const genre of Genre) {
      const foundGenre = await genreService.find(genre);
      if (foundGenre) {
        genreIDs.push(foundGenre.id);
      }
    }
    if (!movieExists) {
      await movieService.create(Title, Plot, Runtime, Poster, directorKey.id, yearKey.id, ratingKey.id);
      res.sendStatus(200); 
    } else {
      res.sendStatus(204);
    }
  });
module.exports = router;
