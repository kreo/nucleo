// ---------------------------------------------------------
// Gulpfile.js
// ---------------------------------------------------------

var gulp = require("gulp");
var _ = require("underscore");
var config = require("mojs/core/config");

// Config
// ---------------------------------------------------------

_.extend(config, {
    source: "./source",
    dest: "./dist",
    app: "app",
    vendor: "vendor",
    bower: {
        fonts: ["slick-carousel"],
        images: ["slick-carousel"],
        order: [
            "jquery/*.js",
            "foundation-sites/*.js",
            "**/*.js"
        ]
    }
});

var mo = require("mojs")(gulp, _, config);

// Tasks
// ---------------------------------------------------------

// Default
gulp.task("default", function() {
    $.taskListing();
});

mo("stylus");
mo("sass");
mo("browserify");
mo("jade");
mo("images");
mo("bower");
mo("serve");
mo("build");
