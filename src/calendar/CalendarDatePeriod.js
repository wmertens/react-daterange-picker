import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import PropTypes from 'prop-types';

import BemMixin from '../utils/BemMixin';

class CalendarDatePeriod extends BemMixin {
  static displayName = 'CalendarDatePeriod';

  static propTypes = {
    color: PropTypes.string,
    period: PropTypes.string,
    innerStyle: PropTypes.object,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    let {color, period, innerColor} = this.props;
    let modifiers = {[period]: true};
    let style;
    let innerStyle;

    if (color) {
      style = {backgroundColor: color};
    }

    if (innerColor) {
      innerStyle = {
        backgroundColor: innerColor,
        width: '100%',
        height: '100%',
      };
    }

    return (
      <div style={style} className={this.cx({modifiers})}>
        <div style={innerStyle} />
      </div>
    );
  }
}

export default CalendarDatePeriod;
