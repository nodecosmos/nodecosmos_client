import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';

/* mui */
import { Box } from '@mui/material';
import MicronTreeNode from './Node';

class Tree extends React.Component {
  nestedMicrons = (micron) => micron.micron_ids.map((micronIdObject) => this.props.microns[micronIdObject.$oid])

  renderNestedMicrons = (micron, nestedLevel = 2, parentChainIDs = []) => {
    const nestedMicrons = this.nestedMicrons(micron);
    const parentIDs = [...parentChainIDs, micron.id];

    return nestedMicrons.map((nestedMicron, index) => (
      <MicronTreeNode
        key={nestedMicron.id}
        id={nestedMicron.id}
        parentChainIDs={parentIDs}
        parentID={micron.id}
        upperSiblingID={nestedMicrons[index - 1] && nestedMicrons[index - 1].id}
      >
        {this.renderNestedMicrons(nestedMicron, nestedLevel + 1, [...parentChainIDs, nestedMicron.id])}
      </MicronTreeNode>
    ));
  }

  render() {
    const { micron } = this.props;

    return (
      <Box className="Tree" sx={{ p: 4, width: 1, height: 1 }}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <g className="DropShadow">
            <MicronTreeNode id={micron.id} nestedLevel={1} orderNumber={1} parentChainIDs={[]}>
              {this.renderNestedMicrons(micron)}
            </MicronTreeNode>
          </g>
        </svg>
      </Box>
    );
  }
}

Tree.propTypes = {
  micron: PropTypes.object.isRequired,
  microns: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { microns } = state;
  return { microns };
}

export default connect(mapStateToProps)(Tree);
