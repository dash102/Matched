const path = require('path');
const express = require('express');
const DIR = require('../constants.js').DIR


var allegations = require(path.join(DIR.ROOT, 'controllers/allegations'));

const router = express.Router();

router.get('/', (req, res) => {
    res.render("index");
})

// Say thanks for submission.
router.get('/thanks', (req, res) => {
   res.render("thanks");
});

router.post('/accuse', (req, res) => {
    allegations.submitAllegation(req.body, (results) => {
        res.send(results);
    });
});

module.exports = router;
