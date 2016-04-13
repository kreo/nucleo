// ---------------------------------------------------------
// Gulpfile.js
// ---------------------------------------------------------

var gulp = require("gulp");
var doom = require("./doom")(gulp);

// Tasks
// ---------------------------------------------------------

// Default
gulp.task("default", function() {
    $.taskListing();
});

doom("stylus");
doom("browserify");
doom("jade");
doom("serve");
doom("bower");
doom("sass");
