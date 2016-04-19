// ------------------------------------
// Admin
// ------------------------------------

// #Scripts:0 Add Module IFEE API  Admin/:js +feature

var admin = function() {

    function init() {
        console.log("common initialized!");
    }

    return init;

};

$.extend(N.views, admin);

if (N.data.view === N.global.getFilename(__filename)) {
	N.views.current = admin;
}
