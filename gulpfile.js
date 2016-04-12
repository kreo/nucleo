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
    if: require("gulp-if"),
    argv: require("yargs").argv,
    runSequence: require("run-sequence").use(gulp),
    shell: require("gulp-shell")
};

// Config
// ---------------------------------------------------------

var config = {
    dest: "./dist",
    source: "./source",
    label: {
        app: "app",
        vendor: "vendor"
    },
    isProd: $.argv.prod || $.argv.p || false
};

// Methods
// ---------------------------------------------------------

function errors() {
    // Send error to notification center with gulp-notify
    $.notify.onError({
        title: "Compile Error",
        message: "<%= error %>"
    }).apply(this, Array.prototype.slice.call(arguments));

    // Keep gulp from hanging on this task
    this.emit('end');
}

function getTask(task) {
    return require('./tasks/' + task)(gulp, $, config, errors);
}

// Tasks
// ---------------------------------------------------------

// Default
gulp.task("default", function(){
    $.taskListing();
});

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

// Bower
gulp.task("install:bower", getTask("bower").installBower);
gulp.task("delete:bower", getTask("bower").deleteBower);
gulp.task("create:bower.styles", getTask("bower").createBowerStyles);
gulp.task("create:bower.scripts", getTask("bower").createBowerScripts);
gulp.task("create:bower.fonts", getTask("bower").createBowerFonts);
gulp.task("create:bower.images", getTask("bower").createBowerImages);
gulp.task("bower", ["delete:bower"], function() {
    $.runSequence("install:bower",[
        "create:bower.styles",
        "create:bower.scripts",
        "create:bower.fonts",
        "create:bower.images"
    ]);
});

// BrowserSync
gulp.task("watch", getTask("serve").watch);
gulp.task("browser-sync", getTask("serve").sync);
gulp.task("serve", ["watch", "browser-sync"]);

// Not Used Tasks
// ---------------------------------------------------------
// Sass
// gulp.task("delete:sass", getTask("sass").deleteSass);
// gulp.task("create:sass", getTask("sass").createSass);
// gulp.task("sass", ["delete:sass", "create:sass"]);
