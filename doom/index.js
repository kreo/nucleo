module.exports = function (gulp){

  var _ = require("underscore");
  var $ = require("./lib/plugins");
  var config = require("./lib/config");
  var utils = require("./lib/utils");

  function getTask(task) {
      return require("./tasks/" + task)(gulp, _, $, config, utils);
  }

  return getTask;
  
};
