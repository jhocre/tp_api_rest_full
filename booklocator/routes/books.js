var express = require('express');
var router = express.Router();
Kitten = require('../models/Books');



router.get('/', function(req,res,next) {
    //var fluffy = new Kitten({ name: 'fluffy' });

    // fluffy.save(function (err, fluffy) {
    //     if (err) return console.error(err);
    //     fluffy.speak();
    // });

    Kitten.find(function (err, kittens) {
        if (err) return console.error(err);
        res.send(kittens);
    });
});

module.exports = router;