// ---------------------------------------------------------
// Serve
// ---------------------------------------------------------

module.exports = function(gulp, _, $, config, utils) {

    // Dependencies
    // ---------------------------------------------------------

    // _.extend($, {});

    // Config
    // ---------------------------------------------------------

    config.serve = {
        stylus: "/styles/**/*.styl",
        browserify: "/scripts/**/*.js",
        jade: "./dist/*.html"
    };

    // Public Methods
    // ---------------------------------------------------------

    function watch() {
        gulp.task("watch", function() {
            gulp.watch(config.source + config.serve.stylus, ['stylus']);
            gulp.watch(config.source + config.serve.browserify, ['browserify']);
            gulp.watch(config.serve.jade, $.browserSync.reload);
        });
    }

    function sync() {
        gulp.task("browser-sync", function() {
            $.browserSync({
                // proxy: "localhost:9001",
                server: {
                    baseDir: "./"
                }
            });
        });
    }

    function serve() {
        gulp.task("serve", ["watch", "browser-sync"]);
    }

    // API
    // ---------------------------------------------------------

    return {
        watch: watch(),
        sync: sync(),
        serve: serve()
    };

};
