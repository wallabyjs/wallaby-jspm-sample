/* */ 
var isLength = require("../internal/isLength"),
    isObjectLike = require("../internal/isObjectLike"),
    support = require("../support");
var argsTag = '[object Arguments]';
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
var objToString = objectProto.toString;
var propertyIsEnumerable = objectProto.propertyIsEnumerable;
function isArguments(value) {
  var length = isObjectLike(value) ? value.length : undefined;
  return isLength(length) && objToString.call(value) == argsTag;
}
if (!support.argsTag) {
  isArguments = function(value) {
    var length = isObjectLike(value) ? value.length : undefined;
    return isLength(length) && hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
  };
}
module.exports = isArguments;
