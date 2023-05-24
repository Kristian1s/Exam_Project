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
  let genre = req.body.genreName;
  const genreExists = await genreService.find(genre);

  if (!genreExists) {
    await genreService.create(genre);
    res.sendStatus(200);
  } else {
    res.sendStatus(204);
  }
});

router.post("/year", async function (req, res, next) {
  let year = req.body.Year;
  const yearExists = await yearService.find(year);

  if (!yearExists) {
    await yearService.create(year);
    res.sendStatus(200);
  } else {
    res.sendStatus(204);
  }
});

router.post("/rating", async function (req, res, next) {
  let rating = parseFloat(req.body.Rating);
  //Issues with finding float, focus on first decimal
  const roundedRating = parseFloat(rating.toFixed(1));
  const ratingExists = await ratingService.findStartsWith(roundedRating);
  if (ratingExists) {
    res.sendStatus(204);
  } else {
    await ratingService.create(roundedRating);
    res.sendStatus(200);
  }
});

router.post("/director", async function (req, res, next) {
  let director = req.body.Name;
  const directorExists = await directorService.find(director);

  if (!directorExists) {
    await directorService.create(director);
    res.sendStatus(200);
  } else {
    res.sendStatus(204);
  }
});

router.post("/actor", async function (req, res, next) {
  let name = req.body.ActorName;
  const actorExists = await actorService.find(name);

  if (!actorExists) {
    await actorService.create(name);
    res.sendStatus(200);
  } else {
    res.sendStatus(204);
  }
});

router.post("/movie", async function (req, res, next) {
  let { Title, Plot, Runtime, Poster, Director, Year, Rating } =req.body;
  let rating = parseFloat(Rating);
  const movieExists = await movieService.findOne(Title);

  if (!movieExists) {
    const directorSearch = await directorService.find(Director);
    const yearKey = await yearService.find(Year);
    const roundedRating = parseFloat(rating.toFixed(1));
    const ratingExists = await ratingService.findStartsWith(roundedRating);

    await movieService.create(Title,Plot,Runtime,Poster,directorSearch.id,yearKey.id,ratingExists.id);
    res.sendStatus(200);
    } else {
      res.sendStatus(204);
    } 
});





router.post("/movieActors", async function (req, res, next) {
  let {Actors,Title } = req.body;
  let movieFind = await movieService.findOne(Title);
  let checkForEntry = await actorService.findInstance(movieFind.id);
    if(!checkForEntry){
  Actors.forEach(async function(actor){
    let actorFind = await actorService.find(actor);
    let actorInsert = await actorService.insertMovieActor(actorFind.id, movieFind.id);
  })
  res.sendStatus(200);
}else {
    res.sendStatus(204);
  }    
});


router.post("/movieGenres", async function (req, res, next) {
  let {Genres ,Title } = req.body;
  let movieFind = await movieService.findOne(Title);
  let checkForEntry = await genreService.findInstance(movieFind.id);
    if(!checkForEntry){
  Genres.forEach(async function(genre){
    let genreFind = await genreService.find(genre);
    let genreInsert = await genreService.insertMovieGenre(genreFind.id, movieFind.id);
  })
  res.sendStatus(200);
}else {
    res.sendStatus(204);
  }    
});
module.exports = router;
