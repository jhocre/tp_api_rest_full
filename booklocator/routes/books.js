var express = require('express');
var router = express.Router();
var bookDB = require('../model/bookDb');
var userDB = require('../model/userDb');
var request = require("sync-request");
function getIsbnQuery(isbn) {
    if (isbn.length == 10) {
       return {isbn10: isbn};
    } else if (isbn.length == 13) {
        return {isbn13: isbn};
    } else {
        return null;
    }
}

function getBookbyISBN(isbn) {
    var url='http://isbndb.com/api/v2/json/I347A80O/book/'+isbn;

    var data = request('get',url)
    return JSON.parse(data.getBody('utf-8'));
}

function moveToRead(bookId,req) {
    userDB.findById(req.user, function (err, user) {
        if (err) {
            return {"error": true, "message": "Error fetching data"};
        }

        if (!user) {
            return {"error": false, "message": "User not in database"}
        } else {

            var index = user.unread.indexOf(bookId);
            if (index > -1) {
                user.unread.splice(index, 1);
            }
            user.read.push(bookId);
            user.save(function (err, updatedUser) {
                if (err) {
                    return {"error": true, "message": "Error fetching data"};
                }
                return {"error": false, "message": "Book moved to read"};
            });
        }
    });
}

function addToUnread(bookId, req) {
    var response = {};
    userDB.findById(req.user, function (err, user) {
        if (err) {
            response = {"error": true, "message": "Error fetching data"};
        }

        if (!user) {
            response = {"error": false, "message": "User not in database"};
        } else {
            user.unread.push(bookId);
            user.save(function (err) {
                if (err) {
                    response = {"error": true, "message": "Error fetching data"};
                } else {
                    response = {"error": false, "message": "Book moved to read"};
                }
            });
        }
    });
    return response;
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



router.route("/:isbn").get(function (req, res) {
var response = {};
    userDB.findById(req.user,
        function (err, user) {
            if (err) throw err;
            if(user){
                var bookISBN=req.param('isbn');
                var bookData=getBookbyISBN(bookISBN);
            }
            else{
                response={"error":true, "message":"utilisateur non enregistré" }
            }
            if(bookData){

                var query = getIsbnQuery(req.params.isbn);

                if (query != null) {
                    bookDB.findOne(query, function (err, data) {
                        if (err) {
                            res.json({"error": true, "message": "Error fetching data"});
                        } else {
                            if (!data) {
                                response=bookData;
                                var bookdb = new bookDB;
                                bookdb.title=response.data[0].title;
                                bookdb.isbn13=response.data[0].isbn13;
                                bookdb.isbn10=response.data[0].isbn10;
                                bookdb.save(function (err) {
                                    if (err) {
                                        response = {"error": true, "message": "Error adding data"};
                                    } else {
                                        var retour = addToUnread(bookdb._id, req);
                                        response = {"error": false, "message": "books added"};
                                    }
                                })

                            } else {
                                res.json({"error": false, "message": data});
                            }
                        }
                    });
                }
            }
            else{
                response={"error":true, "message":"une erreur est survenue" }
            }
        }
    );
});

router.route("/:id").put(function (req,res) {
    res.json(moveToRead(req.params.id, req));
});

module.exports = router;
