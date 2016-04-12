// ---------------------------------------------------------
// Browserify
// ---------------------------------------------------------

module.exports = function(gulp, $, config, errors) {

    // Dependencies
    // ---------------------------------------------------------

    $.extend($, {
        browserify: require("browserify"),
        globify: require("require-globify"),
        globby: require("globby"),
        debowerify: require("debowerify"),
        deamdify: require("deamdify"),
        cached: require("gulp-cached"),
        mirror: require("gulp-mirror"),
        source: require("vinyl-source-stream"),
        uglify: require("gulp-uglify"),
        gzip: require("gulp-gzip"),
        through: require("through2"),
        buffer: require("vinyl-buffer"),
    });

    // Config
    // ---------------------------------------------------------

    var isProd = $.argv.prod || $.argv.p || false;

    config.browserify = {
        entries: [config.source + "/scripts/*.js"],
        transform: [$.globify, $.debowerify, $.deamdify],
        debug: !isProd,
        sourcemaps: {
            includeContent: true,
            addComment: !isProd
        }
    };

    // Methods
    // ---------------------------------------------------------

    var deleteBrowserify = function() {
        $.del(config.dest + "/" + config.label.app + ".{js,js.map,js.gz}");
    };

    var createBrowserify = function() {
        var bundledStream = $.through();

        bundledStream.pipe($.source(config.label.app + ".js"))
            .pipe($.cached('linting'))
            .pipe($.buffer())
            .pipe($.sourcemaps.init())
            .on('error', errors)
            .pipe($.sourcemaps.write(config.browserify.sourcemaps))
            .pipe($.if(isProd, $.mirror(
                $.uglify({mangle: true}), //.pipe($.gitshasuffix()),
                $.uglify({mangle: true}).pipe($.gzip())
            )))
            .pipe(gulp.dest(config.dest))
            .pipe($.browserSync.reload({stream:true}))
            .pipe($.size({showFiles: true}));

        $.globby(config.browserify.entries).then(function(entries) {
            var b = $.browserify({
                entries: entries,
                transform: config.browserify.transform,
                debug: config.browserify.debug
            });

            b.bundle().pipe(bundledStream);
        }).catch(function(err) {
            bundledStream.emit('error', err);
        });

        return bundledStream;
    };

    // Public
    // ---------------------------------------------------------

    return {
        deleteBrowserify: deleteBrowserify,
        createBrowserify: createBrowserify
    };
};
