// ---------------------------------------------------------
// Browserify
// ---------------------------------------------------------

module.exports = function(gulp, _, $, config, utils) {

    // Dependencies
    // ---------------------------------------------------------

    _.extend($, {
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

    config.browserify = {
        entries: [config.source + "/scripts/*.js"],
        transform: [$.globify, $.debowerify, $.deamdify],
        debug: !config.isProd,
        sourcemaps: {
            includeContent: true,
            addComment: !config.isProd
        }
    };

    // Public Methods
    // ---------------------------------------------------------

    function clean() {
        gulp.task("clean:browserify", function(){
            $.del(config.dest + "/" + config.app + ".{js,js.map,js.gz}");
        });
    }

    function create() {
        gulp.task("create:browserify", function(){
            var bundledStream = $.through();

            bundledStream.pipe($.source(config.app + ".js"))
                .pipe($.cached('linting'))
                .pipe($.buffer())
                .pipe($.sourcemaps.init())
                .on('error', utils.errors)
                .pipe($.sourcemaps.write(config.browserify.sourcemaps))
                .pipe($.if(config.isProd, $.mirror(
                    $.uglify({
                        mangle: true
                    }), //.pipe($.gitshasuffix()),
                    $.uglify({
                        mangle: true
                    }).pipe($.gzip())
                )))
                .pipe(gulp.dest(config.dest))
                .pipe($.size({
                    showFiles: true
                }))
                .pipe($.if(config.isProd, $.browserSync.reload({
                    stream: true
                })));

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
        });
    }

    function bundle() {
        gulp.task("browserify", ["clean:browserify", "create:browserify"]);
    }

    // API
    // ---------------------------------------------------------

    return {
        clean: clean(),
        create: create(),
        bundle: bundle()
    };
};
