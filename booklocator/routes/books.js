var express = require('express');
var router = express.Router();
var bookDB = require('../model/bookDb');
var userDB=require('../model/userDb');
var request = require("request");

/*FONCTION DE RECHERCHE DE LIVRE PAR ISBN*/
function getBookbyISBN(isbn) {
    return request(' http://xisbn.worldcat.org/webservices/xid/isbn/'+isbn+'?method=getMetadata&format=json&fl=*&count=1', function(error, response, body) {
        console.log(body);
    });
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
    var response={};
    var userId=req.param('userId');
    userDB.findOne({
            _id:userId},
        function (err, user) {
            if (err) throw err;
            if(user){
                var bookISBN=req.param('bookISBN');
                var bookData=getBookbyISBN(bookISBN);
                console.log(bookData);

            }



        }

    );

})

module.exports = router;
