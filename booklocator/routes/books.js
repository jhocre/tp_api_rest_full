var express = require('express');
var router = express.Router();
var bookDB = require('../model/bookDb');

router.route("/").get(function (req, res) {
    var response = {};
    bookDB.find({}, function (err, data) {
        // Mongo command to fetch all data from collection.
        if (err) {
            response = {"error": true, "message": "Error fetching data"};
        } else {
            response = {"error": false, "message": data};
        }
        res.json(response);
    })
});
router.route("/").post(function (req, res) {
    var db = new bookDB();
    var response = {};
    // fetch email and password from REST request.
    // Add strict validation when you use this in Production.
    db.title = req.body.title;
    db.save(function (err) {
        // save() will run insert() command of MongoDB.
        // it will add new data in collection.
        if (err) {
            response = {"error": true, "message": "Error adding data"};
        } else {
            response = {"error": false, "message": "Data added"};
        }
        res.json(response);

    });
});

module.exports = router;
