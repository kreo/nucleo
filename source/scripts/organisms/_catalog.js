// ------------------------------------
// Catalog
// ------------------------------------

var catalog = function() {

    function init() {
        console.log("common initialized!");
    }

    return init;

};

$.extend(N.views, catalog);

if (N.data.view === N.global.getFilename(__filename)) {
	N.views.current = catalog;
}
