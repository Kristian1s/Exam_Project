var express = require('express');
var router = express.Router();
var { writeDataToDb } = require('../public/javascripts/InsertDataToDb');

let flag = true;

router.get('/', async function (req, res, next) {
  if (flag) {
    await writeDataToDb();
    flag = false;
    res.render('index', { title: 'MovieVault', isAuthenticated: req.oidc.isAuthenticated() });
  } else {
    res.render('index', { title: 'MovieVault', isAuthenticated: req.oidc.isAuthenticated() });
  }
});



module.exports = router;
