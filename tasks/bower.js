// ---------------------------------------------------------
// Bower
// ---------------------------------------------------------

module.exports = function(gulp, $, config, errors) {

    // Dependencies
    // ---------------------------------------------------------

    $.extend($, {
        order: require("gulp-order"),
        replace: require("gulp-replace"),
        concat: require("gulp-concat"),
        cssnano: require("gulp-cssnano"),
        uglify: require("gulp-uglify")
    });

    // Config
    // ---------------------------------------------------------

    // Private Methods
    // ---------------------------------------------------------

    function createBowerStack(bowerSrc, bowerFiles) {
        var bowerStack = [];
        for (var i = 0; i < bowerSrc.length; i++) {
            bowerStack.push(bowerSrc[i] + bowerFiles);
        }
        return bowerStack;
    }

    // Public Methods
    // ---------------------------------------------------------

    function deleteBower() {
        $.del([
            "./bower_components",
            config.dest + "/" + config.label.vendor,
            config.source + "/" + config.label.vendor
        ]);
    }

    function createBower() {
        console.log("created vendor files");
    }

    // API
    // ---------------------------------------------------------

    return {
        installBower: $.shell.task("bower-installer"),
        deleteBower: deleteBower,
        createBower: createBower
    };
};
