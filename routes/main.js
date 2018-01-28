const path = require('path');
const express = require('express');
const DIR = require('../constants.js').DIR


var injuries = require(path.join(DIR.ROOT, 'controllers/injuries'));

const router = express.Router();

router.get('/', (req, res) => {
    res.render("index");
})

// Say thanks for submission.
router.get('/thanks', (req, res) => {
   res.render("thanks");
});

router.post('/injuries', (req, res) => {
    injuries.getInjuryRisk(req.body, (results) => {
        res.send(results);
    });
});

module.exports = router;
