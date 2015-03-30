/* */ 
var baseForIn = require("./baseForIn"),
    isArguments = require("../lang/isArguments"),
    isHostObject = require("./isHostObject"),
    isObjectLike = require("./isObjectLike"),
    support = require("../support");
var objectTag = '[object Object]';
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
var objToString = objectProto.toString;
function shimIsPlainObject(value) {
  var Ctor;
  if (!(isObjectLike(value) && objToString.call(value) == objectTag && !isHostObject(value)) || (!hasOwnProperty.call(value, 'constructor') && (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor))) || (!support.argsTag && isArguments(value))) {
    return false;
  }
  var result;
  if (support.ownLast) {
    baseForIn(value, function(subValue, key, object) {
      result = hasOwnProperty.call(object, key);
      return false;
    });
    return result !== false;
  }
  baseForIn(value, function(subValue, key) {
    result = key;
  });
  return typeof result == 'undefined' || hasOwnProperty.call(value, result);
}
module.exports = shimIsPlainObject;
