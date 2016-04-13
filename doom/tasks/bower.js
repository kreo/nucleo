// ---------------------------------------------------------
// Bower
// ---------------------------------------------------------

module.exports = function(gulp, _, $, config, utils) {

    // Dependencies
    // ---------------------------------------------------------

    _.extend($, {
        order: require("gulp-order"),
        replace: require("gulp-replace"),
        concat: require("gulp-concat"),
        cssnano: require("gulp-cssnano"),
        uglify: require("gulp-uglify")
    });

    // Config
    // ---------------------------------------------------------

    var vendorPath = config.source + "/" + config.vendor;

    config.bower = {
        styles: vendorPath + "/**/*.css",
        scripts: vendorPath + "/**/*.js",
        fonts: ['slick-carousel'],
        images: ['slick-carousel'],
        order: []
    };

    // Private Methods
    // ---------------------------------------------------------

    function getEnv() {
        if ($.argv.prod === true) {
            return ' -p';
        } else {
            return '';
        }
    }

    function createVendorStack(vendorSrc, vendorFiles) {
        var vendorStack = [];
        for (var i = 0; i < vendorSrc.length; i++) {
            vendorStack.push(vendorPath + "/" + vendorSrc[i] + vendorFiles);
        }
        return vendorStack;
    }

    // Public Methods
    // ---------------------------------------------------------

    function clean() {
        gulp.task("clean:bower", function() {
            $.del([
                "./bower_components",
                config.dest + "/" + config.vendor,
                config.source + "/" + config.vendor
            ]);
        });
    }

    // @TODO add map to styles

    function createStyles() {
        gulp.task("create:bower.styles", function() {
            gulp.src(config.bower.styles)
                .pipe($.order(config.bower.order))
                .pipe($.concat(config.vendor + ".css"))
                .pipe($.replace(/[^'"()]*(\/[\w-]*(\.(jpeg|jpg|gif|png|woff2|woff|ttf|svg|eot)))/ig, './vendor$1'))
                .pipe($.if($.argv.prod, $.mirror(
                    $.cssnano(), //.pipe($.gitshasuffix()),
                    $.cssnano().pipe($.gzip())
                )))
                .pipe(gulp.dest(config.dest))
                .on('error', utils.errors)
                .pipe($.size({
                    showFiles: true
                }));
        });
    }

    // @TODO add map to scripts

    function createScripts() {
        gulp.task("create:bower.scripts", function() {
            gulp.src(config.bower.scripts)
                .pipe($.order(config.bower.order))
                .pipe($.concat(config.vendor + ".js"))
                .pipe($.if($.argv.prod, $.mirror(
                    $.uglify({
                        mangle: true
                    }), //.pipe($.gitshasuffix()),
                    $.uglify({
                        mangle: true
                    }).pipe($.gzip())
                )))
                .pipe(gulp.dest(config.dest))
                .on('error', utils.errors)
                .pipe($.size({
                    showFiles: true
                }));
        });
    }

    function createFonts() {
        gulp.task("create:bower.fonts", function() {
            gulp.src(createVendorStack(config.bower.fonts, '/*.{ttf,eot,svg,woff,woff2}'))
                .pipe($.rename({
                    dirname: config.vendor
                }))
                .pipe(gulp.dest(config.dest))
                .on('error', utils.errors)
                .pipe($.size({
                    showFiles: true
                }));
        });
    }

    function createImages() {
        gulp.task("create:bower.images", function() {
            gulp.src(createVendorStack(config.bower.images, '/*.{gif,png,jpg,jpeg,cur}'))
                .pipe($.rename({
                    dirname: 'vendor'
                }))
                .pipe(gulp.dest(config.dest))
                .on('error', utils.errors)
                .pipe($.size({
                    showFiles: true
                }));
        });
    }

    function install() {
        gulp.task("install:bower", $.shell.task("bower-installer" + getEnv()));
    }

    function bundle() {
        gulp.task("bower", ["clean:bower"], function() {
            $.runSequence("install:bower", [
                "create:bower.styles",
                "create:bower.scripts",
                "create:bower.fonts",
                "create:bower.images"
            ]);
        });
    }

    // API
    // ---------------------------------------------------------

    return {
        install: install(),
        clean: clean(),
        createStyles: createStyles(),
        createScripts: createScripts(),
        createFonts: createFonts(),
        createImages: createImages(),
        bundle: bundle()
    };

};
