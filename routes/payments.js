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

var priorityManager = require("./../priority_manager")

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
            ctx.attributes = {coffee : req.message}
        }
    },

    'number' : {
        message : function(req, ctx){
            return {message : "Number of cups"}
        },
        handle : function(req, ctx) {
            ctx.attributes.number = req.message
            ctx.view = 'confirm'
        }
    },
    'confirm' : {
        message : function(req, ctx){
            var bill = parseFloat(flavors[ctx.attributes.coffee].price)  * parseFloat(ctx.attributes.number);
            ctx.attributes.bill = bill
            var confirmMsg = ctx.attributes.number + " cups of " + flavors[ctx.attributes.coffee].name + ", total = " + bill + "Rs" + "Confirm ?";
            return {message : confirmMsg}
        },
        handle : function(req, ctx) {
            var trxId = yeast();

            var casRequest = {
                applicationId: "APP_000101",
                password: "password",
                externalTrxId: trxId,
                subscriberId: ctx.mobileNo,
                amount: ctx.attributes.bill.toString()
            };
            transport.createRequest({hostname: '127.0.0.1', port: 7000, path: '/caas/direct/debit'}, casRequest, function(request){
                transport.httpClient(request, function(response){

                    if(response.statusCode === "S1000") {

                        var lbsRequest = {
                            applicationId: "APP_001764",
                            password: "password",
                            subscriberId: ctx.mobileNo,
                            serviceType: "IMMEDIATE"
                        };

                        transport.createRequest({hostname: '127.0.0.1', port: 7000, path: '/lbs/locate'}, casRequest, function(request){
                            transport.httpClient(request, function(response){
                                var priority = priorityManager.calculate({lat : 7, lng : 81}, {lat : response.latitude , lng : response.longitude}, function(distance, priority) {
                                    paymentsManager.saveToRepo({key : trxId, mobileNo: ctx.mobileNo,amount : ctx.attributes.bill, priority : priority + "(" + "distance = " + distance + "kms" + ")", date : new Date()})
                                })

                            })
                        });

                    }
                })
            });

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
        res.render('payments', { title: 'Payments', payments : result, index : 1});
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