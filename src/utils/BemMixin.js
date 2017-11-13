import React from 'react';
import PropTypes from 'prop-types';
import bemCx from './bemCx';

class BemMixin extends React.Component {
  static propTypes = {
    bemNamespace: PropTypes.string,
    bemBlock: PropTypes.string,
  };

  static contextTypes = {
    bemNamespace: PropTypes.string,
    bemBlock: PropTypes.string,
  };

  static childContextTypes = {
    bemNamespace: PropTypes.string,
    bemBlock: PropTypes.string,
  };

  getChildContext() {
    return {
      bemNamespace: this.getBemNamespace(),
      bemBlock: this.getBemBlock(),
    };
  }

  getBemNamespace() {
    if (this.props.bemNamespace) {
      return this.props.bemNamespace;
    }
    if (this.context.bemNamespace) {
      return this.context.bemNamespace;
    }
    return null;
  }

  getBemBlock() {
    if (this.props.bemBlock) {
      return this.props.bemBlock;
    }
    if (this.context.bemBlock) {
      return this.context.bemBlock;
    }
    return null;
  }

  cx(options = {}) {
    let opts = {
      namespace: this.getBemNamespace(),
      element: this.constructor.displayName,
      block: this.getBemBlock(),
    };

    Object.assign(opts, options);
    return bemCx(opts);
  }
}

export default BemMixin;
