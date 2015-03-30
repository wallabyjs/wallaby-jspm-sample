/* */ 
var isLength = require("../internal/isLength"),
    isNative = require("../lang/isNative"),
    isObject = require("../lang/isObject"),
    shimKeys = require("../internal/shimKeys"),
    support = require("../support");
var nativeKeys = isNative(nativeKeys = Object.keys) && nativeKeys;
var keys = !nativeKeys ? shimKeys : function(object) {
  if (object) {
    var Ctor = object.constructor,
        length = object.length;
  }
  if ((typeof Ctor == 'function' && Ctor.prototype === object) || (typeof object == 'function' ? support.enumPrototypes : (length && isLength(length)))) {
    return shimKeys(object);
  }
  return isObject(object) ? nativeKeys(object) : [];
};
module.exports = keys;
