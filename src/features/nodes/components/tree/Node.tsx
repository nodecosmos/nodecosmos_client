import NestedNodesBranch from './NestedNodesBranch';
import NodeBranch from './NodeBranch';
import NodeContent from './NodeContent';
import { useNodeContextCreator } from '../../hooks/tree/useNodeContext';
import { NodePrimaryKey } from '../../nodes.types';
import React from 'react';

export interface NodeProps extends NodePrimaryKey {
    alreadyMounted: boolean;
}

function Node(props: NodeProps) {
    const {
        branchId, id, alreadyMounted,
    } = props;

    const { NodeContext, contextProviderValue } = useNodeContextCreator({
        branchId,
        id,
        alreadyMounted,
    });

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

export default React.memo(Node);
