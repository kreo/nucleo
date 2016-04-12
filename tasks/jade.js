// ---------------------------------------------------------
// Pug
// ---------------------------------------------------------

module.exports = function(gulp, $, config, errors) {

    // Dependencies
    // ---------------------------------------------------------

    $.extend($, {
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

    // Methods
    // ---------------------------------------------------------

    var deleteJade = function() {
        $.del(config.dest + "/markup");
    };

    var createJade = function() {
        gulp.src(config.source + config.jade.paths)
            .pipe($.jade())
            .pipe(gulp.dest(config.dest))
            .pipe($.size({
                showFiles: true
            }))
            .pipe($.browserSync.reload({
                stream: true
            }));
    };

    // Public
    // ---------------------------------------------------------

    return {
        deleteJade: deleteJade,
        createJade: createJade
    };
};
