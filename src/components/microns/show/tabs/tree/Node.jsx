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

  componentDidMount() {
    // calculate initial position based on upper sibling or parent
    this.props.dispatch({ type: UPDATE_MICRON, payload: { ...this.props.micron, ...this.calculatePosition() } });

    // increment parent chain y size
    this.props.dispatch({
      type: INCREMENT_MICRONS_Y_ENDS,
      payload: { ids: this.props.parentChainIDs, increment: this.edgeLength + this.marginTop },
    });
  }

  componentDidUpdate(prevProps, _prevState, _snapshot) {
    if (this.props.micron.y !== this.calculateY()) {
      this.props.dispatch({
        type: UPDATE_MICRON,
        payload: {
          ...this.props.micron,
          ...this.calculatePosition(),
        },
      });
    }
  }

  componentWillUnmount() {
    // TODO: see if we can keep it expanded
    this.props.dispatch({ type: UPDATE_MICRON, payload: { ...this.props.micron, expanded: false } });

    this.props.dispatch({
      type: INCREMENT_MICRONS_Y_ENDS,
      payload: { ids: this.props.parentChainIDs, increment: -(this.edgeLength + this.marginTop) },
    });
  }

  calculatePosition = () => ({
    x: this.calculateX(),
    xEnds: this.calculateXEnds(),
    y: this.calculateY(),
    yEnds: this.calculateY(),
  })

  calculateX = () => this.props.parent.x + this.marginLeft + this.edgeLength;

  calculateXEnds = () => this.calculateX() + this.edgeLength;

  calculateY = () => (this.props.upperSibling.yEnds || this.props.parent.y) + this.marginTop + this.edgeLength;

  handleMicronClick = () => this.props.dispatch({
    type: UPDATE_MICRON,
    payload: { ...this.props.micron, expanded: !this.props.micron.expanded },
  });

  render() {
    return (
      <g>
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
            <Button onClick={this.handleMicronClick}>
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
