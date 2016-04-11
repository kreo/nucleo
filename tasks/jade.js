// ---------------------------------------------------------
// Pug
// ---------------------------------------------------------

module.exports = function (gulp, $, config, errors) {

    // Dependencies
    // ---------------------------------------------------------

    $.extend($, {
        jade: require("gulp-jade")
    });

    // Config
    // ---------------------------------------------------------

    config.jade = {
        paths: ["/markup/**/*.jade"],
        opts: {
            pretty: true,
            cache: true
        }
    };

    // Methods
    // ---------------------------------------------------------

    var deleteJade = function () {
        console.log("deleted");
    };

    var createJade = function () {
        gulp.src(config.source + config.jade.paths)
            .pipe($.jade(config.jade.opts))
            .pipe(gulp.dest(config.dest + "/markup"));
    };

    // Public
    // ---------------------------------------------------------

    return {
        deleteJade: deleteJade,
        createJade: createJade
    };
};
