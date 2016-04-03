// =========================================================
// gulpfile.js
// =========================================================
// ------------------------------------------------ requires
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    stylus = require('gulp-stylus');

// ------------------------------------------------- configs
var paths = {
    src: 'source',
    dist: 'dist',
    sass: {
        src: 'source/**/*.{scss,sass}',
        dest: 'dist',
        opts: {}
    },
    stylus: {
        src: 'source/**/*.{styl}',
        dest: 'dist',
        opts: {}
    }
};

// ---------------------------------------------- Gulp Tasks

// Sass
gulp.task('sass', function() {
    return gulp.src(paths.sass.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.sass.dest));
});

// Stylus
// gulp.task('stylus', function() {
//     return gulp.src(paths.stylus.src)
//         .pipe(stylus().on('error', stylus.logError))
//         .pipe(gulp.dest(paths.stylus.dest));
// });

gulp.task('ds', function () {
      gulp.src(paths.src + '/**/*.styl')
        // .pipe(sourcemaps.init())
        .pipe(stylus({
        //   paths:  ['node_modules'],
        //   import: ['jeet/stylus/jeet', 'rupture/rupture'],
        //   use: [nib()]
        }))
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.dist))
        // .pipe(browserSync.stream());
    });

// ------------------------------------ Gulp Testing Message
gulp.task('message', function() {
    console.log('It works!!');
});

// ---------------------------------------------- Gulp Watch
gulp.task('watch:styles', function() {
    gulp.watch(paths.sass.src, gulp.series('sass'));
});

gulp.task('watch', gulp.series('sass',
    gulp.parallel('watch:styles')
));


// -------------------------------------------- Default task
gulp.task('default', gulp.series('sass',
    gulp.parallel('message', 'watch')
));
