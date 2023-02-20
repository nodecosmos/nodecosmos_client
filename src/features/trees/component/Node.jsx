import React from 'react';
import * as PropTypes from 'prop-types';
import NestedNodesBranch from './NestedNodesBranch';
import NodeContainer from './NodeContainer';
import NodeBranch from './NodeBranch';

function Node(props) {
  const { treeNodeId } = props;

  return (
    <g>
      <NestedNodesBranch treeNodeId={treeNodeId} />
      <NodeBranch treeNodeId={treeNodeId} />
      <NodeContainer treeNodeId={treeNodeId} />
    </g>
  );
}

Node.propTypes = {
  treeNodeId: PropTypes.string.isRequired,
};

export default React.memo(Node);
