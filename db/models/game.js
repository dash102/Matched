const mongoose = require('mongoose');

const InjurySchema = new mongoose.Schema({
    cause: String,
    time: Date
}, { noId: true })

const GameSchema = new mongoose.Schema({
    home_team: String,
    away_team: String,
    start_time: Date,
    field: String,
    injuries: {
        type: [InjurySchema], 
        default: []
    }
}, { collection: 'games'});

module.exports = mongoose.model('Game', GameSchema);