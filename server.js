// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const petsController = require('./controllers/pets.js');
const friendsController = require('./controllers/friends.js');
const possibleController = require('./controllers/possible.js');
const app = express();
const morgan = require('morgan');
require('dotenv').config();
const Possible = require('./models/possible.js');


// Database Configuration
mongoose.connect(process.env.DATABASE_URL, {
    useUnifiedTopology: true,
});

// Database Connection Error/Success
const db = mongoose.connection;
db.on('error', (err) => console.log(`${err.message} is mongod not running?`));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// Middleware
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false })); 
app.use('/pets', petsController);
app.use('/possible', possibleController);
app.use('/friends', friendsController);

// Route
// Seed Route
const Pet = require('./models/pet.js');
const petSeed = require('./models/possibleSeed.js');
const Friend = require('./models/friend.js');
const { $where } = require('./models/pet.js');
app.get('/seed', (req, res) => {
    Friend.deleteMany({}, (error, friends) => {});
    Pet.deleteMany({}, (error, pets) => {
        // All things in database have been deleted at this point.
        Pet.create(petSeed, (error, newPets) => {
            // Pets have been created
            console.log(newPets);
        });
    });
});

// Landing Page
// app.get('/', (req, res) => {
//     res.render('landing.ejs');
// });

app.get('/', (req, res) => {
    Possible.find({}, (error, allPossible) => {
        Pet.find({}, (error, allPets) => {
            Friend.find({}, (error, allFriends) => {
                res.render('landing.ejs', {
                   possible: allPossible,
                   pets: allPets,
                   friends: allFriends
                });
            });
        });
    });
});

// Listeners
const PORT = process.env.PORT;
app.listen(PORT,  () => console.log(`Server is listening on ${PORT}`));
