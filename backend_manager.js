var repoService = function(repo){

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

    return {
        saveToRepo : saveToRepo,
        getSingle : getSingle,
        getAll : getAll,
        del : del

    }
};

module.exports = {
    feedbackRepo : repoService(require('./repo').repo()),
    promotionRepo : repoService(require('./repo').repo())
};