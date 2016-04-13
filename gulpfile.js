// ---------------------------------------------------------
// Gulpfile.js
// ---------------------------------------------------------

var gulp = require("gulp");
var _ = require("underscore");
var $ = require("./doom/plugins");
var config = require("./doom/config");
var utils = require("./doom/utils");

// Methods
// ---------------------------------------------------------

function mix(task) {
    return require("./doom/tasks/" + task)(gulp, _, $, config, utils);
}

// Tasks
// ---------------------------------------------------------

// Default
gulp.task("default", function() {
    $.taskListing();
});

mix("stylus");
mix("browserify");
mix("jade");
mix("serve");
mix("bower");
mix("sass");
