// ---------------------------------------------------------
// Gulpfile.js
// ---------------------------------------------------------

var gulp = require("gulp");
var _ = require("underscore");
var jsonfile = require("jsonfile");
var config = require("mojs/lib/config");
var bowerJson = require("./bower.json");

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

bowerJson.install.base = config.source;
jsonfile.writeFile("./bower.json", bowerJson, {
    spaces: 2
}, function(err) {
    if (err !== null) {
        return;
        // console.error(err);
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
mo("browserify");
mo("jade");
mo("serve");
mo("bower");
// mo("sass");
