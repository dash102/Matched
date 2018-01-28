const path = require('path');
const express = require('express');
const DIR = require('../constants.js').DIR

var weather = require(path.join(DIR.ROOT, 'controllers/weather'));
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

// Really the only thing this does is compute heat index
router.get('/weather/', (req, res) => {
	console.log('get request for weather route.  Req body is ');
	console.log(req.body);
	weather.getHeatIndex(req.body, (results) => {
		console.log('about to send heat index data to frontend');
		res.send(results);
	})
});

// Let anyone get the schedule
router.get('/games', (req, res) => {
	games.getGames((results) => {
		console.log('about to send result to frontend');
        res.send(results);
	});
  	// res.render("ref");
});

router.post('/injuries', (req, res) => {
	console.log('posting route injuries');
	console.log(req.body);
    pred =  injuries.getInjuryRisk(req.body, (results) => {
    	console.log('within callback!')
    	console.log(results);
    	res.send(results);
    });
});

module.exports = router;
