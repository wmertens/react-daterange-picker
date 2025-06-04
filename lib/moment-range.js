"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _moment = _interopRequireDefault(require("moment"));
var _momentRange = require("moment-range");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var moment = (0, _momentRange.extendMoment)(_moment["default"]);
var _default = exports["default"] = moment;