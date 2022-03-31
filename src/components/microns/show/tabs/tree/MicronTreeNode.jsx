import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Box,
  Button,
} from '@mui/material';

import { UPDATE_MICRON } from '../../../../../actions/types';

class MicronTreeNode extends React.Component {
  marginLeft = 20;

  micronButtonHeight = 28.5;

  marginTop = this.micronButtonHeight / 2;

  edgeLength = 40;

  constructor(props) {
    super(props);

    this.state = {
      expanded: this.props.micron.expanded,
    };
  }

  get x() {
    return this.props.nestedLevel * (this.marginLeft + this.edgeLength);
  }

  get xEndPoint() {
    return this.x + this.edgeLength;
  }

  get y() {
    return this.props.nestedLevel * (this.edgeLength + this.marginTop)
      + this.props.orderNumber * this.edgeLength
      + this.upperSiblingsYLength;
  }

  get yEndPoint() {
    return this.nestedMicronsY + this.yEdgeLength;
  }

  get nestedMicronsX() {
    return this.xEndPoint + this.marginLeft;
  }

  get nestedMicronsY() {
    return this.y + this.marginTop;
  }

  get yEdgeLength() {
    return this.nestedMicrons.length * this.edgeLength + (this.props.micron.nestedMicronsYEdgeLength || 0);
  }

  get nestedMicrons() {
    if (!this.props.micron.micron_ids) return [];

    return this.props.micron.micron_ids.map((micronIdObject) => this.props.microns[micronIdObject.$oid]);
  }

  get parent() {
    return this.props.parentsChain[this.props.parentsChain.length - 1];
  }

  // TODO:
  get upperSiblingsYLength() {
    return 0;
  }

  handleMicronClick = async () => {
    await this.setState((prevState) => ({ expanded: !prevState.expanded }));

    const { expanded } = this.state;

    this.props.dispatch({
      type: UPDATE_MICRON,
      payload: { ...this.props.micron, expanded },
      expandedLength: this.yEdgeLength,
    });

    this.props.parentsChain.forEach((micron) => {
      let newYEdgeLengthSum = micron.nestedMicronsYEdgeLength || 0;
      newYEdgeLengthSum += (expanded ? this.yEdgeLength : -this.yEdgeLength);

      this.props.dispatch({
        type: UPDATE_MICRON,
        payload: { ...micron, nestedMicronsYEdgeLength: Math.max(newYEdgeLengthSum, 0) },
      });
    });
  }

  renderNestedMicronYPath = () => (
    <path
      className="Path"
      strokeWidth={3}
      d={`M ${this.nestedMicronsX} ${this.nestedMicronsY}  L ${this.nestedMicronsX} ${this.yEndPoint} `}
      stroke="#43464e"
      fill="transparent"
    />
  )

  // recursively render self for nested microns
  // TODO: fix sibling Y
  renderNestedMicrons = () => {
    if (!this.nestedMicrons || !this.state.expanded) return null;

    const parentsChain = [...this.props.parentsChain, this.props.micron];
    const upperSiblings = [];

    return (
      <g>
        {this.renderNestedMicronYPath()}
        {
          this.nestedMicrons.map((micron, index) => {
            const upperSibling = this.nestedMicrons[index - 1];

            if (upperSibling) upperSiblings.push(upperSibling);

            return (
              <MicronTreeNode
                key={micron.id}
                micron={this.props.microns[micron.id]}
                microns={this.props.microns}
                parentsChain={parentsChain}
                upperSiblings={upperSiblings}
                dispatch={(params) => this.props.dispatch(params)}
                orderNumber={index}
                nestedLevel={this.props.nestedLevel + 1}
              />
            );
          })
        }
      </g>
    );
  }

  render() {
    return (
      <g>
        <circle cx={this.x} cy={this.y} r="5" fill="#43464e" />
        <path
          className="Path"
          strokeWidth={3}
          d={`M ${this.x} ${this.y} L ${this.xEndPoint} ${this.y}`}
          stroke="#43464e"
          fill="transparent"
        />
        <foreignObject
          className="MicronName"
          width="500"
          height={this.micronButtonHeight}
          x={this.xEndPoint}
          y={this.y - this.marginTop}
        >
          <Box alignItems="center" display="flex" width="100%">
            <Button onClick={this.handleMicronClick}>
              <Box fontWeight="bold">{this.props.micron.title}</Box>
            </Button>
          </Box>
        </foreignObject>
        {this.renderNestedMicrons()}
      </g>
    );
  }
}

MicronTreeNode.defaultProps = {
  orderNumber: 0,
  upperSiblings: [],
  parentsChain: [],
};

MicronTreeNode.propTypes = {
  dispatch: PropTypes.func.isRequired,
  micron: PropTypes.object.isRequired,
  microns: PropTypes.object.isRequired,
  orderNumber: PropTypes.number,
  nestedLevel: PropTypes.number.isRequired,
  upperSiblings: PropTypes.array,
  parentsChain: PropTypes.array,
};

function mapStateToProps(state) {
  const { microns } = state;
  return { microns };
}

export default connect(mapStateToProps)(MicronTreeNode);
