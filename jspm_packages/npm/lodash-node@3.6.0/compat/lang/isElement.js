/* */ 
var isHostObject = require("../internal/isHostObject"),
    isObjectLike = require("../internal/isObjectLike"),
    isPlainObject = require("./isPlainObject"),
    support = require("../support");
var objectProto = Object.prototype;
var objToString = objectProto.toString;
function isElement(value) {
  return !!value && value.nodeType === 1 && isObjectLike(value) && (support.nodeTag ? (objToString.call(value).indexOf('Element') > -1) : isHostObject(value));
}
if (!support.dom) {
  isElement = function(value) {
    return !!value && value.nodeType === 1 && isObjectLike(value) && !isPlainObject(value);
  };
}
module.exports = isElement;
