// ---------------------------------------------------------
// Sass
// ---------------------------------------------------------

module.exports = function(gulp, $, config, errors) {

    // Dependencies
    // ---------------------------------------------------------

    $.extend($, {
        sass: require("gulp-sass"),
        autoprefixer: require("gulp-autoprefixer"),
        sourcemaps: require("gulp-sourcemaps"),
        cssGlobbing: require('gulp-css-globbing')
    });

    // Config
    // ---------------------------------------------------------

    config.sass = {
        paths: ["/sass/**/*.{sass,scss}"],
        opts: {
            includePaths: [],
            indentedSyntax: true,
            precision: 10,
            outputStyle: "expanded",
            importer: []
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

    // Public Methods
    // ---------------------------------------------------------

    function deleteSass () {
        $.del(config.dest + "/" + config.label.app + ".{css,css.map,css.gz}");
    }

    function createSass () {
        gulp.src(config.source + config.sass.paths)
            .pipe($.cssGlobbing({ extensions: ['.scss', '.sass'] }))
            .pipe($.sass(config.sass.opts))
            .on('error', errors)
            .pipe($.autoprefixer(config.autoprefixer)
            .pipe($.rename({ basename: config.label.app }))
            .pipe(gulp.dest(config.dest))
            .pipe($.size({ showFiles: true })));
    }

    // API
    // ---------------------------------------------------------

    return {
        deleteSass: deleteSass,
        createSass: createSass
    };
};
