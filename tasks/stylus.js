// ---------------------------------------------------------
// Stylus
// ---------------------------------------------------------

module.exports = function(gulp, $, config, errors) {

    // Dependencies
    // ---------------------------------------------------------

    $.extend($, {
        stylus: require('gulp-stylus'),
        autoprefixer: require("gulp-autoprefixer"),
        sourcemaps: require("gulp-sourcemaps"),
        axis: require("axis"),
        jeet: require("jeet"),
        rupture: require("rupture"),
        typographic: require("typographic"),
        cached: require("gulp-cached"),
    });

    // Config
    // ---------------------------------------------------------

    config.stylus = {
        paths: ["/styles/*.styl"],
        opts: {
            import: [],
            use: [
                $.axis(),
                $.jeet(),
                $.rupture(),
                $.typographic()
            ],
            "include css": true
        },
        autoprefixer: {
            browsers: ['last 3 versions'],
            cascade: false
        },
        sourcemaps: {
            includeContent: true,
            addComment: true
        }
    };

    // Methods
    // ---------------------------------------------------------

    var deleteStylus = function () {
        $.del(config.dest + "/" + config.label.app + ".{css,css.map,css.gz}");
    };

    var createStylus = function () {
        gulp.src(config.source + config.stylus.paths)
            .pipe($.cached('stylus'))
            .pipe($.sourcemaps.init())
            .pipe($.stylus(config.stylus.opts))
            .on('error', errors)
            .pipe($.autoprefixer(config.autoprefixer))
            .pipe($.rename({ basename: config.label.app }))
            .pipe($.sourcemaps.write(config.sourcemaps))
            .pipe(gulp.dest(config.dest))
            .pipe($.size({ showFiles: true }))
            .pipe($.browserSync.stream());
    };

    // Public
    // ---------------------------------------------------------

    return {
        deleteStylus: deleteStylus,
        createStylus: createStylus
    };
};
