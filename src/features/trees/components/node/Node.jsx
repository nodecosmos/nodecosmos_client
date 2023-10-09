import React from 'react';
import * as PropTypes from 'prop-types';
import { useNodeContextCreator } from '../../hooks/node/useNodeContext';
import NestedNodesBranch from './NestedNodesBranch';

import NodeContent from './NodeContent';
import NodeBranch from './NodeBranch';

export default function Node({ treeNodeId, isAlreadyMounted }) {
  const { NodeContext, contextProviderValue } = useNodeContextCreator({ treeNodeId, isAlreadyMounted });

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
  isAlreadyMounted: PropTypes.bool.isRequired,
};
