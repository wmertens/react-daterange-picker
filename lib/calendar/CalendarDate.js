"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactAddonsShallowCompare = _interopRequireDefault(require("react-addons-shallow-compare"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _immutable = _interopRequireDefault(require("immutable"));
var _BemMixin2 = _interopRequireDefault(require("../utils/BemMixin"));
var _CustomPropTypes = _interopRequireDefault(require("../utils/CustomPropTypes"));
var _lightenDarkenColor = _interopRequireDefault(require("../utils/lightenDarkenColor"));
var _CalendarDatePeriod = _interopRequireDefault(require("./CalendarDatePeriod"));
var _CalendarHighlight = _interopRequireDefault(require("./CalendarHighlight"));
var _CalendarSelection = _interopRequireDefault(require("./CalendarSelection"));
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
var CalendarDate = /*#__PURE__*/function (_BemMixin) {
  function CalendarDate() {
    var _this;
    _classCallCheck(this, CalendarDate);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, CalendarDate, [].concat(args));
    _defineProperty(_this, "state", {
      mouseDown: false
    });
    _defineProperty(_this, "mouseUp", function () {
      _this.props.onSelectDate(_this.props.date);
      if (_this.isUnmounted) {
        return;
      }
      if (_this.state.mouseDown) {
        _this.setState({
          mouseDown: false
        });
      }
      document.removeEventListener('mouseup', _this.mouseUp);
    });
    _defineProperty(_this, "mouseDown", function () {
      _this.setState({
        mouseDown: true
      });
      document.addEventListener('mouseup', _this.mouseUp);
    });
    _defineProperty(_this, "touchEnd", function (event) {
      event.preventDefault();
      _this.props.onHighlightDate(_this.props.date);
      _this.props.onSelectDate(_this.props.date);
      if (_this.isUnmounted) {
        return;
      }
      if (_this.state.mouseDown) {
        _this.setState({
          mouseDown: false
        });
      }
      document.removeEventListener('touchend', _this.touchEnd);
    });
    _defineProperty(_this, "touchStart", function (event) {
      event.preventDefault();
      _this.setState({
        mouseDown: true
      });
      document.addEventListener('touchend', _this.touchEnd);
    });
    _defineProperty(_this, "mouseEnter", function () {
      _this.props.onHighlightDate(_this.props.date);
    });
    _defineProperty(_this, "mouseLeave", function () {
      if (_this.state.mouseDown) {
        _this.props.onSelectDate(_this.props.date);
        _this.setState({
          mouseDown: false
        });
      }
      _this.props.onUnHighlightDate(_this.props.date);
    });
    _defineProperty(_this, "getBemModifiers", function () {
      var _this$props = _this.props,
        date = _this$props.date,
        firstOfMonth = _this$props.firstOfMonth,
        today = _this$props.isToday;
      var otherMonth = false;
      var weekend = false;
      if (date.month() !== firstOfMonth.month()) {
        otherMonth = true;
      }
      if (date.day() === 0 || date.day() === 6) {
        weekend = true;
      }
      return {
        today: today,
        weekend: weekend,
        otherMonth: otherMonth
      };
    });
    _defineProperty(_this, "getBemStates", function () {
      var _this$props2 = _this.props,
        isSelectedDate = _this$props2.isSelectedDate,
        isInSelectedRange = _this$props2.isInSelectedRange,
        isInHighlightedRange = _this$props2.isInHighlightedRange,
        highlighted = _this$props2.isHighlightedDate,
        disabled = _this$props2.isDisabled;
      var selected = isSelectedDate || isInSelectedRange || isInHighlightedRange;
      return {
        disabled: disabled,
        highlighted: highlighted,
        selected: selected
      };
    });
    return _this;
  }
  _inherits(CalendarDate, _BemMixin);
  return _createClass(CalendarDate, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare["default"])(this, nextProps, nextState);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isUnmounted = true;
      document.removeEventListener('mouseup', this.mouseUp);
      document.removeEventListener('touchend', this.touchEnd);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
        date = _this$props3.date,
        dateRangesForDate = _this$props3.dateRangesForDate,
        isSelectedDate = _this$props3.isSelectedDate,
        isSelectedRangeStart = _this$props3.isSelectedRangeStart,
        isSelectedRangeEnd = _this$props3.isSelectedRangeEnd,
        isInSelectedRange = _this$props3.isInSelectedRange,
        isHighlightedDate = _this$props3.isHighlightedDate,
        isHighlightedRangeStart = _this$props3.isHighlightedRangeStart,
        isHighlightedRangeEnd = _this$props3.isHighlightedRangeEnd,
        isInHighlightedRange = _this$props3.isInHighlightedRange,
        styleDate = _this$props3.styleDate;
      var bemModifiers = this.getBemModifiers();
      var bemStates = this.getBemStates();
      var pending = isInHighlightedRange;
      var color;
      var amColor;
      var pmColor;
      var states = dateRangesForDate(date);
      var numStates = states.count();
      var cellStyle = {};
      var style = {};
      var highlightStyle = {};
      var highlightModifier;
      var selectionModifier;
      if (isSelectedDate || isSelectedRangeStart && isSelectedRangeEnd || isHighlightedRangeStart && isHighlightedRangeEnd) {
        selectionModifier = 'single';
      } else if (isSelectedRangeStart || isHighlightedRangeStart) {
        selectionModifier = 'start';
      } else if (isSelectedRangeEnd || isHighlightedRangeEnd) {
        selectionModifier = 'end';
      } else if (isInSelectedRange || isInHighlightedRange) {
        selectionModifier = 'segment';
      }
      if (isHighlightedDate) {
        highlightModifier = 'single';
      }
      if (numStates === 1) {
        // If there's only one state, it means we're not at a boundary
        color = states.getIn([0, 'color']);
        if (color) {
          cellStyle = {
            borderLeftColor: (0, _lightenDarkenColor["default"])(color, -10),
            borderRightColor: (0, _lightenDarkenColor["default"])(color, -10),
            backgroundColor: color
          };
          if (styleDate && styleDate.day === date.day()) {
            style.backgroundColor = styleDate.color;
          }
        }
      } else {
        amColor = states.getIn([0, 'color']);
        pmColor = states.getIn([1, 'color']);
        if (amColor) {
          cellStyle.borderLeftColor = (0, _lightenDarkenColor["default"])(amColor, -10);
        }
        if (pmColor) {
          cellStyle.borderRightColor = (0, _lightenDarkenColor["default"])(pmColor, -10);
        }
        if (styleDate && styleDate.day === date.day()) {
          style.backgroundColor = styleDate.color;
        }
      }
      var fontColor = states.getIn([0, 'fontColor']);
      var hoverFontColor = states.getIn([0, 'hoverFontColor']);
      if (fontColor) {
        cellStyle.color = states.getIn([0, 'fontColor']);
      }
      if (highlightModifier && hoverFontColor) {
        cellStyle.color = states.getIn([0, 'hoverFontColor']);
      }
      return /*#__PURE__*/_react["default"].createElement("td", {
        className: this.cx({
          element: 'Date',
          modifiers: bemModifiers,
          states: bemStates
        }),
        style: cellStyle,
        onTouchStart: this.touchStart,
        onMouseEnter: this.mouseEnter,
        onMouseLeave: this.mouseLeave,
        onMouseDown: this.mouseDown
      }, numStates > 1 && /*#__PURE__*/_react["default"].createElement("div", {
        className: this.cx({
          element: 'HalfDateStates'
        })
      }, /*#__PURE__*/_react["default"].createElement(_CalendarDatePeriod["default"], {
        period: "am",
        color: amColor,
        innerColor: style.backgroundColor
      }), /*#__PURE__*/_react["default"].createElement(_CalendarDatePeriod["default"], {
        period: "pm",
        color: pmColor,
        innerColor: style.backgroundColor
      })), numStates === 1 && /*#__PURE__*/_react["default"].createElement("div", {
        className: this.cx({
          element: 'FullDateStates'
        }),
        style: style
      }), /*#__PURE__*/_react["default"].createElement("span", {
        className: this.cx({
          element: 'DateLabel'
        })
      }, date.format('D')), selectionModifier ? /*#__PURE__*/_react["default"].createElement(_CalendarSelection["default"], {
        modifier: selectionModifier,
        pending: pending
      }) : null, highlightModifier ? /*#__PURE__*/_react["default"].createElement(_CalendarHighlight["default"], {
        modifier: highlightModifier
      }) : null);
    }
  }]);
}(_BemMixin2["default"]);
_defineProperty(CalendarDate, "displayName", 'CalendarDate');
_defineProperty(CalendarDate, "propTypes", {
  date: _CustomPropTypes["default"].moment,
  styleDate: _propTypes["default"].object,
  firstOfMonth: _propTypes["default"].object.isRequired,
  isSelectedDate: _propTypes["default"].bool,
  isSelectedRangeStart: _propTypes["default"].bool,
  isSelectedRangeEnd: _propTypes["default"].bool,
  isInSelectedRange: _propTypes["default"].bool,
  isHighlightedDate: _propTypes["default"].bool,
  isHighlightedRangeStart: _propTypes["default"].bool,
  isHighlightedRangeEnd: _propTypes["default"].bool,
  isInHighlightedRange: _propTypes["default"].bool,
  highlightedDate: _propTypes["default"].object,
  dateStates: _propTypes["default"].instanceOf(_immutable["default"].List),
  isDisabled: _propTypes["default"].bool,
  isToday: _propTypes["default"].bool,
  dateRangesForDate: _propTypes["default"].func,
  onHighlightDate: _propTypes["default"].func,
  onUnHighlightDate: _propTypes["default"].func,
  onSelectDate: _propTypes["default"].func
});
var _default = exports["default"] = CalendarDate;