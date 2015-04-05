var repo = require('./repo').repo();

var saveToRepo = function(feedback, cb) {
    repo.save(feedback.key, feedback, cb)
};


var getSingle = function(key, success, error) {
    repo.get(key, success, error);
};

var getAll = function(success) {
    repo.all(function(result){
        success(result);
    });
};

var del = function(key, success) {
    repo.del(key, success);
};

module.exports = {
    saveToRepo : saveToRepo,
    getSingle : getSingle,
    getAll : getAll,
    deleteByKey : del
};