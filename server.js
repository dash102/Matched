/* server.js
 *
 * The main server dispatcher.
 *
 */

require('dotenv').config();

const {
  CONN_STATUS
} = require('./constants')
const {
  WAITING,
  PAIRING,
  DISCONNECTED
} = CONN_STATUS;

// to connect to the database and instantiate the data models
var db = require('./db/connect');

var server = require("http").createServer(app);

// Authentication
var passport = require('passport');

// Parsing post requests
var bodyParser = require('body-parser');
var multer = require('multer');

// ----------------
// Begin Merged code
// ----------------

/*global console*/
var express = require('express');

var app = express();
var server = require("http").createServer(app);

// ----------------
// End Merged code
// ----------------


// to use the handlebars templating engine
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', 'handlebars');


const session = require("express-session")({
  secret: "my-secret",
  resave: true,
  saveUninitialized: true
});

app.use(require('cookie-parser')());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

app.use(session);

// to listen to port 3000
server.listen(process.env.PORT || 3000)

// Require our routes
const mainRoute = require('./routes/main')
app.use('/', mainRoute);

// Serve static resources
app.use('/static', express.static('static'))
