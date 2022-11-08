// Dependencies
const mongoose = require('mongoose');
// Initialize shortcute
const Schema = mongoose.Schema;
// Initialize Schema
const petSchema = new Schema({
    name: String,
    img: String,
    gender: String,
    breed: String,
    age: Number,
    size: Number,
    personality: String,
    energy: Number,
    about: String,
    locations: String,
});
// Export Models
const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;