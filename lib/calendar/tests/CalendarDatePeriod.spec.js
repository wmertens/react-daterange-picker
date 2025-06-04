"use strict";

var _react = _interopRequireDefault(require("react"));
var _reactAddonsTestUtils = _interopRequireDefault(require("react-addons-test-utils"));
var _CalendarDatePeriod = _interopRequireDefault(require("../CalendarDatePeriod"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
describe('The CalendarDatePeriod Component', function () {
  beforeEach(function () {
    var shallowRenderer = _reactAddonsTestUtils["default"].createRenderer();
    shallowRenderer.render(/*#__PURE__*/_react["default"].createElement(_CalendarDatePeriod["default"], {
      period: "month",
      color: "pink",
      bemBlock: "DateRangePicker"
    }));
    this.renderedComponent = shallowRenderer.getRenderOutput();
  });
  it('should render the right element', function () {
    expect(this.renderedComponent.type).toBe('div');
    expect(this.renderedComponent.props.className).toEqual('DateRangePicker__CalendarDatePeriod DateRangePicker__CalendarDatePeriod--month');
    expect(this.renderedComponent.props.style).toEqual({
      backgroundColor: 'pink'
    });
  });
});