"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactAddonsShallowCompare = _interopRequireDefault(require("react-addons-shallow-compare"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _BemMixin2 = _interopRequireDefault(require("../utils/BemMixin"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var CalendarDatePeriod = /*#__PURE__*/function (_BemMixin) {
  function CalendarDatePeriod() {
    _classCallCheck(this, CalendarDatePeriod);
    return _callSuper(this, CalendarDatePeriod, arguments);
  }
  _inherits(CalendarDatePeriod, _BemMixin);
  return _createClass(CalendarDatePeriod, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare["default"])(this, nextProps, nextState);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
        color = _this$props.color,
        period = _this$props.period,
        innerColor = _this$props.innerColor;
      var modifiers = _defineProperty({}, period, true);
      var style;
      var innerStyle;
      if (color) {
        style = {
          backgroundColor: color
        };
      }
      if (innerColor) {
        innerStyle = {
          backgroundColor: innerColor,
          width: '100%',
          height: '100%'
        };
      }
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: style,
        className: this.cx({
          modifiers: modifiers
        })
      }, /*#__PURE__*/_react["default"].createElement("div", {
        style: innerStyle
      }));
    }
  }]);
}(_BemMixin2["default"]);
_defineProperty(CalendarDatePeriod, "displayName", 'CalendarDatePeriod');
_defineProperty(CalendarDatePeriod, "propTypes", {
  color: _propTypes["default"].string,
  period: _propTypes["default"].string,
  innerStyle: _propTypes["default"].object
});
var _default = exports["default"] = CalendarDatePeriod;