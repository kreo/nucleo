// ---------------------------------------------------------
// Plugins
// ---------------------------------------------------------

var gulp = require("gulp");
$ = {
    fs: require("fs"),
    path: require("path"),
    del: require("del"),
    notify: require("gulp-notify"),
    browserSync: require('browser-sync'),
    size: require("gulp-size"),
    rename: require("gulp-rename"),
    taskListing: require("gulp-task-listing"),
    if: require("gulp-if"),
    argv: require("yargs").argv,
    runSequence: require("run-sequence").use(gulp),
    requireDir: require("require-dir"),
    shell: require("gulp-shell")
};

module.exports = $;
