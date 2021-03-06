/*
 |--------------------------------------------------------------------------
 | Mo - Settings
 |--------------------------------------------------------------------------
 | author: @kreo
 | https://github.com/kreo
 |
 */

/*jshint esversion: 6 */

var gulp = require("gulp");
var mo = require("mojs")(gulp, {
    source: __dirname + "/source",
    dest: __dirname + "/dist",
    app: "app",
    vendor: "vendor",
    mail: "mail",
    bower: {
        plugins: ["slick-carousel", "owl-carousel"],
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
    "browserify",
    "pug",
    "images",
    "fonts",
    "bower",
    "serve",
    "build",
    "sass",
    // "mail",
    // "sprites"
]);
