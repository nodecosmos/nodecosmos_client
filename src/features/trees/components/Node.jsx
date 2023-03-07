import React from 'react';
import * as PropTypes from 'prop-types';
import NestedNodesBranch from './NestedNodesBranch';
import NodeButtonContainer from './NodeButtonContainer';
import NodeBranch from './NodeBranch';

function Node(props) {
  const { treeNodeId, alreadyMounted } = props;

  return (
    <g>
      <NestedNodesBranch treeNodeId={treeNodeId} />
      <NodeBranch treeNodeId={treeNodeId} alreadyMounted={alreadyMounted} />
      <NodeButtonContainer treeNodeId={treeNodeId} alreadyMounted={alreadyMounted} />
    </g>
  );
}

Node.propTypes = {
  treeNodeId: PropTypes.string.isRequired,
  alreadyMounted: PropTypes.bool.isRequired,
};

export default React.memo(Node);
