var express = require('express');
var router = express.Router();

var flavorsRepo = require('./../backend_manager').flavorsRepo

/* GET users listing. */
router.get('/', function(req, res, next) {
    flavorsRepo.getAll(function(result){
        res.render('flavours', { title: 'Flavours', flavors : result });
    });
});

module.exports = router;