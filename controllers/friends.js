// Dependencies
const express = require('express');
const router = express.Router();
const Friend = require('../models/friend.js');
const Pet = require('../models/pet.js');
const Possible = require('../models/possible.js');

// Routes
// I
router.get('/', (req, res) => {
    // Get all pets where
    Friend.find({}, (err, foundFriends) => {
        res.render('friends/index.ejs', {
            friends: foundFriends
        });
    });
});

// N 
// Delete
router.delete('/:id', (req, res) => {
    Friend.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/friends')
    });
});
// U
// C
// E
// Show
router.get('/:id', (req, res) => {
    Friend.findById(req.params.id, (err, foundFriend) => {
        res.render('friends/show.ejs', {
            friends: foundFriend
        });
    });
});
// Export
module.exports = router;