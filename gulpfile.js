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
    gulpIf: require("gulp-if")
};


// Config
// ---------------------------------------------------------

var config = {
    dest: "./dist",
    source: "./source",
    label: {
        app: "app",
        vendor: "vendor"
    }
};

// Methods
// ---------------------------------------------------------

var errors = function() {
    // Send error to notification center with gulp-notify
    $.notify.onError({
        title: "Compile Error",
        message: "<%= error %>"
    }).apply(this, Array.prototype.slice.call(arguments));

    // Keep gulp from hanging on this task
    this.emit('end');
};

// Tasks
// ---------------------------------------------------------

var tasks = $.requireDir("./tasks", {
    recurse: true
});

// Default
gulp.task("default", function() {
    $.taskListing();
});

// Stylus
gulp.task("delete:stylus", tasks.stylus(gulp, $, config, errors).deleteStylus);
gulp.task("create:stylus", tasks.stylus(gulp, $, config, errors).createStylus);

// Sass
gulp.task("delete:sass", tasks.sass(gulp, $, config, errors).deleteSass);
gulp.task("create:sass", tasks.sass(gulp, $, config, errors).createSass);

// Browserify
gulp.task("delete:browserify", tasks.browserify(gulp, $, config, errors).deleteBrowserify);
gulp.task("create:browserify", tasks.browserify(gulp, $, config, errors).createBrowserify);
