/*
 |--------------------------------------------------------------------------
 | Nucleo - ACSS+BEM Agnostic Framework
 |--------------------------------------------------------------------------
 | author: @kreo
 | https://github.com/kreo
 |--------------------------------------------------------------------------
 */

/*jshint esversion: 6 */

var admin = require('./organisms/_admin');
var auth = require('./organisms/_auth');

(function(){

	$(document).foundation();

	console.log('Application entry');
	admin.init();
	auth.init();

})();
