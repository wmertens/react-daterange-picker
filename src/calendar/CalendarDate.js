import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import BemMixin from '../utils/BemMixin';
import CustomPropTypes from '../utils/CustomPropTypes';
import lightenDarkenColor from '../utils/lightenDarkenColor';

import CalendarDatePeriod from './CalendarDatePeriod';
import CalendarHighlight from './CalendarHighlight';
import CalendarSelection from './CalendarSelection';

class CalendarDate extends BemMixin {
  static displayName = 'CalendarDate';

  static propTypes = {
    date: CustomPropTypes.moment,
    styleDate: PropTypes.object,

    firstOfMonth: PropTypes.object.isRequired,

    isSelectedDate: PropTypes.bool,
    isSelectedRangeStart: PropTypes.bool,
    isSelectedRangeEnd: PropTypes.bool,
    isInSelectedRange: PropTypes.bool,

    isHighlightedDate: PropTypes.bool,
    isHighlightedRangeStart: PropTypes.bool,
    isHighlightedRangeEnd: PropTypes.bool,
    isInHighlightedRange: PropTypes.bool,

    highlightedDate: PropTypes.object,
    dateStates: PropTypes.instanceOf(Immutable.List),
    isDisabled: PropTypes.bool,
    isToday: PropTypes.bool,

    dateRangesForDate: PropTypes.func,
    onHighlightDate: PropTypes.func,
    onUnHighlightDate: PropTypes.func,
    onSelectDate: PropTypes.func,
  };

  state = {
    mouseDown: false,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentWillUnmount() {
    this.isUnmounted = true;
    document.removeEventListener('mouseup', this.mouseUp);
    document.removeEventListener('touchend', this.touchEnd);
  }

  mouseUp = () => {
    this.props.onSelectDate(this.props.date);

    if (this.isUnmounted) {
      return;
    }

    if (this.state.mouseDown) {
      this.setState({
        mouseDown: false,
      });
    }

    document.removeEventListener('mouseup', this.mouseUp);
  };

  mouseDown = () => {
    this.setState({
      mouseDown: true,
    });

    document.addEventListener('mouseup', this.mouseUp);
  };

  touchEnd = (event) => {
    event.preventDefault();
    this.props.onHighlightDate(this.props.date);
    this.props.onSelectDate(this.props.date);

    if (this.isUnmounted) {
      return;
    }

    if (this.state.mouseDown) {
      this.setState({
        mouseDown: false,
      });
    }
    document.removeEventListener('touchend', this.touchEnd);
  };

  touchStart = (event) => {
    event.preventDefault();
    this.setState({
      mouseDown: true,
    });
    document.addEventListener('touchend', this.touchEnd);
  };

  mouseEnter = () => {
    this.props.onHighlightDate(this.props.date);
  };

  mouseLeave = () => {
    if (this.state.mouseDown) {
      this.props.onSelectDate(this.props.date);

      this.setState({
        mouseDown: false,
      });
    }
    this.props.onUnHighlightDate(this.props.date);
  };

  getBemModifiers = () => {
    let {date, firstOfMonth, isToday: today} = this.props;

    let otherMonth = false;
    let weekend = false;

    if (date.month() !== firstOfMonth.month()) {
      otherMonth = true;
    }

    if (date.day() === 0 || date.day() === 6) {
      weekend = true;
    }

    return {
      today,
      weekend,
      otherMonth,
    };
  };

  getBemStates = () => {
    let {
      isSelectedDate,
      isInSelectedRange,
      isInHighlightedRange,
      isHighlightedDate: highlighted,
      isDisabled: disabled,
    } = this.props;

    let selected = isSelectedDate || isInSelectedRange || isInHighlightedRange;

    return {
      disabled,
      highlighted,
      selected,
    };
  };

  render() {
    let {
      date,
      dateRangesForDate,
      isSelectedDate,
      isSelectedRangeStart,
      isSelectedRangeEnd,
      isInSelectedRange,
      isHighlightedDate,
      isHighlightedRangeStart,
      isHighlightedRangeEnd,
      isInHighlightedRange,
      styleDate,
    } = this.props;

    let bemModifiers = this.getBemModifiers();
    let bemStates = this.getBemStates();
    let pending = isInHighlightedRange;
    let color;
    let amColor;
    let pmColor;
    let states = dateRangesForDate(date);
    let numStates = states.count();
    let cellStyle = {};
    let style = {};
    let highlightStyle = {};

    let highlightModifier;
    let selectionModifier;

    if (
      isSelectedDate ||
      (isSelectedRangeStart && isSelectedRangeEnd) ||
      (isHighlightedRangeStart && isHighlightedRangeEnd)
    ) {
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
          borderLeftColor: lightenDarkenColor(color, -10),
          borderRightColor: lightenDarkenColor(color, -10),
          backgroundColor: color,
        };
        if (styleDate && styleDate.day === date.day()) {
          style.backgroundColor = styleDate.color;
        }
      }
    } else {
      amColor = states.getIn([0, 'color']);
      pmColor = states.getIn([1, 'color']);

      if (amColor) {
        cellStyle.borderLeftColor = lightenDarkenColor(amColor, -10);
      }

      if (pmColor) {
        cellStyle.borderRightColor = lightenDarkenColor(pmColor, -10);
      }

      if (styleDate && styleDate.day === date.day()) {
        style.backgroundColor = styleDate.color;
      }
    }

    const fontColor = states.getIn([0, 'fontColor']);
    const hoverFontColor = states.getIn([0, 'hoverFontColor']);

    if (fontColor) {
      cellStyle.color = states.getIn([0, 'fontColor']);
    }

    if (highlightModifier && hoverFontColor) {
      cellStyle.color = states.getIn([0, 'hoverFontColor']);
    }

    return (
      <td
        className={this.cx({
          element: 'Date',
          modifiers: bemModifiers,
          states: bemStates,
        })}
        style={cellStyle}
        onTouchStart={this.touchStart}
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
        onMouseDown={this.mouseDown}
      >
        {numStates > 1 && (
          <div
            className={this.cx({
              element: 'HalfDateStates',
            })}
          >
            <CalendarDatePeriod
              period="am"
              color={amColor}
              innerColor={style.backgroundColor}
            />
            <CalendarDatePeriod
              period="pm"
              color={pmColor}
              innerColor={style.backgroundColor}
            />
          </div>
        )}
        {numStates === 1 && (
          <div
            className={this.cx({
              element: 'FullDateStates',
            })}
            style={style}
          />
        )}
        <span
          className={this.cx({
            element: 'DateLabel',
          })}
        >
          {date.format('D')}
        </span>
        {selectionModifier ? (
          <CalendarSelection modifier={selectionModifier} pending={pending} />
        ) : null}
        {highlightModifier ? (
          <CalendarHighlight modifier={highlightModifier} />
        ) : null}
      </td>
    );
  }
}

export default CalendarDate;
