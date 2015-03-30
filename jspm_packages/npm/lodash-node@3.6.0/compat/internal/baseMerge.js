/* */ 
var arrayEach = require("./arrayEach"),
    baseForOwn = require("./baseForOwn"),
    baseMergeDeep = require("./baseMergeDeep"),
    isArray = require("../lang/isArray"),
    isLength = require("./isLength"),
    isObject = require("../lang/isObject"),
    isObjectLike = require("./isObjectLike"),
    isTypedArray = require("../lang/isTypedArray");
function baseMerge(object, source, customizer, stackA, stackB) {
  if (!isObject(object)) {
    return object;
  }
  var isSrcArr = isLength(source.length) && (isArray(source) || isTypedArray(source));
  (isSrcArr ? arrayEach : baseForOwn)(source, function(srcValue, key, source) {
    if (isObjectLike(srcValue)) {
      stackA || (stackA = []);
      stackB || (stackB = []);
      return baseMergeDeep(object, source, key, baseMerge, customizer, stackA, stackB);
    }
    var value = object[key],
        result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
        isCommon = typeof result == 'undefined';
    if (isCommon) {
      result = srcValue;
    }
    if ((isSrcArr || typeof result != 'undefined') && (isCommon || (result === result ? (result !== value) : (value === value)))) {
      object[key] = result;
    }
  });
  return object;
}
module.exports = baseMerge;
