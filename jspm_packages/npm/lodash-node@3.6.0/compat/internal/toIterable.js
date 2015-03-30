/* */ 
(function(process) {
  var isLength = require("./isLength"),
      isObject = require("../lang/isObject"),
      isString = require("../lang/isString"),
      support = require("../support"),
      values = require("../object/values");
  function toIterable(value) {
    if (value == null) {
      return [];
    }
    if (!isLength(value.length)) {
      return values(value);
    }
    if (support.unindexedChars && isString(value)) {
      return value.split('');
    }
    return isObject(value) ? value : Object(value);
  }
  module.exports = toIterable;
})(require("process"));
