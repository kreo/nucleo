/*
 |--------------------------------------------------------------------------
 | Nucleo - ACSS+BEM Agnostic Framework
 |--------------------------------------------------------------------------
 | author: @kreo
 | https://github.com/kreo
 |
 */

/*jshint esversion: 6 */

// #Scripts: Add APP Object Index/:js +feature

window.app = {};

var admin = require("./organisms/_admin");
var auth = require("./organisms/_auth");

function common() {
    console.log("common inizialized!");
}

(function($) {

    $(document).foundation();
    common();

    console.log("Application entry");

})(jQuery);

admin();
auth();
