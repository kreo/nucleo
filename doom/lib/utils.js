// ---------------------------------------------------------
// Utils
// ---------------------------------------------------------

module.exports = (function (gulp, _, $, config, utils) {

    function errors() {
        // Send error to notification center with gulp-notify
        $.notify.onError({
            title: "Compile Error",
            message: "<%= error %>"
        }).apply(this, Array.prototype.slice.call(arguments));

        // Keep gulp from hanging on this task
        this.emit('end');
    }

    return {
        errors: errors
    };

})();
