// Dependencies
const mongoose = require('mongoose');
// Initialize shortcute
const Schema = mongoose.Schema;
// Initialize Schema
const friendSchema = new Schema({
    name: String,
    img: String,
    gender: String,
    breed: String,
    age: Number,
    size: Number,
    personality: String,
    energy: Number,
    vaccine: Boolean,
    explOne: String,
    socialized: Boolean,
    explTwo: String, 
    about: String,
    locations: String,
});
// Export Models
const Friend = mongoose.model('Friend', friendSchema);

module.exports = Friend;