/*
 |--------------------------------------------------------------------------
 | Nucleo - ACSS+BEM Agnostic Framework
 |--------------------------------------------------------------------------
 | author: @kreo
 | https://github.com/kreo
 |
 */

/*jshint esversion: 6 */

window.N = {
    data: {
        view: $('.js-body').data('current-view').toString()
    },
    views: {},
    global: {
        getFilename: function(path) {
            return path.split('/').reverse()[0].replace(/\.[^/.]+$/, '');
        },
        load_scripts: function(array, cb) {
            var loader = function(src, handler) {
                var script = document.createElement("script");
                script.src = src;
                script.onload = script.onreadystatechange = function() {
                    script.onreadystatechange = script.onload = null;
                    handler();
                };
                var head = document.getElementsByTagName("head")[0];
                (head || document.body).appendChild(script);
            };
            (function() {
                if (array.length !== 0) {
                    loader(('https:' === location.protocol ? 'https:' : 'http:') + array.shift(), arguments.callee);
                } else {
                    callback && cb();
                }
            })();
        }
    },
    lib: {}
};

require("./organisms/*", {mode: "expand"});


(function($) {

    // Dependencies
    // -----------------------
    $(document).foundation();

    // Views
    // -----------------------
    N.views.common();
    // N.views.current !== undefined ? N.views.current() : false;

})(jQuery);
