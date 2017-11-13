import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import PropTypes from 'prop-types';

import BemMixin from '../utils/BemMixin';

class CalendarDatePeriod extends BemMixin {
  static displayName = 'CalendarDatePeriod';

  static propTypes = {
    color: PropTypes.string,
    period: PropTypes.string,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    let {color, period} = this.props;
    let modifiers = {[period]: true};
    let style;

    if (color) {
      style = {backgroundColor: color};
    }

    return (
      <div style={style} className={this.cx({modifiers})} />
    );
  }
}

export default CalendarDatePeriod;
