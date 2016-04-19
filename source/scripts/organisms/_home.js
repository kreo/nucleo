// ------------------------------------
// Home
// ------------------------------------

/*jshint esversion: 6 */

var home = function() {

    function init() {
        console.log("common initialized!");
    }

    return init;

};

$.extend(N.views, home);

if (N.data.view === N.global.getFilename(__filename)) {
	N.views.current = home;
}
