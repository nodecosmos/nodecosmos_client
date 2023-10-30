import NestedNodesBranch from './NestedNodesBranch';
import NodeBranch from './NodeBranch';
import NodeContent from './NodeContent';
import { useNodeContextCreator } from '../../hooks/node/useNodeContext';
import * as PropTypes from 'prop-types';
import React from 'react';

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
