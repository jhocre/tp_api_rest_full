var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

// Create a schema
var userSchema = new Schema({
    name: String,
    password: String,
    read: [{ type: Schema.Types.ObjectId, ref: 'book' }],
    unread:[{ type: Schema.Types.ObjectId, ref: 'book' }],
    // read: String,
    // unread: String,
});
// Create a model based on the schema
module.exports = mongoose.model('user', userSchema);