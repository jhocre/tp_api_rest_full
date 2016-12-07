var express = require('express');
var router = express.Router();
var bookDB = require('../model/bookDb');
var userDB = require('../model/userDb');

router.route("/").get(function (req, res) {
    var response = {};
    bookDB.find({}, function (err, data) {
        if (err) {
            response = {"error": true, "message": "Error fetching data"};
        } else {
            response = {"error": false, "message": data};
        }
        res.json(response);
    });
});

router.route("/:id").get(function (req, res) {
    var query = {};
    if (req.params.id.length == 10) {
        query = {isbn10: req.params.id};
    } else if (req.params.id.length == 13) {
        query = {isbn13: req.params.id};
    } else {
        res.json({"error": true, "message": "Wrong value"});
        query = null;
    }

    if (query != null) {
        bookDB.findOne(query, function (err, data) {
            if (err) {
                res.json({"error": true, "message": "Error fetching data"});
            } else {
                if (!data) {
                    res.json({"error": true, "message": "Book not in database"});
                } else {
                    res.json({"error": false, "message": data});
                }
            }
        });
    }
});


router.route("/").post(function (req, res) {
    var db = new bookDB();
    var response = {};
    db.isbn13 = req.body.isbn13;
    db.isbn10 = req.body.isbn10;
    db.title = req.body.title;
    db.author = req.body.author;
    db.summary = req.body.summary;
    db.language = req.body.language;
    db.subject = req.body.subject;
    db.publisher = req.body.publisher;
    db.edition = req.body.edition;
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
