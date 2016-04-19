// ------------------------------------
// Auth
// ------------------------------------

/*jshint esversion: 6 */

var auth = function() {

    function init() {
        console.log("common initialized!");
    }

    return init;

};

$.extend(N.views, auth);

if (N.data.view === N.global.getFilename(__filename)) {
	N.views.current = auth;
}
