// Load mongoose package
var mongoose = require('mongoose');

// Create a schema
var userSchema = new mongoose.Schema({
    name: String,
    password: String,
});
// Create a model based on the schema
module.exports = mongoose.model('user', userSchema);
