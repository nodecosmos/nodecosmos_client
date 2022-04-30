import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';

/* micro lib */
import colors from '../../../../../themes/light';
import { UPDATE_MICRON, INCREMENT_MICRONS_Y_ENDS } from '../../../../../actions/types';
import { MARGIN_LEFT, MARGIN_TOP, EDGE_LENGTH } from './constants';
import NodeButton from './components/NodeButton';
import NodeLink from './components/NodeLink';

class Node extends React.Component {
  isUpperSiblingPresent = !!this.props.upperSibling.id;

  colors = [colors.red2, colors.blue2, colors.green2]

  componentDidMount() {
    this.setInitialPosition();
    this.incrementParentsYEnds();
  }

  componentDidUpdate(prevProps, _prevState, _snapshot) {
    this.handleParentUpdate(prevProps);
    this.handleUpperSiblingUpdate(prevProps);
  }

  componentWillUnmount() {
    this.hideMicron();
    this.decrementParentsYSize();
  }

  /** dispatch */
  setInitialPosition() {
    const initialPosition = this.calculatePosition();

    this.props.dispatch({
      type: UPDATE_MICRON,
      payload: {
        ...this.props.micron,
        ...initialPosition,
        initHide: false,
      },
    });
  }

  incrementParentsYEnds() {
    const increment = EDGE_LENGTH + MARGIN_TOP;

    this.props.dispatch({ type: INCREMENT_MICRONS_Y_ENDS, payload: { ids: this.props.parentChainIDs, increment } });
  }

  decrementParentsYSize() {
    const increment = -(EDGE_LENGTH + MARGIN_TOP);

    this.props.dispatch({ type: INCREMENT_MICRONS_Y_ENDS, payload: { ids: this.props.parentChainIDs, increment } });
  }

  hideMicron() {
    this.props.dispatch({ type: UPDATE_MICRON, payload: { ...this.props.micron, expanded: false } });
  }

  showMicron() {
    this.props.dispatch({ type: UPDATE_MICRON, payload: { ...this.props.micron, expanded: true, initHide: false } });
  }

  initMicronHideAnimation() {
    this.props.dispatch({ type: UPDATE_MICRON, payload: { ...this.props.micron, initHide: true } });
  }

  dispatchCoordinateChange(yEnds) {
    this.props.dispatch({
      type: UPDATE_MICRON,
      payload: {
        ...this.props.micron, x: this.calculateX(), y: this.calculateY(), yEnds,
      },
    });
  }

  handleUpperSiblingUpdate(prevProps) {
    if (this.props.upperSibling.yEnds === prevProps.upperSibling.yEnds) return;

    const change = this.props.upperSibling.yEnds - prevProps.upperSibling.yEnds;
    const yEnds = this.props.micron.yEnds + change;

    this.dispatchCoordinateChange(yEnds);
  }

  handleParentUpdate(prevProps) {
    if (prevProps.parent.initHide !== this.props.parent.initHide) {
      this.initMicronHideAnimation();
    }

    // we don't care about parent change if we have upperSibling as it will handle change
    if (this.isUpperSiblingPresent || this.props.parent.y === prevProps.parent.y) return;

    const change = this.props.parent.y - prevProps.parent.y;
    const yEnds = this.props.micron.yEnds + change;

    this.dispatchCoordinateChange(yEnds);
  }

  /** calculations */
  calculatePosition() {
    return {
      x: this.calculateX(),
      xEnds: this.calculateXEnds(),
      y: this.calculateY(),
      yEnds: this.calculateY(),
    };
  }

  calculateX() {
    return this.props.parent.x + MARGIN_LEFT + EDGE_LENGTH;
  }

  calculateXEnds() {
    return this.calculateX() + EDGE_LENGTH;
  }

  calculateY() {
    return (this.props.upperSibling.yEnds || this.props.parent.y) + MARGIN_TOP + EDGE_LENGTH;
  }

  // eslint-disable-next-line class-methods-use-this
  get color() {
    return this.props.micron.expanded ? this.colors[this.props.nestedLevel % 3] : '#43464e';
  }

  // eslint-disable-next-line class-methods-use-this
  get parentColor() {
    return this.props.parent.expanded ? this.colors[(this.props.nestedLevel - 1) % 3] : '#43464e';
  }

  /** handlers */
  onMicronClick = () => {
    if (this.props.micron.expanded) {
      this.initMicronHideAnimation();
      setTimeout(() => this.hideMicron());
    } else {
      this.showMicron();
    }
  }

  render() {
    return (
      <g>
        <NodeLink
          micron={this.props.micron}
          parent={this.props.parent}
          upperSibling={this.props.upperSibling}
          isLastChild={this.props.isLastChild}
          isRoot={this.props.isRoot}
          color={this.color}
          parentColor={this.parentColor}
        />
        <NodeButton
          micron={this.props.micron}
          parent={this.props.parent}
          onMicronClick={this.onMicronClick}
          isRoot={this.props.isRoot}
          color={this.color}
        />
        {this.props.micron.expanded && this.props.children}
      </g>
    );
  }
}

Node.defaultProps = {
  isRoot: false,
  isLastChild: false,
  children: null,
  upperSibling: {
    x: 0,
    y: 0,
    yEnds: 0,
    xEnds: 0,
  },
  parent: {
    x: 0,
    y: 0,
    yEnds: 0,
    xEnds: 0,
  },
};

Node.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isRoot: PropTypes.bool,
  isLastChild: PropTypes.bool,
  children: PropTypes.array,
  micron: PropTypes.object.isRequired,
  parent: PropTypes.object,
  upperSibling: PropTypes.object,
  parentChainIDs: PropTypes.array.isRequired,
  nestedLevel: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

function mapStateToProps(state, ownProps) {
  const micron = state.microns[ownProps.id];
  const parent = state.microns[ownProps.parentID];
  const upperSibling = state.microns[ownProps.upperSiblingID];

  return { micron, parent, upperSibling };
}

export default connect(mapStateToProps)(Node);
