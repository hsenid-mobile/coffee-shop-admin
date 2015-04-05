var express = require('express');
var router = express.Router();

var tapApi = require("tap-telco-api");

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('promotions', { title: 'Promotions' });
});

router.post('/send',
    function(req, res, next) {
        res.redirect("/promotions")
        next()
    },
    function(req, res){
        tapApi.sms.requestCreator({applicationId : "APP_000101", password : "password"}).broadcast(req.body.messageInput, function(mtReq){
            tapApi.transport.createRequest({hostname: '127.0.0.1', port: 7000, path: '/sms/send'}, mtReq, function(request){
                tapApi.transport.httpClient(request, function() {
                    console.log("Mt request send to subscriber" + mtReq)
                })
            })
    })}
);

router.post('/subscription', function(req, res){
    console.log("Subscription notification " + req.body.subscriberId)
    res.send(tapApi.subscription.subscriptionNotificationResponse)
});

module.exports = router;