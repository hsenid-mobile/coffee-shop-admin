var express = require('express');
var router = express.Router();

var flavours = require('./../flavor_repo').flavors

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('flavours', { title: 'Flavours', flavors : flavours });
});

module.exports = router;