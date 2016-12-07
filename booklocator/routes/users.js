var express = require('express');
var router = express.Router();
var userDB = require('../model/userDb');

router.route("/").get(function (req, res) {
    var response = {};
    userDB.find({}, function (err, data) {

        if (err) {
            response = {"error": true, "message": "Error fetching data"};
        } else {
            response = {"error": false, "message": data};
        }
        res.json(response);
    })
});

router.route("/").post(function (req, res) {
    var db = new userDB();
    var response = {};

    db.name = req.body.name;
    db.password = req.body.password;
    db.save(function (err) {

        if (err) {
            response = {"error": true, "message": "Error adding data"};
        } else {
            response = {"error": false, "message": "Data added"};
        }
        res.json(response);

    });
});


module.exports = router;
