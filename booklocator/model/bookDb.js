// Load mongoose package
var mongoose = require('mongoose');

// Create a schema
var bookSchema = new mongoose.Schema({
    isbn10: String,
    isbn13: String,
    title: String,
    author: String,
    summary: String,
    language: String,
    subject: String,
    publisher: String,
    edition: String,
});
// Create a model based on the schema
module.exports = mongoose.model('book', bookSchema);
