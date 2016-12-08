var express = require('express');
var router = express.Router();
var bookDB = require('../model/bookDb');
var userDB = require('../model/userDb');
var jwt = require('jsonwebtoken');

function getIsbnQuery(isbn) {
    if (isbn.length == 10) {
       return {isbn10: isbn};
    } else if (isbn.length == 13) {
        return {isbn13: isbn};
    } else {
        return null;
    }
}

function moveToRead(isbn,req) {
    userDB.findById(req.user._id, function (err, user) {
        if (err) {
            return {"error": true, "message": "Error fetching data"};
        }

        if (!user) {
            return {"error": false, "message": "User not in database"}
        } else {

            var index = user.unread.indexOf(isbn);
            if (index > -1) {
                user.unread.splice(index, 1);
            }
            user.read.push(isbn);
            user.save(function (err, updatedUser) {
                if (err) {
                    return {"error": true, "message": "Error fetching data"};
                }
                return {"error": false, "message": "Book moved to read"};
            });
        }
    });
}

function addToUnread(isbn, req) {
    userDB.findById(req.user._id, function (err, user) {
        if (err) {
            return {"error": true, "message": "Error fetching data"};
        }

        if (!user) {
            return {"error": false, "message": "User not in database"}
        } else {
            user.unread.push(isbn);
            user.save(function (err, updatedUser) {
                if (err) {
                    return {"error": true, "message": "Error fetching data"};
                }
                return {"error": false, "message": "Book moved to read"};
            });
        }
    });
}

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
    var query = getIsbnQuery(req.params.id);

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
            response = addToUnread(isbn,req);
            if (!response.error) {
                response = {"error": false, "message": "Data added"};
            }
        }
        res.json(response);
    });
});

router.route("/:id").put(function (req,res) {
    res.json(moveToRead(req.params.id, req));
});

module.exports = router;
