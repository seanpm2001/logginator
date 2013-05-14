var path = require('path');
var winston = require('winston');
var TaggedConsoleTarget = require('tagged-console-target');
var TaggedLogger = require('tagged-logger');

function moduleName() {
  if (module && module.parent && module.parent.id) {
    var moduleFile = path.basename(module.parent.id);
    var nameMatch = /(.*)\.js$/.exec(moduleFile);
    if (nameMatch && nameMatch[1])
      return nameMatch[1];
  }
  return "main";
}

module.exports = function (config) {
  config || config = { transports: [ new TaggedConsoleTarget() ] };
  var winstonLogger = new (winston.Logger)(config);
  var log = new TaggedLogger(winstonLogger, []);

  var tag = moduleName();
  return log.createSublogger(tag);
};
