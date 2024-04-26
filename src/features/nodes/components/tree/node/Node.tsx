import NestedNodesBranch from './NestedNodesBranch';
import NodeBranch from './NodeBranch';
import NodeContent from './NodeContent';
import { useNodeContextCreator } from '../../../hooks/tree/node/useNodeContext';
import React from 'react';

export interface NodeProps {
    currentBranchId: string;
    id: string;
    isAlreadyMounted: boolean;
}

function Node(props: NodeProps) {
    const {
        currentBranchId, id, isAlreadyMounted,
    } = props;

    const { NodeContext, contextProviderValue } = useNodeContextCreator({
        currentBranchId,
        id,
        isAlreadyMounted,
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
