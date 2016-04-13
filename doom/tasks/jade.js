// ---------------------------------------------------------
// Jade
// ---------------------------------------------------------

module.exports = function(gulp, _, $, config, utils) {

    // Dependencies
    // ---------------------------------------------------------

    _.extend($, {
        jade: require("gulp-jade"),
        jadeGlobbing: require("gulp-jade-globbing")
    });

    // Config
    // ---------------------------------------------------------

    config.jade = {
        paths: "/**/*.jade",
        opts: {
            pretty: true,
            cache: true
        }
    };

    // Public Methods
    // ---------------------------------------------------------

    function clean() {
        gulp.task("clean:jade", function() {
            $.del(config.dest + "/markup");
        });
    }

    function create() {
        gulp.task("create:jade", function() {
            gulp.src(config.source + config.jade.paths)
                .pipe($.jade())
                .on('error', utils.errors)
                .pipe(gulp.dest(config.dest))
                .pipe($.size({
                    showFiles: true
                }))
                .pipe($.if(config.isProd, $.browserSync.reload({
                    stream: true
                })));
        });
    }

    function bundle() {
        gulp.task("jade", ["clean:jade", "create:jade"]);
    }

    // API
    // ---------------------------------------------------------

    return {
        clean: clean(),
        create: create(),
        bundle: bundle()
    };
};
