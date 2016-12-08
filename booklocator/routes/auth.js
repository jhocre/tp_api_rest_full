var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var userDB = require('../model/userDb');

module.exports = function (app) {
    router.route("/").post(function (req, res) {
        // find the user
        userDB.findOne({
            name: req.body.name
        }, function (err, user) {

            if (err) throw err;

            if (!user) {
                res.json({success: false, message: 'Authentication failed. User not found.'});
            } else if (user) {

                // check if password matches
                if (user.password != req.body.password) {
                    res.json({success: false, message: 'Authentication failed. Wrong password.'});
                } else {

                    // if user is found and password is right
                    // create a token
                    var token = jwt.sign(user._id, app.get('secret'), {
                        //expiresInMinutes: 1440 // expires in 24 hours
                    });

                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                }
            }
        });
    });

    router.route("/create").post(function (req, res) {
        var db = new userDB();
        var response = {};
        // fetch email and password from REST request.
        // Add strict validation when you use this in Production.
        db.name = req.body.name;
        db.password = req.body.password;
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
    return router;
};