/* */ 
var isArguments = require("./isArguments"),
    isNative = require("./isNative"),
    shimIsPlainObject = require("../internal/shimIsPlainObject"),
    support = require("../support");
var objectTag = '[object Object]';
var objectProto = Object.prototype;
var objToString = objectProto.toString;
var getPrototypeOf = isNative(getPrototypeOf = Object.getPrototypeOf) && getPrototypeOf;
var isPlainObject = !getPrototypeOf ? shimIsPlainObject : function(value) {
  if (!(value && objToString.call(value) == objectTag) || (!support.argsTag && isArguments(value))) {
    return false;
  }
  var valueOf = value.valueOf,
      objProto = isNative(valueOf) && (objProto = getPrototypeOf(valueOf)) && getPrototypeOf(objProto);
  return objProto ? (value == objProto || getPrototypeOf(value) == objProto) : shimIsPlainObject(value);
};
module.exports = isPlainObject;
