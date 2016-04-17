/*
 |--------------------------------------------------------------------------
 | Nucleo - ACSS+BEM Agnostic Framework
 |--------------------------------------------------------------------------
 | author: @kreo
 | https://github.com/kreo
 |
 */

/*jshint esversion: 6 */

var app = {};

var admin = require('./organisms/_admin');
var admin = require('./organisms/_admin');
var auth = require('./organisms/_auth');

function common() {

}

(function($) {

    $(document).foundation();
    common();

})(jQuery);



console.log('Application entry');
admin.init();
auth.init();
