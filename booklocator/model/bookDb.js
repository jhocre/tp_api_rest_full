// Load mongoose package
var mongoose = require('mongoose');

// Create a schema
var bookSchema = new mongoose.Schema({
    isbn13: String,
    isbn10: String,
    title: String,
});
// Create a model based on the schema
module.exports = mongoose.model('book', bookSchema);
