"use strict";

var _react = _interopRequireDefault(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
var _reactAddonsTestUtils = _interopRequireDefault(require("react-addons-test-utils"));
var _moment = _interopRequireDefault(require("moment"));
var _lodash = _interopRequireDefault(require("lodash"));
var _CalendarDate = _interopRequireDefault(require("../CalendarDate"));
var _CalendarDatePeriod = _interopRequireDefault(require("../CalendarDatePeriod"));
var _CalendarHighlight = _interopRequireDefault(require("../CalendarHighlight"));
var _CalendarSelection = _interopRequireDefault(require("../CalendarSelection"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
describe('The CalendarDate Component', function () {
  var today = function today() {
    return (0, _moment["default"])('2014-01-01T12:00:00Z');
  };
  beforeEach(function () {
    var _this = this;
    var getCalendarDate = function getCalendarDate(props) {
      props = _lodash["default"].extend({
        date: today(),
        firstOfMonth: today(),
        dateRangesForDate: function dateRangesForDate() {
          return {
            count: function count() {
              return props.count || 1;
            },
            getIn: function getIn(immutableListIndex) {
              if (immutableListIndex[0] === 0) {
                return '#333';
              }
              return '#444';
            },
            toJS: function toJS() {
              return [{
                state: 'unavailable',
                range: _moment["default"].range({
                  start: '2014-01-01T12:00:00Z',
                  end: '2014-02-01T12:00:00Z'
                })
              }];
            }
          };
        },
        onSelectDate: _this.selectDateSpy,
        onHighlightDate: _this.highlightDateSpy,
        onUnHighlightDate: _this.unHighlightDateSpy,
        isHighlightedDate: false,
        isSelectedDate: false,
        isSelectedRangeStart: false,
        isSelectedRangeEnd: false,
        isHighlightedRangeStart: false,
        isHighlightedRangeEnd: false,
        isInSelectedRange: false,
        isInHighlightedRange: false,
        isToday: false,
        isDisabled: false,
        bemBlock: 'DateRangePicker'
      }, props);
      return /*#__PURE__*/_react["default"].createElement(_CalendarDate["default"], props);
    };
    this.useShallowRenderer = function (props) {
      _this.shallowRenderer = _reactAddonsTestUtils["default"].createRenderer();
      _this.shallowRenderer.render(getCalendarDate(props));
      _this.renderedComponent = _this.shallowRenderer.getRenderOutput();
    };
    this.useDocumentRenderer = function (props) {
      var renderedTable = _reactAddonsTestUtils["default"].renderIntoDocument(/*#__PURE__*/_react["default"].createElement("table", null, /*#__PURE__*/_react["default"].createElement("tbody", null, /*#__PURE__*/_react["default"].createElement("tr", null, getCalendarDate(props)))));
      _this.renderedComponent = renderedTable.querySelector('td');
    };
    this.selectDateSpy = jasmine.createSpy();
    this.highlightDateSpy = jasmine.createSpy();
    this.unHighlightDateSpy = jasmine.createSpy();
  });
  afterEach(function () {
    if (this.component) {
      _reactDom["default"].unmountComponentAtNode(_reactDom["default"].findDOMNode(this.component).parentNode);
    }
  });
  it('creates the right element', function () {
    this.useShallowRenderer();
    expect(this.renderedComponent.type).toBe('td');
  });
  describe('sets the correct class', function () {
    it('by defining the expected class name', function () {
      this.useShallowRenderer();
      expect(this.renderedComponent.props.className).toEqual('DateRangePicker__Date');
    });
    describe('by setting the expected bem modifiers', function () {
      it('when the provided date is today', function () {
        this.useShallowRenderer({
          isToday: true
        });
        expect(this.renderedComponent.props.className).toEqual('DateRangePicker__Date DateRangePicker__Date--today');
      });
      it('when the provided date is not today', function () {
        this.useShallowRenderer({
          isToday: false
        });
        expect(this.renderedComponent.props.className).toEqual('DateRangePicker__Date');
      });
      it('when the provided date is over the weekend', function () {
        var nextSunday = today().day(7);
        this.useShallowRenderer({
          date: nextSunday
        });
        expect(this.renderedComponent.props.className).toContain('DateRangePicker__Date--weekend');
      });
      it('when the provided date is not over the weekend', function () {
        var nextMonday = today().day(8);
        this.useShallowRenderer({
          date: nextMonday
        });
        expect(this.renderedComponent.props.className).not.toContain('DateRangePicker__Date--weekend');
      });
      it('when the provided date is during the same month', function () {
        var date = today().date(8).month(3),
          firstOfMonth = today().date(1).month(3);
        this.useShallowRenderer({
          date: date,
          firstOfMonth: firstOfMonth
        });
        expect(this.renderedComponent.props.className).toEqual('DateRangePicker__Date');
      });
      it('when the provided date is not during the same month', function () {
        var date = today().date(8).month(3),
          firstOfMonth = today().date(1).month(43);
        this.useShallowRenderer({
          date: date,
          firstOfMonth: firstOfMonth
        });
        expect(this.renderedComponent.props.className).toEqual('DateRangePicker__Date DateRangePicker__Date--otherMonth');
      });
    });
    describe('by setting the expected bem states', function () {
      it('when the isDisabled prop is passed in', function () {
        this.useShallowRenderer({
          isDisabled: true
        });
        expect(this.renderedComponent.props.className).toEqual('DateRangePicker__Date DateRangePicker__Date--is-disabled');
      });
      it('when the isDisabled prop is not passed in', function () {
        this.useShallowRenderer({
          isDisabled: false
        });
        expect(this.renderedComponent.props.className).toEqual('DateRangePicker__Date');
      });
      it('when the isHighlightedDate prop is passed in', function () {
        this.useShallowRenderer({
          isHighlightedDate: true
        });
        expect(this.renderedComponent.props.className).toEqual('DateRangePicker__Date DateRangePicker__Date--is-highlighted');
      });
      it('when the isHighlightedDate prop is not passed in', function () {
        this.useShallowRenderer({
          isHighlightedDate: false
        });
        expect(this.renderedComponent.props.className).toEqual('DateRangePicker__Date');
      });
      it('when the isSelectedDate prop is passed in', function () {
        this.useShallowRenderer({
          isSelectedDate: true
        });
        expect(this.renderedComponent.props.className).toEqual('DateRangePicker__Date DateRangePicker__Date--is-selected');
      });
      it('when the isInSelectedRange prop is passed in', function () {
        this.useShallowRenderer({
          isInSelectedRange: true
        });
        expect(this.renderedComponent.props.className).toEqual('DateRangePicker__Date DateRangePicker__Date--is-selected');
      });
      it('when the isInHighlightedRange prop is passed in', function () {
        this.useShallowRenderer({
          isInHighlightedRange: true
        });
        expect(this.renderedComponent.props.className).toEqual('DateRangePicker__Date DateRangePicker__Date--is-selected');
      });
      it('when the isSelectedDate, isInSelectedRange, isInHighlightedRange props are not passed in', function () {
        this.useShallowRenderer({
          isSelectedDate: false,
          isInSelectedRange: false,
          isInHighlightedRange: false
        });
        expect(this.renderedComponent.props.className).toEqual('DateRangePicker__Date');
      });
    });
  });
  describe('creates the right style', function () {
    it('when numStyles is 1', function () {
      this.useShallowRenderer();
      expect(this.renderedComponent.props.style.borderLeftColor).toEqual('#29');
      expect(this.renderedComponent.props.style.borderRightColor).toEqual('#29');
    });
    it('when numStyles is 2', function () {
      this.useShallowRenderer({
        count: 2
      });
      expect(this.renderedComponent.props.style.borderLeftColor).toEqual('#29');
      expect(this.renderedComponent.props.style.borderRightColor).toEqual('#3a');
    });
  });
  describe('handles touch events', function () {
    beforeEach(function () {
      this.useDocumentRenderer();
      _reactAddonsTestUtils["default"].Simulate.touchStart(this.renderedComponent);
      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent('touchend', false, false, null);
      document.dispatchEvent(evt);
    });
    it('by calling props.onHighlightDate after an interaction', function () {
      expect(this.highlightDateSpy).toHaveBeenCalled();
    });
    it('by calling props.onSelectDate after an interaction', function () {
      expect(this.selectDateSpy).toHaveBeenCalled();
    });
  });
  describe('handles mouse events', function () {
    //MouseEnter and MouseLeave are buggy. Should be fixed in React#0.14
    //Workaround as suggested from https://github.com/facebook/react/issues/1297

    beforeEach(function () {
      this.date = today();
      this.useDocumentRenderer({
        date: this.date
      });
    });
    it('by calling props.onHighlightDate after a mouse enter', function () {
      _reactAddonsTestUtils["default"].SimulateNative.mouseOver(this.renderedComponent);
      expect(this.highlightDateSpy).toHaveBeenCalledWith(this.date);
    });
    it('by calling props.onSelectDate after mouse down + mouse leave', function () {
      _reactAddonsTestUtils["default"].Simulate.mouseDown(this.renderedComponent);
      _reactAddonsTestUtils["default"].SimulateNative.mouseOut(this.renderedComponent);
      expect(this.selectDateSpy).toHaveBeenCalledWith(this.date);
    });
    it('by calling props.onUnHighlightDate after a mouse leave', function () {
      _reactAddonsTestUtils["default"].SimulateNative.mouseOut(this.renderedComponent);
      expect(this.unHighlightDateSpy).toHaveBeenCalledWith(this.date);
    });
    it('by calling props.onSelectDate after mouse down + mouse up', function () {
      _reactAddonsTestUtils["default"].Simulate.mouseDown(this.renderedComponent);
      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent('mouseup', false, false, null);
      document.dispatchEvent(evt);
      expect(this.selectDateSpy).toHaveBeenCalledWith(this.date);
    });
  });
  describe('handles half days', function () {
    it('by creating calendar date period when there is more than one period', function () {
      this.useShallowRenderer({
        count: 2
      });
      expect(this.renderedComponent.props.children[0]).toEqual(/*#__PURE__*/_react["default"].createElement("div", {
        className: "DateRangePicker__HalfDateStates"
      }, /*#__PURE__*/_react["default"].createElement(_CalendarDatePeriod["default"], {
        period: "am",
        color: "#333"
      }), /*#__PURE__*/_react["default"].createElement(_CalendarDatePeriod["default"], {
        period: "pm",
        color: "#444"
      })));
    });
    it('by creating a simple div when there is only one period', function () {
      this.useShallowRenderer();
      var bg = {
        backgroundColor: '#333'
      };
      expect(this.renderedComponent.props.children[1]).toEqual(/*#__PURE__*/_react["default"].createElement("div", {
        className: "DateRangePicker__FullDateStates",
        style: bg
      }));
    });
  });
  describe('has a selection widget', function () {
    it('with a modifier prop of single if props.isSelectedDate is true and others false', function () {
      this.useShallowRenderer({
        isSelectedDate: true
      });
      expect(this.renderedComponent.props.children[3]).toEqual(/*#__PURE__*/_react["default"].createElement(_CalendarSelection["default"], {
        modifier: "single",
        pending: false
      }));
    });
    it('with a modifier prop of single if props.isSelectedRangeStart, props.isSelectedRangeEnd are true and others false', function () {
      this.useShallowRenderer({
        isSelectedRangeStart: true,
        isSelectedRangeEnd: true
      });
      expect(this.renderedComponent.props.children[3]).toEqual(/*#__PURE__*/_react["default"].createElement(_CalendarSelection["default"], {
        modifier: "single",
        pending: false
      }));
    });
    it('with a modifier prop of single if props.isHighlightedRangeStart, props.isHighlightedRangeEnd are true and others false', function () {
      this.useShallowRenderer({
        isHighlightedRangeStart: true,
        isHighlightedRangeEnd: true
      });
      expect(this.renderedComponent.props.children[3]).toEqual(/*#__PURE__*/_react["default"].createElement(_CalendarSelection["default"], {
        modifier: "single",
        pending: false
      }));
    });
    it('with a modifier prop of start if props.isSelectedRangeStart is true and others false', function () {
      this.useShallowRenderer({
        isSelectedRangeStart: true,
        isSelectedRangeEnd: false
      });
      expect(this.renderedComponent.props.children[3]).toEqual(/*#__PURE__*/_react["default"].createElement(_CalendarSelection["default"], {
        modifier: "start",
        pending: false
      }));
    });
    it('with a modifier prop of start if props.isHighlightedRangeStart is true and others false', function () {
      this.useShallowRenderer({
        isHighlightedRangeStart: true,
        isHighlightedRangeEnd: false
      });
      expect(this.renderedComponent.props.children[3]).toEqual(/*#__PURE__*/_react["default"].createElement(_CalendarSelection["default"], {
        modifier: "start",
        pending: false
      }));
    });
    it('with a modifier prop of end if props.isSelectedRangeEnd is true and others false', function () {
      this.useShallowRenderer({
        isSelectedRangeEnd: true,
        isSelectedRangeStart: false
      });
      expect(this.renderedComponent.props.children[3]).toEqual(/*#__PURE__*/_react["default"].createElement(_CalendarSelection["default"], {
        modifier: "end",
        pending: false
      }));
    });
    it('with a modifier prop of end if props.isHighlightedRangeEnd is true and others false', function () {
      this.useShallowRenderer({
        isHighlightedRangeEnd: true,
        isHighlightedRangeStart: false
      });
      expect(this.renderedComponent.props.children[3]).toEqual(/*#__PURE__*/_react["default"].createElement(_CalendarSelection["default"], {
        modifier: "end",
        pending: false
      }));
    });
    it('with a modifier prop of segment if props.isInSelectedRange is true and others false', function () {
      this.useShallowRenderer({
        isInSelectedRange: true
      });
      expect(this.renderedComponent.props.children[3]).toEqual(/*#__PURE__*/_react["default"].createElement(_CalendarSelection["default"], {
        modifier: "segment",
        pending: false
      }));
    });
    it('with a modifier prop of segment if props.isInHighlightedRange is true and others false', function () {
      this.useShallowRenderer({
        isInHighlightedRange: true
      });
      expect(this.renderedComponent.props.children[3]).toEqual(/*#__PURE__*/_react["default"].createElement(_CalendarSelection["default"], {
        modifier: "segment",
        pending: true
      }));
    });
    it('with a pending prop of true if props.isInHighlightedRange is true and any setting showing the CalendarSelection widget', function () {
      this.useShallowRenderer({
        isInHighlightedRange: true,
        isSelectedDate: true
      });
      expect(this.renderedComponent.props.children[3]).toEqual(/*#__PURE__*/_react["default"].createElement(_CalendarSelection["default"], {
        modifier: "single",
        pending: true
      }));
    });
    it('which does not show otherwise', function () {
      this.useShallowRenderer();
      expect(this.renderedComponent.props.children[3]).toEqual(null);
    });
  });
  describe('has a highlight modifier', function () {
    it('which shows when props.isHighlightedDate is true', function () {
      this.useShallowRenderer({
        isHighlightedDate: true
      });
      expect(this.renderedComponent.props.children[4]).toEqual(/*#__PURE__*/_react["default"].createElement(_CalendarHighlight["default"], {
        modifier: "single"
      }));
    });
    it('which does not show otherwise', function () {
      this.useShallowRenderer({
        isHighlightedDate: false
      });
      expect(this.renderedComponent.props.children[4]).toEqual(null);
    });
  });
});