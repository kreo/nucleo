// ------------------------------------
// Checkout
// ------------------------------------

/*jshint esversion: 6 */

var checkout = function() {

    function init() {
        console.log("common initialized!");
    }

    return init;

};

$.extend(N.views, checkout);

if (N.data.view === N.global.getFilename(__filename)) {
	N.views.current = checkout;
}
