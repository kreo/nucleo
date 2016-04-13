// ---------------------------------------------------------
// Sass
// ---------------------------------------------------------

module.exports = function(gulp, _, $, config, utils) {

    // Dependencies
    // ---------------------------------------------------------

    _.extend($, {
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

    function clean() {
        gulp.task("clean:sass", function() {
            $.del(config.dest + "/" + config.app + ".{css,css.map,css.gz}");
        });
    }

    function create() {
        gulp.task("create:sass", function() {
            gulp.src(config.source + config.sass.paths)
                .pipe($.cssGlobbing({
                    extensions: ['.scss', '.sass']
                }))
                .pipe($.sass(config.sass.opts))
                .on('error', utils.errors)
                .pipe($.autoprefixer(config.autoprefixer)
                    .pipe($.rename({
                        basename: config.app
                    }))
                    .pipe(gulp.dest(config.dest))
                    .pipe($.size({
                        showFiles: true
                    })));
        });
    }

    function bundle() {
        gulp.task("sass", ["clean:sass", "create:sass"]);
    }

    // API
    // ---------------------------------------------------------

    return {
        clean: clean(),
        create: create(),
        bundle: bundle()
    };

};
