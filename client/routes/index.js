var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
  //from the views folder
  res.render('index', { title: 'Login' });
});

module.exports = router;
