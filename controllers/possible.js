// Dependencies
const express = require('express');
const router = express.Router();
const Friend = require('../models/friend.js');
const Pet = require('../models/pet.js');
const Possible = require('../models/possible.js');
const { ObjectId} = require('mongodb');

// Routes
// Seed Data
const possibleSeed = require('../models/possibleSeed.js');

router.get('/seed', (req, res) => {
    Possible.deleteMany({}, (error, allPossible) => { });

    Possible.create(possibleSeed, (error, data) => {
        res.redirect('/possible');
        console.log(error);
    });
});

// I
router.get('/', (req, res) => {
    Possible.find({}, (error, allPossible) => {
        res.render('possible/index.ejs', {
            possible: allPossible
        });
    });
});

// N
// Delete
router.delete('/:id', (req, res) => {
    Possible.findByIdAndDelete(req.params.id, (err, data) => {
        res.redirect('/possible')
    });
});
// U
// C
// E
// Show
router.get('/:id', (req, res) => {
    Possible.findById(req.params.id, (err, foundPossible) => {
        res.render('possible/show.ejs', {
            possible: foundPossible
        })
    })
});

router.post('/:id/heart', (req, res) => {
    // Get the possible friend from DB
    Possible.findById(req.params.id, (err, foundPossible) => {
        //thing   function (what it will be, (err, thing))
        if (err) {
            console.error('pos', err);
            return;
        };
        // handle ._id issue. .toJSON() converts data from mongoose object back to JSON so we can reassign to new collection
        Friend.create(foundPossible.toJSON(), (err, friend) => {
            if (err) {
                console.error('fren' ,err);
                return;
            }
            console.log(friend);
            Possible.findByIdAndDelete(req.params.id, (err, data) => {
                if (err) {
                    console.error('del', err);
                    return;
                }
                res.redirect('/possible')
            });   
        });
    });
});


// Export
module.exports = router;