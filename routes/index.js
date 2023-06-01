var express = require('express');
var router = express.Router();
var {writeDataToDb} = require('../public/javascripts/InsertDataToDb');


let loadedMovies;
router.get('/', async function(req, res, next) {
  if (loadedMovies) {
    res.render('index', { title: 'MovieDatabase' });
res.end();
  }else{
 try {
    await writeDataToDb();
    res.render('index', { title: 'MovieDatabase' });
  } catch (error) {
    console.error('Error writing data to the database:', error);
   
  }}
});

module.exports = router;
