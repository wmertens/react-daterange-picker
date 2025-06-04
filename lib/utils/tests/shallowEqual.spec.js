"use strict";

var _shallowEqual = _interopRequireDefault(require("../shallowEqual"));
var _moment = _interopRequireDefault(require("moment"));
var _momentRange = require("moment-range");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var moment = (0, _momentRange.extendMoment)(_moment["default"]);
describe('shallowEqual', function () {
  it('returns true if provided with the same object', function () {
    var obj = {
      a: 'A'
    };
    expect((0, _shallowEqual["default"])(obj, obj)).toBe(true);
  });
  it('returns false if a key is in objA but not objB', function () {
    var objA = {
      a: 'A'
    };
    var objB = {};
    expect((0, _shallowEqual["default"])(objA, objB)).toBe(false);
  });
  it('returns false if a key is in objB but not objA', function () {
    var objA = {};
    var objB = {
      b: 'B'
    };
    expect((0, _shallowEqual["default"])(objA, objB)).toBe(false);
  });
  it('returns false if a key matches to a moment object with different day values in objA and objB', function () {
    var objA = {
      a: moment()
    };
    var objB = {
      a: moment().add(2, 'days')
    };
    expect((0, _shallowEqual["default"])(objA, objB)).toBe(false);
  });
  it('returns false if a key matches to a different moment range objects within objA and objB', function () {
    var start = new Date(2012, 0, 15);
    var end1 = new Date(2012, 4, 23);
    var end2 = new Date(2012, 4, 24);
    var range1 = moment.range(start, end1);
    var range2 = moment.range(start, end2);
    var objA = {
      a: range1
    };
    var objB = {
      a: range2
    };
    expect((0, _shallowEqual["default"])(objA, objB)).toBe(false);
  });
  it('returns false if a key matches to a non moment or moment range object and the values are different in objA and objB', function () {
    var objA = {
      a: {}
    };
    var objB = {
      a: {}
    };
    expect((0, _shallowEqual["default"])(objA, objB)).toBe(false);
  });
  it('returns true otherwise', function () {
    var start = new Date(2012, 0, 15);
    var end = new Date(2012, 4, 23);
    var range1 = moment.range(start, end);
    var range2 = moment.range(start, end);
    var obj = {};
    var objA = {
      a: moment(),
      b: range1,
      c: obj,
      d: 'a'
    };
    var objB = {
      a: moment(),
      b: range2,
      c: obj,
      d: 'a'
    };
    expect((0, _shallowEqual["default"])(objA, objB)).toBe(true);
  });
});