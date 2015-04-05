var express = require('express');
var router = express.Router();

var flavorsRepo = require('./../backend_manager').flavorsRepo

flavorsRepo.saveToRepo({key : "1", name : "Espresso", price : "285Rs"});
flavorsRepo.saveToRepo({key : "2", name : "Cappuccino", price : "310Rs"});
flavorsRepo.saveToRepo({key : "3", name : "Americano", price : "290Rs"});
flavorsRepo.saveToRepo({key : "4", name : "Caffe Latte", price : "415Rs"});
flavorsRepo.saveToRepo({key : "5", name : "Caf au Lait", price : "395Rs"});
flavorsRepo.saveToRepo({key : "6", name : "Mochachino", price : "520Rs"});
flavorsRepo.saveToRepo({key : "7", name : "Caramel Macchiato", price : "495Rs"});


/* GET users listing. */
router.get('/', function(req, res, next) {
    flavorsRepo.getAll(function(result){
        res.render('flavours', { title: 'Flavours', flavors : result });
    });
});

module.exports = router;