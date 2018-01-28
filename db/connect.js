

const mongoose = require('mongoose');

// use native promises
mongoose.Promise = global.Promise;

// standard URI format: mongodb://[dbuser:dbpassword@]host:port/dbname
const db_uri = process.env.DB_URI; // load URI from environment variables

// connect to the mlab instance
var conn = mongoose.connection;
var options = {
    keepAlive: 300000,
    connectTimeoutMS: 30000,
};

// conn.openUri(db_uri, options)
//     .then(() => {
//         console.log("Database: connected to " + db_uri);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// // instantiate data models
// // (mongoose waits until the connection is established to run these)
// const Allegation = require('./models/allegation');

// module.exports = {
//     connection: conn,
//     models: {
//         Allegation
//     }
// };
