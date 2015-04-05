var backendManager = require('./../backend_manager');
var assert = require('chai').assert;

describe("Save/Retrieve feedback should be successful", function() {
    it("Saving feedback.", function () {
        backendManager.saveFeedBack({mobileNo : "tel:890982", msg : "Very good mocha"}, function(err, success) {
            if(!err && success) {
                assert.ok(true, "Success")
            }else {
                assert.ok(false, "Failure")
            }
        })
    })
    it("Retrieving feedback should be successful.", function () {
        backendManager.getFeedBack("tel:890982", function() {
                assert.ok(true, "Success")
        }, function(){
            assert.ok(false, "Failure")
        })
    })
    it("Retrieving all feedback should be successful.", function () {
        backendManager.getAll(function() {
            assert.ok(true, "Success")
        })
    })
})
