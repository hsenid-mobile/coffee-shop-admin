'use strict';

var yeast = require('yeast');

var express = require('express');
var router = express.Router();

var paymentsManager = require('./../backend_manager').promotionRepo;
var flavors = require('./../flavor_repo').flavors

var ussd = require("tap-telco-api").ussd

var transport = require("tap-telco-api").transport

paymentsManager.saveToRepo({key : yeast(), mobileNo: "tel:878716233",amount : "10", priority : "1", date : new Date()});
paymentsManager.saveToRepo({key : yeast(), mobileNo: "tel:878716244",amount : "10", priority : "1", date : new Date()});
paymentsManager.saveToRepo({key : yeast(), mobileNo: "tel:878716212",amount : "10", priority : "1", date : new Date()});

var welcomeMsg = "Welcome to starbuzz coffe shop\n";
for(var coffee in flavors){
    welcomeMsg = welcomeMsg + coffee + ". " + flavors[coffee].name + " - price " + flavors[coffee].price + "\n"
}

var  flow = {
    'index' : {
        message : function(req, ctx){
            return {message : welcomeMsg}
        },
        handle : function(req, ctx) {
            ctx.view = "number"
        }
    },

    'number' : {
        message : function(req, ctx){
            return {message : "Number of cups"}
        },
        handle : function(req, ctx) {
            ctx.view = 'end'
        }
    },
    'end' : {
        message : function(req, ctx){
            return {message : "Bye Bye", end:true}
        }
    }

};

var sessions = ussd.sessions(flow, { stdTTL: 100, checkperiod: 120 }, {applicationId: "APP_000101", password : "password"})

/* GET users listing. */
router.get('/', function(req, res, next) {
    paymentsManager.getAll(function(result){
        res.send('payments', { title: 'Payments', payments : result, index : 1});
    });
});

router.post('/ussd', function(req, res, next){
    res.send(ussd.successMoResponse)
    next()
}, function(req, res){
    sessions.resolve(req.body, function(mtReq){
        transport.createRequest({hostname: '127.0.0.1', port: 7000, path: '/ussd/send'}, mtReq, function(request){
            transport.httpClient(request, function(){
                console.log("Message send successfully.");
            })
        })
    })
});

module.exports = router;