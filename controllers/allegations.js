/**
 * chat.js
 * Controllers for interacting with chat documents in the database.
 */

const db = require('../db/connect');

const allegations = require('./allegations');

const Allegation = db.models.Allegation;

function submitAllegation(payload){
    console.log("Allegation: new allegation made");
    // Instantiate new chat document
    const allegation = new Allegation(payload);

    // Save to the database
    allegation.save((err) => {
        if (err) {
            console.log(err);
        }
    });
}

module.exports = {
    submitAllegation
}
