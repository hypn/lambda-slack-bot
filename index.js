const TOKEN = 'hunter2';    // your Slack slash-command's token
const BINARY = 'phantomjs';	// binary to be run (needs to be uploaded with your Lambda function!)

var path = require('path');
var childProcess = require('child_process');

exports.handler = function(event, context, callback) {
	var text = (event && event.text) ? event.text : false;
	var token = (event && event.token) ? event.token : false;

	if (!text || !token || (token !== TOKEN)) {
		callback('Missing input params or invalid token.');
		return;
	}

	// set env path, as per https://aws.amazon.com/blogs/compute/running-executables-in-aws-lambda/
	process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'];

	var urltoCheck = text;
	var binaryPath = path.join(__dirname, BINARY);
	var processArgs = [ path.join(__dirname, 'title.js'), urltoCheck ];

	// run the binary, passing in arguments
	childProcess.execFile(binaryPath, processArgs, {maxBuffer: 1024 * 5000}, function(error, stdout, stderr) {

		// unable to run the binary:
		if (error) {
			console.log('Error running binary:', error);
			callback(error, null);
			return;
		}

		// binary returns an error:
		if (stderr) {
			console.log(stderr);
			callback(error, null);
			return;
		}

		// binary succeeds:
		var response = {
			response_type: 'in_channel',
		  text: 'Response from Lambda: \n```' + stdout + '```'
		};

		callback(error, response);
		return;
	});
}
