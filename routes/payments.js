'use strict';

var yeast = require('yeast');

var express = require('express');
var router = express.Router();

var paymentsManager = require('./../backend_manager').promotionRepo;

paymentsManager.saveToRepo({key : yeast(), mobileNo: "tel:878716233",amount : "10", priority : "1", date : new Date()});
paymentsManager.saveToRepo({key : yeast(), mobileNo: "tel:878716244",amount : "10", priority : "1", date : new Date()});
paymentsManager.saveToRepo({key : yeast(), mobileNo: "tel:878716212",amount : "10", priority : "1", date : new Date()});

/* GET users listing. */
router.get('/', function(req, res, next) {
    paymentsManager.getAll(function(result){
        res.render('payments', { title: 'Payments', payments : result});
    });
});

module.exports = router;