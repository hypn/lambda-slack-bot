"use strict";

var page = require('webpage').create();
var system = require('system');
var URL = system.args[1];

page.open(URL, function(status) {
  console.log(page.title);
  phantom.exit();
});
