// ---------------------------------------------------------
// Browserify
// ---------------------------------------------------------

module.exports = function(gulp, $, config, errors) {

    // Dependencies
    // ---------------------------------------------------------

    $.extend($, {
        browserify: require("browserify"),
        globify: require("require-globify"),
        cached: require("gulp-cached"),
        streamify: require("gulp-streamify"),
        mirror: require("gulp-mirror"),
        vinylSource: require("vinyl-source-stream")
    });

    // Config
    // ---------------------------------------------------------

    // var isProd = $.argv.prod || false;

    config.browserify = {
        entries: [config.source + "/scripts/index.js"],
        transform: [$.globify],
        // debug: !isProd
    };

    // Methods
    // ---------------------------------------------------------

    var deleteBrowserify = function() {
        $.del(config.dest + "/" + config.label.app + ".{js,js.map,js.gz}");
    };

    var createBrowserify = function() {
        $.browserify(config.browserify)
            .bundle()
            .on("error", errors)
            .pipe($.vinylSource(config.label.app + ".js"))
            .pipe($.cached('linting'))
            // .pipe($.streamify(
            //     $.gulp_if(isProd, $.mirror(
            //         $.uglify({
            //             mangle: true
            //         }), //.pipe($.gitshasuffix()),
            //         $.uglify({
            //             mangle: true
            //         }).pipe($.gzip())
            //     ))))
            .pipe(gulp.dest(config.dest))
            .pipe($.streamify($.size({
                showFiles: true
            })));
    };

    // Public
    // ---------------------------------------------------------

    return {
        deleteBrowserify: deleteBrowserify,
        createBrowserify: createBrowserify
    };
};
