var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('promotions', { title: 'Promotions' });
});

router.post('/send', function(req, res) {
    console.log("Send button pressed." + req.body.messageInput)
    res.redirect("/promotions")
});

module.exports = router;