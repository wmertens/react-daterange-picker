"use strict";

var _react = _interopRequireDefault(require("react"));
var _reactAddonsTestUtils = _interopRequireDefault(require("react-addons-test-utils"));
var _CalendarHighlight = _interopRequireDefault(require("../CalendarHighlight"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
describe('The CalendarHighlight Component', function () {
  beforeEach(function () {
    var shallowRenderer = _reactAddonsTestUtils["default"].createRenderer();
    shallowRenderer.render(/*#__PURE__*/_react["default"].createElement(_CalendarHighlight["default"], {
      pending: true,
      modifier: "test",
      bemBlock: "DateRangePicker"
    }));
    this.renderedComponent = shallowRenderer.getRenderOutput();
  });
  it('should render the right element', function () {
    expect(this.renderedComponent.type).toBe('div');
    expect(this.renderedComponent.props.className).toEqual('DateRangePicker__CalendarHighlight DateRangePicker__CalendarHighlight--test');
  });
});