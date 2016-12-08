var express = require('express');
var router = express.Router();
var bookDB = require('../model/bookDb');
var userDB= require('../model/userDb');
var request = require("sync-request");

/*FONCTION DE RECHERCHE DE LIVRE PAR ISBN*/

function getBookbyISBN(isbn) {
    var url='http://isbndb.com/api/v2/json/I347A80O/book/'+isbn;

    var data = request('get',url)
    return JSON.parse(data.getBody('utf-8'));
}


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

router.route('/:userId/:bookISBN').get(function (req,res) {
    var db = new userDB();
    var bookdb=new bookDB;
    var response={};
    var userId=req.param('userId');
    userDB.findOne({
            _id:userId},
        function (err, user) {
            if (err) throw err;
            if(user){
                var bookISBN=req.param('bookISBN');
                var bookData=getBookbyISBN(bookISBN);
            }
            else{
                response={"error":true, "message":"utilisateur non enregistré" }
            }
            if(bookData){
                // console.log(bookData.data[0].author_data[0].name);
               response=bookData;
                bookdb.title=response.data[0].title;
                bookdb.isbn13=response.data[0].isbn13;
                bookdb.isbn10=response.data[0].isbn10;
                // bookdb.author=bookData.data[0].author_data[0].name;
                bookdb.save(function (err) {
                    // save() will run insert() command of MongoDB.
                    // it will add new data in collection.
                    if (err) {
                        response = {"error": true, "message": "Error adding data"};
                    } else {
                        response = {"error": false, "message": "books added"};
                    }

          })
            }
            else{
                response={"error":true, "message":"une erreur est survenue" }
            }

        }
    );
    res.json(response);
})

module.exports = router;
