var NodeCache = require('node-cache');

var repo = function(){
    var nodeCache = new NodeCache();

    return {
        save : function(key, obj, cb) {
            nodeCache.set(key, obj, cb)
        },
        get : function(key, success, error) {
            nodeCache.get(key, function(err, value) {
                if(!err && !(value[key] === undefined)) {
                    success(value);
                } else {
                    error();
                }
            })
        },
        all : function(success, error) {
            nodeCache.keys( function( err, keys ){
                if( !err ){
                    nodeCache.get(keys, function(err, value) {
                        if(!err) {
                            success(value);
                        } else {
                            error();
                        }
                    })
                }
            });
        },
        del : function(key, success) {
            nodeCache.del(key, function(err, count){
                if(!err) {
                    success(count);
                }
            })
        }

    }
};

module.exports = {
    repo : repo
};