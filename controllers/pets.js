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
    Pet.find({}, (err, foundPets) => {
        res.render('pets/index.ejs', {
            pets: foundPets
        });
    });
});

// N
router.get('/new', (req, res) => {
    res.render('pets/new.ejs');
});

// D
router.delete('/:id', (req, res) => {
    Pet.findByIdAndDelete(req.params.id, () => {
        res.redirect('/pets');
    });
});
// U
router.put('/:id', (req, res) => {
    Pet.findByIdAndUpdate(req.params.id, req.body, () => {
        res.redirect('/pets');
    });
});

// C
router.post('/', (req, res) => {
    Pet.create(req.body, (err, createdPet) => {
        res.redirect('/pets');
    });
});
// E
router.get('/:id/edit', (req, res) => {
    Pet.findById(req.params.id, (err, foundPet) => {
        res.render('pets/edit.ejs', {
            pet: foundPet
        });
    });
});
// S
router.get('/:id', (req,res) => {
    Pet.findById(req.params.id, (err, foundPet) => {
        res.render('pets/show.ejs', {
            pets: foundPet
        });
    });
});

// Export Routes
module.exports = router;
