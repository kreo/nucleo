// ------------------------------------
// Common
// ------------------------------------

/*jshint esversion: 6 */

var common = function() {

    function init() {
        console.log("common initialized!");
    }

    return init;

};

$.extend(N.views, common);
