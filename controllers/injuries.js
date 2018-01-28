// Controller for handling data queries related to injuries.  

// Import aws stuff
var AWS = require('aws-sdk')
AWS.config.loadFromPath('./config/aws.json');
var machinelearning = new AWS.MachineLearning();

predict_for = {
	"Var1": "100", 
	"Var2": "10"
}

// Set params.  Will be sent to controller from frontend.
var params = {
  MLModelId: 'ml-669Yb1nSDA9', /* required */
  PredictEndpoint: 'https://realtime.machinelearning.us-east-1.amazonaws.com'
  // Record: predict_for
};

function getInjuryRisk(weather, callback){
	// console.log('get injury risk called');
	// console.log(weather);
	params.Record = weather;
	machinelearning.predict(params, function(err, data) {
	  if (err) console.log(err, err.stack); // an error occurred
	  else  callback(data);           // successful response
	});
}

function submitInjuryReport(injuries){
	// Must append this data to s3
}

module.exports = {
    getInjuryRisk,
    submitInjuryReport
}