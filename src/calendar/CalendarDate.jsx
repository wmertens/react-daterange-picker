import React from 'react';

import Immutable from 'immutable';

import BemMixin from '../utils/BemMixin';
import CustomPropTypes from '../utils/CustomPropTypes';
import PureRenderMixin from '../utils/PureRenderMixin';
import lightenDarkenColor from '../utils/lightenDarkenColor';

import CalendarDatePeriod from './CalendarDatePeriod';
import CalendarHighlight from './CalendarHighlight';
import CalendarSelection from './CalendarSelection';

const CalendarDate = React.createClass({
  mixins: [BemMixin, PureRenderMixin],

  propTypes: {
    date: CustomPropTypes.moment,

    firstOfMonth: React.PropTypes.object.isRequired,

    isSelectedDate: React.PropTypes.bool,
    isSelectedRangeStart: React.PropTypes.bool,
    isSelectedRangeEnd: React.PropTypes.bool,
    isInSelectedRange: React.PropTypes.bool,

    isHighlightedDate: React.PropTypes.bool,
    isHighlightedRangeStart: React.PropTypes.bool,
    isHighlightedRangeEnd: React.PropTypes.bool,
    isInHighlightedRange: React.PropTypes.bool,
    isInHoveredRange: React.PropTypes.bool,

    highlightedDate: React.PropTypes.object,
    dateStates: React.PropTypes.instanceOf(Immutable.List),
    isDisabled: React.PropTypes.bool,
    isToday: React.PropTypes.bool,

    dateRangesForDate: React.PropTypes.func,
    onDateRangeClick: React.PropTypes.func,
    onHighlightDate: React.PropTypes.func,
    onHoverRange: React.PropTypes.func,
    onUnHighlightDate: React.PropTypes.func,
    onUnHoverRange: React.PropTypes.func,
    onSelectDate: React.PropTypes.func,
  },

  getInitialState() {
    return {
      mouseDown: false,
    };
  },

  componentWillUnmount() {
    this.isUnmounted = true;
    document.removeEventListener('mouseup', this.mouseUp);
    document.removeEventListener('touchend', this.touchEnd);
  },

  mouseUp() {
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
  },

  mouseDown() {
    this.setState({
      mouseDown: true,
    });

    document.addEventListener('mouseup', this.mouseUp);
  },

  touchEnd() {
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
  },

  touchStart(event) {
    event.preventDefault();
    this.setState({
      mouseDown: true,
    });
    document.addEventListener('touchend', this.touchEnd);
  },

  mouseEnter({ startDate, endDate, status }) {
    const { date, onHighlightDate, onHoverRange } = this.props;
    if (onHighlightDate) {
      onHighlightDate(date);
    }
    if (status !== 'available') {
      if (onHoverRange) {
        onHoverRange(date, { startDate, endDate });
      }
    }
  },

  mouseLeave(/*{ startDate, endDate }*/) {
    const { onUnHighlightDate, onUnHoverRange, onSelectDate } = this.props;
    if (this.state.mouseDown) {
      if (onSelectDate) {
        onSelectDate(this.props.date);
      }

      this.setState({
        mouseDown: false,
      });
    }
    if (onUnHighlightDate) {
      onUnHighlightDate(this.props.date);
    }
    if (onUnHoverRange) {
      onUnHoverRange();
    }
  },

  getBemModifiers() {
    let { date, firstOfMonth, isToday: today } = this.props;

    let otherMonth = false;
    let weekend = false;

    if (date.month() !== firstOfMonth.month()) {
      otherMonth = true;
    }

    if (date.day() === 0 || date.day() === 6) {
      weekend = true;
    }

    return { today, weekend, otherMonth };
  },

  getBemStates() {
    let {
      isSelectedDate,
      isInSelectedRange,
      isInHighlightedRange,
      isHighlightedDate: highlighted,
      isDisabled: disabled,
    } = this.props;

    let selected = isSelectedDate || isInSelectedRange || isInHighlightedRange;

    return { disabled, highlighted, selected };
  },

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
      isInHoveredRange,
      onDateRangeClick,
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

    let highlightModifier;
    let selectionModifier;
    let statesJS = states.toJS()[0];
    let dateState = {
      status: statesJS.state,
      startDate: statesJS.range.start,
      endDate: statesJS.range.end,
    };

    if (statesJS.range.id) {
      dateState.id = statesJS.range.id;
    }
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
      color = isInHoveredRange
        ? states.getIn([0, 'hover'])
        : states.getIn([0, 'color']);
      if (color) {
        style = {
          backgroundColor: color,
        };
        cellStyle = {
          borderLeftColor: lightenDarkenColor(color, -10),
          borderRightColor: lightenDarkenColor(color, -10),
        };
      }
    } else {
      amColor = isInHoveredRange
        ? states.getIn([0, 'hover'])
        : states.getIn([0, 'color']);
      pmColor = isInHoveredRange
        ? states.getIn([1, 'hover'])
        : states.getIn([1, 'color']);

      if (amColor) {
        cellStyle.borderLeftColor = lightenDarkenColor(amColor, -10);
      }

      if (pmColor) {
        cellStyle.borderRightColor = lightenDarkenColor(pmColor, -10);
      }
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
        onMouseEnter={() => this.mouseEnter(dateState)}
        onMouseLeave={() => this.mouseLeave(dateState)}
        onMouseDown={this.mouseDown}
        onClick={() => {
          if (dateState.status !== 'available' && onDateRangeClick) {
            onDateRangeClick(dateState);
          }
        }}
      >
        {numStates > 1 &&
          <div className={this.cx({ element: 'HalfDateStates' })}>
            <CalendarDatePeriod period="am" color={amColor} />
            <CalendarDatePeriod period="pm" color={pmColor} />
          </div>}
        {numStates === 1 &&
          <div
            className={this.cx({ element: 'FullDateStates' })}
            style={style}
          />}
        <span className={this.cx({ element: 'DateLabel' })}>
          {date.format('D')}
        </span>
        {selectionModifier
          ? <CalendarSelection modifier={selectionModifier} pending={pending} />
          : null}
        {highlightModifier
          ? <CalendarHighlight modifier={highlightModifier} />
          : null}
      </td>
    );
  },
});

export default CalendarDate;
