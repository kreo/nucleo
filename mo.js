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
    },
    serve: {
        host: "project.dev",
        proxy: "project.dev/",
        port: "9001"
    }
});

// Tasks
// ---------------------------------------------------------

mo.run([
    "default",
    "stylus",
    "sass",
    "browserify",
    "jade",
    "images",
    "fonts",
    "bower",
    "serve",
    "build"
]);

// mo.extend("custom", function(){
//     console.log("this is a custom task!");
// });
