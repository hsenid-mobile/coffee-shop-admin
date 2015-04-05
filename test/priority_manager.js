var calculate = require('./../priority_manager').calculate;
var assert = require('chai').assert;

describe("Priority manager functions.", function() {
    it("Calculate geo distance", function () {
        calculate({lat : 7, lng : 81}, {lat: 7.12, lng : 81}, function(distance, priority){
            assert.equal(priority, 2)
        })
    })
})
