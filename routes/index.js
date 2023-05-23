var express = require('express');
var router = express.Router();
var {writeDataToDb} = require('../public/javascripts/InsertDataToDb');
/* GET users listing. */
router.get('/', function(req, res, next) {
  writeDataToDb();
  res.render('index',{ title: 'MovieDatabase'});
});

module.exports = router;
