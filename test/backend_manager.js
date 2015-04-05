var backendManager = require('./../backend_manager');
var assert = require('chai').assert;

describe("Save/Retrieve feedback should be successful", function() {
    it("Saving feedback.", function () {
        backendManager.saveToRepo({key : "1", mobileNo : "tel:890982", msg : "Very good mocha"}, function(err, success) {
            if(!err && success) {
                assert.ok(true, "Success")
            }else {
                assert.ok(false, "Failure")
            }
        })
    })
    it("Retrieving feedback should be successful.", function () {
        backendManager.getSingle("1", function() {
                assert.ok(true, "Success")
        }, function(){
            assert.ok(false, "Failure")
        })
    })
    it("Retrieving all feedback should be successful.", function () {
        backendManager.getAll(function(feedback) {
            assert.equal(feedback["1"].mobileNo, "tel:890982");
        })
    })
    it("Delete by key", function () {
        backendManager.deleteByKey("1", function(count) {
            assert.equal(count, 1);
        });
    })
    it("Retrieving all feedback should be successful.", function () {
        backendManager.getAll(function(feedback) {
            assert.ok(isEmpty(feedback), "Success")
        });

        function isEmpty(obj) {
            return Object.keys(obj).length === 0;
        }
    })
});
