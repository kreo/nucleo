// ---------------------------------------------------------
// Gulpfile.js
// ---------------------------------------------------------

var gulp = require("gulp");
var $ = {
    extend: require('extend'),
    fs: require("fs"),
    path: require("path"),
    del: require("del"),
    notify: require("gulp-notify"),
    browserSync: require('browser-sync'),
    size: require("gulp-size"),
    rename: require("gulp-rename"),
    taskListing: require("gulp-task-listing"),
    requireDir: require("require-dir"),
    if: require("gulp-if"),
    argv: require("yargs").argv,
    runSequence: require("run-sequence"),
    shell: require("gulp-shell"),
    util: require("gulp-util")
};

// Config -------------------------------------------------

var config = {
    dest: "./dist",
    source: "./source",
    label: {
        app: "app",
        vendor: "vendor"
    }
};

// Methods ------------------------------------------------

function errors () {
    // Send error to notification center with gulp-notify
    $.notify.onError({
        title: "Compile Error",
        message: "<%= error %>"
    }).apply(this, Array.prototype.slice.call(arguments));

    // Keep gulp from hanging on this task
    this.emit('end');
}

function getTask (task) {
    return require('./tasks/' + task)(gulp, $, config, errors);
}

// Tasks -------------------------------------------------

// Default
gulp.task("default", function() {
    $.taskListing();
});

// Sass
// gulp.task("delete:sass", getTask("sass").deleteSass);
// gulp.task("create:sass", getTask("sass").createSass);
// gulp.task("sass", ["delete:sass", "create:sass"]);

// Stylus
gulp.task("delete:stylus", getTask("stylus").deleteStylus);
gulp.task("create:stylus", getTask("stylus").createStylus);
gulp.task("stylus", ["delete:stylus", "create:stylus"]);

// Browserify
gulp.task("delete:browserify", getTask("browserify").deleteBrowserify);
gulp.task("create:browserify", getTask("browserify").createBrowserify);
gulp.task("browserify", ["delete:browserify", "create:browserify"]);

// Jade
gulp.task("delete:jade", getTask("jade").deleteJade);
gulp.task("create:jade", getTask("jade").createJade);
gulp.task("jade", ["delete:jade", "create:jade"]);

// BrowserSync
gulp.task("watch", getTask("serve").watch);
gulp.task("browser-sync", getTask("serve").sync);
gulp.task("serve", ["watch", "browser-sync"]);
