"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactAddonsShallowCompare = _interopRequireDefault(require("react-addons-shallow-compare"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _moment = _interopRequireDefault(require("moment"));
var _momentRange = require("moment-range");
var _calendar = _interopRequireDefault(require("calendar"));
var _immutable = _interopRequireDefault(require("immutable"));
var _BemMixin2 = _interopRequireDefault(require("../utils/BemMixin"));
var _CustomPropTypes = _interopRequireDefault(require("../utils/CustomPropTypes"));
var _isMomentRange = _interopRequireDefault(require("../utils/isMomentRange"));
var _excluded = ["dateComponent", "value", "highlightedDate", "highlightedRange", "hideSelection", "enabledRange"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
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
var moment = (0, _momentRange.extendMoment)(_moment["default"]);
var CalendarMonth = /*#__PURE__*/function (_BemMixin) {
  function CalendarMonth() {
    var _this;
    _classCallCheck(this, CalendarMonth);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, CalendarMonth, [].concat(args));
    _defineProperty(_this, "setLocale", function (locale) {
      moment.locale(locale);
      _this.WEEKDAYS = _immutable["default"].List(moment.weekdays()).zip(_immutable["default"].List(moment.weekdaysShort()));
      _this.MONTHS = _immutable["default"].List(moment.months());
    });
    _defineProperty(_this, "renderDay", function (date, i) {
      var _this$props = _this.props,
        CalendarDate = _this$props.dateComponent,
        value = _this$props.value,
        highlightedDate = _this$props.highlightedDate,
        highlightedRange = _this$props.highlightedRange,
        hideSelection = _this$props.hideSelection,
        enabledRange = _this$props.enabledRange,
        props = _objectWithoutProperties(_this$props, _excluded);
      var d = moment(date).locale(_this.props.locale);
      var isInSelectedRange;
      var isSelectedDate;
      var isSelectedRangeStart;
      var isSelectedRangeEnd;
      if (!hideSelection && value && moment.isMoment(value) && value.isSame(d, 'day')) {
        isSelectedDate = true;
      } else if (!hideSelection && value && (0, _isMomentRange["default"])(value) && value.contains(d)) {
        isInSelectedRange = true;
        isSelectedRangeStart = value.start.isSame(d, 'day');
        isSelectedRangeEnd = value.end.isSame(d, 'day');
      }
      return /*#__PURE__*/_react["default"].createElement(CalendarDate, _extends({
        key: i,
        isToday: d.isSame(moment(), 'day'),
        isDisabled: !enabledRange.contains(d),
        isHighlightedDate: !!(highlightedDate && highlightedDate.isSame(d, 'day')),
        isHighlightedRangeStart: !!(highlightedRange && highlightedRange.start.isSame(d, 'day')),
        isHighlightedRangeEnd: !!(highlightedRange && highlightedRange.end.isSame(d, 'day')),
        isInHighlightedRange: !!(highlightedRange && highlightedRange.contains(d)),
        isSelectedDate: isSelectedDate,
        isSelectedRangeStart: isSelectedRangeStart,
        isSelectedRangeEnd: isSelectedRangeEnd,
        isInSelectedRange: isInSelectedRange,
        date: d
      }, props));
    });
    _defineProperty(_this, "renderWeek", function (dates, i) {
      var days = dates.map(_this.renderDay);
      return /*#__PURE__*/_react["default"].createElement("tr", {
        className: _this.cx({
          element: 'Week'
        }),
        key: i
      }, days.toJS());
    });
    _defineProperty(_this, "renderDayHeaders", function () {
      var firstOfWeek = _this.props.firstOfWeek;
      var indices = _immutable["default"].Range(firstOfWeek, 7).concat(_immutable["default"].Range(0, firstOfWeek));
      var headers = indices.map(function (index) {
        var weekday = this.WEEKDAYS.get(index);
        return /*#__PURE__*/_react["default"].createElement("th", {
          className: this.cx({
            element: 'WeekdayHeading'
          }),
          key: weekday,
          scope: "col"
        }, /*#__PURE__*/_react["default"].createElement("abbr", {
          title: weekday[0]
        }, weekday[1]));
      }.bind(_this));
      return /*#__PURE__*/_react["default"].createElement("tr", {
        className: _this.cx({
          element: 'Weekdays'
        })
      }, headers.toJS());
    });
    _defineProperty(_this, "handleYearChange", function (event) {
      _this.props.onYearChange(parseInt(event.target.value, 10));
    });
    _defineProperty(_this, "renderYearChoice", function (year) {
      var enabledRange = _this.props.enabledRange;
      if (year < enabledRange.start.year()) {
        return null;
      }
      if (year > enabledRange.end.year()) {
        return null;
      }
      return /*#__PURE__*/_react["default"].createElement("option", {
        key: year,
        value: year
      }, moment(year, 'YYYY').locale(_this.props.locale).format('YYYY'));
    });
    _defineProperty(_this, "renderHeaderYear", function () {
      var firstOfMonth = _this.props.firstOfMonth;
      var y = firstOfMonth.year();
      var years = _immutable["default"].Range(y - 5, y).concat(_immutable["default"].Range(y, y + 10));
      var choices = years.map(_this.renderYearChoice);
      var modifiers = {
        year: true
      };
      return /*#__PURE__*/_react["default"].createElement("span", {
        className: _this.cx({
          element: 'MonthHeaderLabel',
          modifiers: modifiers
        })
      }, firstOfMonth.locale(_this.props.locale).format('YYYY'), _this.props.disableNavigation ? null : /*#__PURE__*/_react["default"].createElement("select", {
        className: _this.cx({
          element: 'MonthHeaderSelect'
        }),
        value: y,
        onChange: _this.handleYearChange
      }, choices.toJS()));
    });
    _defineProperty(_this, "handleMonthChange", function (event) {
      _this.props.onMonthChange(parseInt(event.target.value, 10));
    });
    _defineProperty(_this, "renderMonthChoice", function (month, i) {
      var _this$props2 = _this.props,
        firstOfMonth = _this$props2.firstOfMonth,
        enabledRange = _this$props2.enabledRange;
      var disabled = false;
      var year = firstOfMonth.year();
      if (moment({
        years: year,
        months: i + 1,
        date: 1
      }).unix() < enabledRange.start.unix()) {
        disabled = true;
      }
      if (moment({
        years: year,
        months: i,
        date: 1
      }).unix() > enabledRange.end.unix()) {
        disabled = true;
      }
      return /*#__PURE__*/_react["default"].createElement("option", {
        key: month,
        value: i,
        disabled: disabled ? 'disabled' : null
      }, month);
    });
    _defineProperty(_this, "renderHeaderMonth", function () {
      var firstOfMonth = _this.props.firstOfMonth;
      var choices = _this.MONTHS.map(_this.renderMonthChoice);
      var modifiers = {
        month: true
      };
      return /*#__PURE__*/_react["default"].createElement("span", {
        className: _this.cx({
          element: 'MonthHeaderLabel',
          modifiers: modifiers
        })
      }, firstOfMonth.locale(_this.props.locale).format('MMMM'), _this.props.disableNavigation ? null : /*#__PURE__*/_react["default"].createElement("select", {
        className: _this.cx({
          element: 'MonthHeaderSelect'
        }),
        value: firstOfMonth.month(),
        onChange: _this.handleMonthChange
      }, choices.toJS()));
    });
    _defineProperty(_this, "renderHeader", function () {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _this.cx({
          element: 'MonthHeader'
        })
      }, _this.renderHeaderMonth(), " ", _this.renderHeaderYear());
    });
    return _this;
  }
  _inherits(CalendarMonth, _BemMixin);
  return _createClass(CalendarMonth, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare["default"])(this, nextProps, nextState);
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      var locale = this.props.locale;
      this.setLocale(locale);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var locale = nextProps.locale;
      if (locale !== this.props.locale) {
        this.setLocale(locale);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
        firstOfWeek = _this$props3.firstOfWeek,
        firstOfMonth = _this$props3.firstOfMonth;
      var cal = new _calendar["default"].Calendar(firstOfWeek);
      var monthDates = _immutable["default"].fromJS(cal.monthDates(firstOfMonth.year(), firstOfMonth.month()));
      var weeks = monthDates.map(this.renderWeek);
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: this.cx({
          element: 'Month'
        })
      }, this.renderHeader(), /*#__PURE__*/_react["default"].createElement("table", {
        className: this.cx({
          element: 'MonthDates'
        })
      }, /*#__PURE__*/_react["default"].createElement("thead", null, this.renderDayHeaders()), /*#__PURE__*/_react["default"].createElement("tbody", null, weeks.toJS())));
    }
  }]);
}(_BemMixin2["default"]);
_defineProperty(CalendarMonth, "displayName", 'CalendarMonth');
_defineProperty(CalendarMonth, "propTypes", {
  dateComponent: _propTypes["default"].func,
  disableNavigation: _propTypes["default"].bool,
  enabledRange: _CustomPropTypes["default"].momentRange,
  firstOfMonth: _CustomPropTypes["default"].moment,
  firstOfWeek: _propTypes["default"].oneOf([0, 1, 2, 3, 4, 5, 6]),
  hideSelection: _propTypes["default"].bool,
  highlightedDate: _propTypes["default"].object,
  highlightedRange: _propTypes["default"].object,
  onMonthChange: _propTypes["default"].func,
  onYearChange: _propTypes["default"].func,
  value: _CustomPropTypes["default"].momentOrMomentRange,
  locale: _propTypes["default"].string
});
var _default = exports["default"] = CalendarMonth;