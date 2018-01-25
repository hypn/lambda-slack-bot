'use strict';

let bot = require('../index');

let expect  = require("chai").expect;

describe('Slack Bot', function() {
	it("missing input parameters", function() {
		var event = {};
		var context = {};

		bot.handler(event, context, function(err, resp) {
			expect(err).to.equal('Missing input params or invalid token.');
			expect(resp).to.be.an('undefined');
		});
	});

	it("incorrect token", function() {
		var event = {
			input: 'http://www.example.com'
		};
		var context = {};

		bot.handler(event, context, function(err, resp) {
			expect(err).to.equal('Missing input params or invalid token.');
			expect(resp).to.be.an('undefined');
		});
	});

	it("returns the page title", function(done) {
		var event = {
			text: 'http://www.example.com',
			token: 'hunter2'
		};
		var context = {};

		bot.handler(event, context, function(err, resp) {
			var expected = {
				response_type: 'in_channel',
  			text: 'Response from Lambda: \n```Example Domain\n```'
  		};

			expect(err).to.be.null;
			expect(resp).to.eql(expected);
			done();
		});
	});
});
