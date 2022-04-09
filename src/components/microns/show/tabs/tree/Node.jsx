import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Box,
  Button,
} from '@mui/material';

import { UPDATE_MICRON, INCREMENT_MICRONS_Y_ENDS } from '../../../../../actions/types';

class Node extends React.Component {
  marginLeft = 20

  micronButtonHeight = 28.5

  marginTop = this.micronButtonHeight / 2

  edgeLength = 40

  upperSiblingIsPresent = !!this.props.upperSibling.id;

  //--------------------------------------------------------------------------------------------------------------------
  componentDidMount() {
    this.setInitialPosition();
    this.incrementParentsYEnds();
  }

  // listen for changes for parent & upperSibling
  componentDidUpdate(prevProps, _prevState, _snapshot) {
    this.handleParentChange(prevProps);
    this.handleUpperSiblingChange(prevProps);
  }

  componentWillUnmount() {
    this.hideMicron();
    this.decrementParentsYSize();
  }

  //--------------------------------------------------------------------------------------------------------------------
  setInitialPosition() {
    const initialPosition = this.calculatePosition();

    this.props.dispatch({
      type: UPDATE_MICRON,
      payload: {
        ...this.props.micron,
        ...initialPosition,
      },
    });
  }

  incrementParentsYEnds() {
    const change = this.edgeLength + this.marginTop;

    this.props.dispatch({
      type: INCREMENT_MICRONS_Y_ENDS,
      payload: { ids: this.props.parentChainIDs, increment: change },
    });
  }

  decrementParentsYSize() {
    const change = -(this.edgeLength + this.marginTop);

    this.props.dispatch({
      type: INCREMENT_MICRONS_Y_ENDS,
      payload: { ids: this.props.parentChainIDs, increment: change },
    });
  }

  hideMicron() {
    this.props.dispatch({ type: UPDATE_MICRON, payload: { ...this.props.micron, expanded: false } });
  }

  //--------------------------------------------------------------------------------------------------------------------
  handleUpperSiblingChange(prevProps) {
    if (this.props.upperSibling.yEnds === prevProps.upperSibling.yEnds) return;

    const change = this.props.upperSibling.yEnds - prevProps.upperSibling.yEnds;
    const yEnds = this.props.micron.yEnds + change;

    this.handleCoordinatesChange(yEnds);
  }

  handleParentChange(prevProps) {
    // we don't care about parent change if we have upperSibling as it will handle change
    if (this.upperSiblingIsPresent || this.props.parent.y === prevProps.parent.y) return;

    const change = this.props.parent.y - prevProps.parent.y;
    const yEnds = this.props.micron.yEnds + change;

    this.handleCoordinatesChange(yEnds);
  }

  handleCoordinatesChange(yEnds) {
    this.props.dispatch({
      type: UPDATE_MICRON,
      payload: {
        ...this.props.micron,
        x: this.calculateX(),
        y: this.calculateY(),
        yEnds,
      },
    });
  }

  //--------------------------------------------------------------------------------------------------------------------
  calculatePosition() {
    return {
      x: this.calculateX(),
      xEnds: this.calculateXEnds(),
      y: this.calculateY(),
      yEnds: this.calculateY(),
    };
  }

  calculateX() {
    return this.props.parent.x + this.marginLeft + this.edgeLength;
  }

  calculateXEnds() {
    return this.calculateX() + this.edgeLength;
  }

  calculateY() {
    return (this.props.upperSibling.yEnds || this.props.parent.y) + this.marginTop + this.edgeLength;
  }

  //--------------------------------------------------------------------------------------------------------------------
  get upperMicronNodeCoordinates() {
    let x;
    let y;

    if (this.upperSiblingIsPresent) {
      ({ x, y } = this.props.upperSibling);
    } else {
      x = this.props.parent.xEnds + this.marginLeft;
      y = this.props.parent.y
        + this.marginTop;
    }

    return { x, y };
  }

  //--------------------------------------------------------------------------------------------------------------------
  onMicronClick = () => {
    this.props.dispatch({
      type: UPDATE_MICRON,
      payload: { ...this.props.micron, expanded: !this.props.micron.expanded },
    });
  }

  //--------------------------------------------------------------------------------------------------------------------
  render() {
    return (
      <g>
        {!this.props.root && (
        <path
          className="Path"
          strokeWidth={3}
          d={`M ${this.upperMicronNodeCoordinates.x} ${this.upperMicronNodeCoordinates.y}
              L ${this.upperMicronNodeCoordinates.x} ${this.props.micron.y} `}
          stroke="#43464e"
          fill="transparent"
        />
        )}
        <circle cx={this.props.micron.x} cy={this.props.micron.y} r="5" fill="#43464e" />
        <path
          className="Path animated"
          strokeWidth={3}
          d={`M ${this.props.micron.x} ${this.props.micron.y} L ${this.props.micron.xEnds} ${this.props.micron.y}`}
          stroke="#43464e"
          fill="transparent"
        />
        <foreignObject
          className="MicronName"
          width="500"
          height={this.micronButtonHeight}
          x={this.props.micron.xEnds}
          y={this.props.micron.y - this.marginTop}
        >
          <Box alignItems="center" display="flex" width="100%">
            <Button onClick={this.onMicronClick}>
              <Box fontWeight="bold">{this.props.micron.title}</Box>
            </Button>
          </Box>
        </foreignObject>
        {this.props.micron.expanded && this.props.children}
      </g>
    );
  }
}

Node.defaultProps = {
  root: false,
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
  root: PropTypes.bool,
  children: PropTypes.array,
  micron: PropTypes.object.isRequired,
  parent: PropTypes.object,
  upperSibling: PropTypes.object,
  parentChainIDs: PropTypes.array.isRequired,
};

function mapStateToProps(state, ownProps) {
  const micron = state.microns[ownProps.id];
  const parent = state.microns[ownProps.parentID];
  const upperSibling = state.microns[ownProps.upperSiblingID];

  return { micron, parent, upperSibling };
}

export default connect(mapStateToProps)(Node);
