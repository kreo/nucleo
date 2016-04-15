/*
 |--------------------------------------------------------------------------
 | Mo - Settings
 |--------------------------------------------------------------------------
 | author: @kreo
 | https://github.com/kreo
 |--------------------------------------------------------------------------
 */

/*jshint esversion: 6 */

var gulp = require("gulp");
var mo = require("mojs")(gulp, {
    source: "./source",
    dest: "./dist",
    app: "app",
    vendor: "vendor",
    bower: {
        plugins: ["slick-carousel"],
        order: [
            "jquery/*.js",
            "foundation-sites/*.js",
            "**/*.js"
        ]
    }
});

// Tasks
// ---------------------------------------------------------

mo.run([
    "default",
    "clean",
    "stylus",
    "sass",
    "browserify",
    "jade",
    "jade",
    "images",
    "fonts",
    "bower",
    "serve",
    "build"
]);

mo.extend("custom", function(){
    console.log("this is a custom task!");
});
