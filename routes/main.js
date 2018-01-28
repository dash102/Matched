const path = require('path');
const express = require('express');
const DIR = require('../constants.js').DIR


var injuries = require(path.join(DIR.ROOT, 'controllers/injuries'));
var games = require(path.join(DIR.ROOT, 'controllers/games'));

const router = express.Router();

router.get('/', (req, res) => {
    res.render("index");
})

// Let the ref submit a report after the game
router.get('/ref', (req, res) => {
   res.render("ref");
});

// Let the ref submit a report after the game
router.post('/games', (req, res) => {
	games.submitGames({}, (results) => {
		console.log('about to send result to frontend');
        res.send(results);
	});
  	// res.render("ref");
});

// Let anyone get the schedule
router.get('/games', (req, res) => {
	games.getGames((results) => {
		console.log('about to send result to frontend');
        res.send(results);
	});
  	// res.render("ref");
});

router.get('/injuries', (req, res) => {
	console.log('getting route injuries');
    injuries.getInjuryRisk(req.body, 
    	(results) => {
    		console.log('about to send result to frontend');
        	res.send(results);
    }
    );
});

module.exports = router;
