// ---------------------------------------------------------
// Gulpfile.js
// ---------------------------------------------------------

var gulp = require("gulp");
var mo = require("mojs")(gulp);

// Tasks
// ---------------------------------------------------------

// Default
gulp.task("default", function() {
    $.taskListing();
});

mo("stylus");
mo("browserify");
mo("jade");
mo("serve");
mo("bower");
// mo("sass");
