'use strict';

var yeast = require('yeast');

var express = require('express');
var router = express.Router();
var tapApi = require("tap-telco-api");

var feedbackManager = require('./../backend_manager').feedbackRepo;

feedbackManager.saveToRepo({key : "1", message : "Very good mocha", mobileNo:"tel:8928272828", date : new Date()});
feedbackManager.saveToRepo({key : "2", message : "Very good latte", mobileNo:"tel:8128272828", date : new Date()});
feedbackManager.saveToRepo({key : "3", message : "Very good espresso", mobileNo:"tel:8898272828", date : new Date()});

/* GET home page. */
router.get('/', function(req, res, next) {
  feedbackManager.getAll(function(result){
    res.render('index', { title: 'Feedback', feedback : result, record_no : 1})
  })
});

router.post('/sms', function(req, res, next){
  res.send(tapApi.sms.successResponse);
  next()
}, function(req, res){
    feedbackManager.saveToRepo({key: yeast(), message:req.body.message, mobileNo:req.body.sourceAddress, date:new Date()})
});

module.exports = router;