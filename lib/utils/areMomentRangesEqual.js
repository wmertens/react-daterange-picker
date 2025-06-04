"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = areMomentRangesEqual;
var _isMomentRange = _interopRequireDefault(require("./isMomentRange"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function areMomentRangesEqual(r1, r2) {
  if (!(0, _isMomentRange["default"])(r1) || !(0, _isMomentRange["default"])(r2)) {
    return false;
  }
  return r1.start.isSame(r2.start, 'day') && r1.end.isSame(r2.end, 'day');
}