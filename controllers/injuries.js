// Controller for handling data queries related to injuries.  

// Import aws stuff
var AWS = require('aws-sdk')
AWS.config.loadFromPath('./config/aws.json');
var machinelearning = new AWS.MachineLearning();

predict_for = {
	"Humidity": "100",
	"precipitation": "0",
	"Sunset": "0"
}

// Set params.  Will be sent to controller from frontend.
var params = {
  MLModelId: 'ml-wF9VD0ZtGb5', /* required */
  PredictEndpoint: 'https://realtime.machinelearning.us-east-1.amazonaws.com',
  Record: predict_for
};

function getInjuryRisk(_paramsnotimplemented, callback){
	console.log('get injury risk called');
	machinelearning.predict(params, function(err, data) {
	  if (err) console.log(err, err.stack); // an error occurred
	  else     return callback(data);           // successful response
	});
}

function submitInjuryReport(injuries){
	// Must append this data to s3
}

module.exports = {
    getInjuryRisk,
    submitInjuryReport
}