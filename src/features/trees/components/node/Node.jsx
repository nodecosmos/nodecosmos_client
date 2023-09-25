import React from 'react';
import * as PropTypes from 'prop-types';
import NestedNodesBranch from '../NestedNodesBranch';
import NodeContent from './NodeContent';
import NodeBranch from './NodeBranch';

function Node(props) {
  const { treeNodeId, alreadyMounted } = props;

  return (
    <g>
      <NestedNodesBranch treeNodeId={treeNodeId} />
      <NodeBranch treeNodeId={treeNodeId} alreadyMounted={alreadyMounted} />
      <NodeContent treeNodeId={treeNodeId} alreadyMounted={alreadyMounted} />
    </g>
  );
}

Node.propTypes = {
  treeNodeId: PropTypes.string.isRequired,
  alreadyMounted: PropTypes.bool.isRequired,
};

export default React.memo(Node);
