import NestedNodesBranch from './NestedNodesBranch';
import NodeBranch from './NodeBranch';
import NodeContent from './NodeContent';
import { useNodeContextCreator } from '../../hooks/tree/useNodeContext';
import { TreeNodeKey } from '../../nodes.types';
import React from 'react';

export interface NodeProps extends TreeNodeKey {
    alreadyMounted: boolean;
}

function Node(props: NodeProps) {
    const {
        treeBranchId, id, alreadyMounted,
    } = props;

    const { NodeContext, contextProviderValue } = useNodeContextCreator({
        treeBranchId,
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
