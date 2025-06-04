"use strict";

var _react = _interopRequireDefault(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
var _reactAddonsTestUtils = _interopRequireDefault(require("react-addons-test-utils"));
var _Legend = _interopRequireDefault(require("../Legend"));
var _lodash = _interopRequireDefault(require("lodash"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
describe('The Legend component', function () {
  beforeEach(function () {
    var _this = this;
    var getLegend = function getLegend(props) {
      props = _lodash["default"].extend({
        selectedLabel: 'test',
        stateDefinitions: {},
        bemBlock: 'DateRangePicker'
      }, props);
      return /*#__PURE__*/_react["default"].createElement(_Legend["default"], props);
    };
    this.useShallowRenderer = function (props) {
      _this.shallowRenderer = _reactAddonsTestUtils["default"].createRenderer();
      _this.shallowRenderer.render(getLegend(props));
      _this.renderedComponent = _this.shallowRenderer.getRenderOutput();
    };
    this.useDocumentRenderer = function (props) {
      var domComponent = _reactAddonsTestUtils["default"].renderIntoDocument(/*#__PURE__*/_react["default"].createElement("div", null, getLegend(props)));
      _this.renderedComponent = domComponent.childNodes[0];
    };
  });
  afterEach(function () {
    if (this.component) {
      _reactDom["default"].unmountComponentAtNode(_reactDom["default"].findDOMNode(this.component).parentNode);
    }
  });
  it('creates a ul dom element as its root', function () {
    this.useShallowRenderer();
    expect(this.renderedComponent.type).toBe('ul');
    expect(this.renderedComponent.props.className).toBe('DateRangePicker__Legend');
  });
  it('creates at least one li, selected by default, using the props.selectedLabel', function () {
    this.useShallowRenderer();
    expect(this.renderedComponent.props.children.length).toBeGreaterThan(1);
    expect(this.renderedComponent.props.children[0]).toEqual(/*#__PURE__*/_react["default"].createElement("li", {
      className: "DateRangePicker__LegendItem"
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: "DateRangePicker__LegendItemColor DateRangePicker__LegendItemColor--selection"
    }), /*#__PURE__*/_react["default"].createElement("span", {
      className: "DateRangePicker__LegendItemLabel"
    }, "test")));
  });
  it('creates extra lis based on the props.stateDefinitions', function () {
    this.useDocumentRenderer({
      stateDefinitions: {
        a: {
          label: 'abc',
          color: 'blue'
        },
        b: {
          label: 'def',
          color: 'red'
        }
      }
    });
    expect(this.renderedComponent.childNodes.length).toBe(3);
    var spans = this.renderedComponent.childNodes[1].querySelectorAll('span');
    expect(spans.length).toBe(2);
    expect(spans[0].style.backgroundColor).toBe('blue');
    expect(spans[1].textContent).toBe('abc');
  });
});