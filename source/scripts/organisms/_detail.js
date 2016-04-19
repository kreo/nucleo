// ------------------------------------
// Detail
// ------------------------------------

/*jshint esversion: 6 */

var detail = function() {

    function init() {
        console.log("common initialized!");
    }

    return init;

};

$.extend(N.views, detail);

if (N.data.view === N.global.getFilename(__filename)) {
	N.views.current = detail;
}
