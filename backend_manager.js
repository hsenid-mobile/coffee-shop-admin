var repo = require('./repo').repo();

var saveFeedBack = function(feedback, cb) {
    repo.save(feedback.mobileNo, feedback, cb)
};


var getFeedBack = function(key, success, error) {
    repo.get(key, success, error);
};

var getAll = function(success) {
    repo.all(function(result){
        var feedback = {};
        for (var feed in result) {
            if(feed.indexOf("tel:") === 0) {
                feedback[feed] = result[feed];
            }
        }
        console.log(feedback)
        success(feedback);
    });
};

module.exports = {
    saveFeedBack : saveFeedBack,
    getFeedBack : getFeedBack,
    getAll : getAll
};