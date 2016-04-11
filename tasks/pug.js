// ---------------------------------------------------------
// Pug
// ---------------------------------------------------------

module.exports = function (gulp, $, config) {

    // Dependencies
    // ---------------------------------------------------------

    $.extend($, {
        pug: require("gulp-pug")
    });

    // Config
    // ---------------------------------------------------------

    config.pug = {
        paths: ["/markup"],
        opts: {
            pretty: true,
            cache: false
        }
    };

    // Methods
    // ---------------------------------------------------------

    var deletePug = function () {
        console.log("deleted");
    };

    var createPug = function () {
        gulp.src(config.source + config.pug.paths)
            .pipe($.pug(config.pug))
            .pipe(gulp.dest(config.dest));
    };

    // Public
    // ---------------------------------------------------------

    return {
        deletePug: createPug,
        createPug: createPug
    };
};
