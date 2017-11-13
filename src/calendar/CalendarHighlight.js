import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import PropTypes from 'prop-types';

import BemMixin from '../utils/BemMixin';

class CalendarHighlight extends BemMixin {
  static displayName = 'CalendarHighlight';

  static propTypes = {
    modifier: PropTypes.string,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    let {modifier} = this.props;
    let modifiers = {[modifier]: true};
    let states = {};

    return (
      <div className={this.cx({states, modifiers})} />
    );
  }
}

export default CalendarHighlight;
