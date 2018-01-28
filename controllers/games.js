
const db = require('../db/connect');

//const Game = db.models.Game;

games = [{
    start_time: new Date(2018, 0, 27, 17, 20),
    home_team: 'vikings',
    away_team: 'patriots',
    field: 'US Bank',
}];

// Gets a datetime object for the last Sunday
function getLastSunday() {
    var d = Date.now();
    var t = new Date(d);
    var days = t.getDay();
    // Special case of today being a sunday.
    if (days === 0){
        days = 7;
    }
    console.log(days);
    t.setDate(t.getDate() - days);
    console.log('last sunday was');
    console.log(t);
    return t;
}

function submitGames(_gamesnotimplemented, callback){
    console.log("submitGames called");
    games.forEach(function(gameData){
        // Save each game to db one by one
        var game = new Game(gameData);
        game.save((err) => {
            if (err) {
                console.log(err);
            }
        });
    });
}

function getGames(callback){
    Game.find({
        start_time: {
            $gte: getLastSunday(),
            $lt: Date.now()
        }
    }, function(err, data){
        if(err){
            console.log(err);
            console.log('AN ERROR.  NOOOOOO')
        }
        console.log(data);
        callback(data);
    });
}

module.exports = {
    submitGames,
    getGames
}
