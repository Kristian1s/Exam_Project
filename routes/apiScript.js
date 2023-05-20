var express = require('express');
var router = express.Router();
var db = require("../models");
var GenreService = require("../services/genreService");
var genreService = new GenreService(db);

router.post('/genre', async function(req, res, next) {
    let genre = req.body.genreName;
    await genreService.create(genre)

})

module.exports = router;
