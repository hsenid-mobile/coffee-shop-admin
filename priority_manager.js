var geo = require('geo-tools');

var calculate = function(from, to, cb){
    var distanceInKm = distance(from, to);
    var priority = 1;
    if(distanceInKm <= 10){
        priority = 1;
    } else if(distanceInKm > 10 && distanceInKm <= 100) {
        priority = 2;
    } else{
        priority = 3;
    }
    cb(distanceInKm, priority);
};

module.exports = {
    calculate : calculate
}