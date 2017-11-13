import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import PropTypes from 'prop-types';

import BemMixin from './utils/BemMixin';

class PaginationArrow extends BemMixin {
  static displayName = 'PaginationArrow';

  static propTypes = {
    disabled: PropTypes.bool,
    onTrigger: PropTypes.func,
    direction: PropTypes.oneOf(['next', 'previous']),
  };

  static defaultProps = {
    disabled: false,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    let {disabled, direction, onTrigger, ...props} = this.props;
    let modifiers = {[direction]: true};
    let states = {disabled};

    let elementOpts = {
      modifiers,
      states,
    };

    let iconOpts = {
      element: 'PaginationArrowIcon',
      modifiers,
      states,
    };

    return (
      <div className={this.cx(elementOpts)} {...props} onClick={onTrigger}>
        <div className={this.cx(iconOpts)} />
      </div>
    );
  }
}

export default PaginationArrow;
