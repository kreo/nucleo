// ---------------------------------------------------------
// Config
// ---------------------------------------------------------

var $ = require("./plugins");
var _ = require("underscore");
_.extend($, {
    notify: require("gulp-notify")
});

// Config
// ---------------------------------------------------------

var config = {
    dest: "./dist",
    source: "./source",
    app: "app",
    vendor: "vendor",
    isProd: $.argv.prod || $.argv.p || false
};

/**
 * Designate that the given task should be watched.
 *
 * @param {string} task
 * @param {string} search
 * @param {string} group
 */
config.registerWatcher = function(task, search, group) {
    group = group || 'default';
    this.watchers[group] = this.watchers[group] || {};
    this.watchers[group][task] = search;
    return this;
};


/**
 * Register the given task to be triggered by Gulp.
 *
 * @param {string} task
 */
config.queueTask = function(task) {
    if (! _.contains(this.tasks, task)) {
        this.tasks.push(task);
    }
    return this;
};

module.exports = config;
