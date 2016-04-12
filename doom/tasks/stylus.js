// ---------------------------------------------------------
// Stylus
// ---------------------------------------------------------

module.exports = function(gulp, _, $, config, errors) {

    // Dependencies
    // ---------------------------------------------------------

    _.extend($, {
        stylus: require('gulp-stylus'),
        autoprefixer: require("gulp-autoprefixer"),
        sourcemaps: require("gulp-sourcemaps"),
        axis: require("axis"),
        jeet: require("jeet"),
        rupture: require("rupture"),
        typographic: require("typographic"),
        cached: require("gulp-cached"),
        gzip: require("gulp-gzip"),
        buffer: require("vinyl-buffer"),
        mirror: require("gulp-mirror"),
        cssnano: require("gulp-cssnano")
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
            "include css": true,
            compress: config.isProd,
            comment: !config.isProd
        },
        autoprefixer: {
            browsers: ['last 3 versions'],
            cascade: false
        },
        sourcemaps: {
            includeContent: true,
            addComment: !config.isProd
        }
    };

    // Public Methods
    // ---------------------------------------------------------

    function deleteStylus() {
        $.del(config.dest + "/" + config.app + ".{css,css.map,css.gz}");
    }

    function createStylus() {
        gulp.src(config.source + config.stylus.paths)
            .pipe($.cached('stylus'))
            .pipe($.buffer())
            .pipe($.sourcemaps.init())
            .pipe($.stylus(config.stylus.opts))
            .pipe($.if(config.isProd, $.stylus(config.stylus.opts)))
            .on('error', errors)
            .pipe($.autoprefixer(config.autoprefixer))
            .pipe($.rename({
                basename: config.app
            }))
            .pipe($.if(!config.isProd, $.sourcemaps.write(config.sourcemaps)))
            .pipe($.if(config.isProd, $.mirror(
                $.cssnano(), //.pipe($.gitshasuffix()),
                $.cssnano().pipe($.gzip())
            )))
            .pipe(gulp.dest(config.dest))
            .pipe($.size({
                showFiles: true
            }))
            .pipe($.if(config.isProd, $.browserSync.reload({
                stream: true
            })));
    }

    // API
    // ---------------------------------------------------------

    return {
        deleteStylus: deleteStylus,
        createStylus: createStylus
    };
};
