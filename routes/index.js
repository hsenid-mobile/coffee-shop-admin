var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Feedback', feedback : [{message : "Very good mocha", mobileNo : "tel:8982728"}, {message : "Very good espresso", mobileNo : "tel:89342728"}]});
});

module.exports = router;
