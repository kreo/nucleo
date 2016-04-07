/*
 |--------------------------------------------------------------------------
 | Nucleo - ACSS+BEM Agnostic Framework
 |--------------------------------------------------------------------------
 | author: @kreo
 | https://github.com/kreo
 |--------------------------------------------------------------------------
 */

var admin = require('./organisms/_admin');
var auth = require('./organisms/_auth');

(function(){
	console.log('Application entry');
	admin.init();
	auth.init();
})();
