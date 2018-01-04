import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import PropTypes from 'prop-types';

import BemMixin from '../utils/BemMixin';

class CalendarSelection extends BemMixin {
  static displayName = 'CalendarSelection';

  static propTypes = {
    modifier: PropTypes.string,
    pending: PropTypes.bool.isRequired,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    let {modifier, pending} = this.props;
    let modifiers = {[modifier]: true};
    let states = {
      pending,
    };

    return <div className={this.cx({states, modifiers})} />;
  }
}

export default CalendarSelection;
