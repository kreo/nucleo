// ------------------------------------
// News
// ------------------------------------

/*jshint esversion: 6 */

var news = function() {

    function init() {
        console.log("common initialized!");
    }

    return init;

};

$.extend(N.views, news);

if (N.data.view === N.global.getFilename(__filename)) {
	N.views.current = news;
}
