import React, { memo } from 'react';
import * as PropTypes from 'prop-types';
import { useNodeContextCreator } from '../../hooks/useNodeContext';
import NestedNodesBranch from './NestedNodesBranch';

import NodeContent from './NodeContent';
import NodeBranch from './NodeBranch';

function Node({ treeNodeId, alreadyMounted }) {
  const { NodeContext, contextProviderValue } = useNodeContextCreator({ treeNodeId, alreadyMounted });

  return (
    <NodeContext.Provider value={contextProviderValue}>
      <g>
        <NestedNodesBranch />
        <NodeBranch />
        <NodeContent />
      </g>
    </NodeContext.Provider>
  );
}

Node.propTypes = {
  treeNodeId: PropTypes.string.isRequired,
  alreadyMounted: PropTypes.bool.isRequired,
};

export default memo(Node);
