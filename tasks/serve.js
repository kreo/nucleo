// ---------------------------------------------------------
// Serve
// ---------------------------------------------------------

module.exports = function(gulp, $, config, errors) {

    // Dependencies ----------------------------------------

    // $.extend($, {});

    // Config ----------------------------------------------

    config.serve = {
        stylus: "/styles/**/*.styl",
        browserify: "/scripts/**/*.js",
        jade: "./dist/*.html"
    };

    // Methods ---------------------------------------------

    var watch = function() {
        gulp.watch(config.source + config.serve.stylus, ['stylus']);
        gulp.watch(config.source + config.serve.browserify, ['browserify']);
        gulp.watch(config.serve.jade, $.browserSync.reload);
    };

    var sync = function() {
        $.browserSync({
            // proxy: "localhost:9001",
            server: {
                baseDir: "./"
            }
        });
    };

    // Public ----------------------------------------------

    return {
        watch: watch,
        sync: sync
    };
};
