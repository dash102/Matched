const mongoose = require('mongoose');

const AllegationSchema = new mongoose.Schema({
    accuser: String,
    submit_date: {
        type: Date,
        default: Date.now()
    },
    situation: String,
    evidence: String,
    email: String, 
    name: String,
    police: Boolean,
    harvard: Boolean,
    employers: Boolean
}, { collection: 'allegations'});

module.exports = mongoose.model('Allegation', AllegationSchema);
