"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
var _areMomentRangesEqual = _interopRequireDefault(require("./areMomentRangesEqual"));
var _areMomentValuesEqual = _interopRequireDefault(require("./areMomentValuesEqual"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _default(previousProps, nextProps) {
  var previousValue = previousProps.value;
  var nextValue = nextProps.value;
  return !(previousValue === nextValue || (0, _areMomentValuesEqual["default"])(previousValue, nextValue) || (0, _areMomentRangesEqual["default"])(previousValue, nextValue));
}