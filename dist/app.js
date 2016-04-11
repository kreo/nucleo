(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./organisms/_admin":2,"./organisms/_auth":3}],2:[function(require,module,exports){
// ------------------------------------
// Organisms.Admin
// ------------------------------------

var init = function (){
	console.log('oraganism - admin');
};

module.exports = {
	init: init
};

},{}],3:[function(require,module,exports){
// ------------------------------------
// Organisms.Auth
// ------------------------------------

var init = function (){
	console.log('oraganism - auth');
};

module.exports = {
	init: init
};

},{}]},{},[1]);
