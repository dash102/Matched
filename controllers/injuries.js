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
  // Record: { /* required */
  //  "age": "32",
  //  "job": "services",
  //  "marital": "divorced",
  //  "education": "basic.9y",
  //  "default": "no",
  //  "housing": "unknown",
  //  "loan": "yes",
  //  "contact": "cellular",
  //  "month": "dec",
  //  "day_of_week": "mon",
  //  "duration": "110",
  //  "campaign": "1",
  //  "pdays": "11",
  //  "previous": "0",
  //  "poutcome": "nonexistent",
  //  "emp_var_rate": "-1.8",
  //  "cons_price_idx": "94.465",
  //  "cons_conf_idx": "-36.1",
  //  "euribor3m": "0.883",
  //  "nr_employed": "5228.1"
  // }
};

function getInjuryRisk(_paramsnotimplemented){
	console.log('get injury risk called');
	machinelearning.predict(params, function(err, data) {
	  if (err) console.log(err, err.stack); // an error occurred
	  else     console.log(data);           // successful response
	});
}

module.exports = {
    getInjuryRisk
}