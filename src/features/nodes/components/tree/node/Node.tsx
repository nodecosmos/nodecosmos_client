import NestedNodesBranch from './NestedNodesBranch';
import NodeBranch from './NodeBranch';
import NodeContent from './NodeContent';
import { useNodeContextCreator } from '../../../hooks/node/useNodeContext';
import React from 'react';

export interface NodeProps {
    branchId: string;
    id: string;
    isAlreadyMounted: boolean;
}

function Node(props: NodeProps) {
    const {
        branchId, id, isAlreadyMounted,
    } = props;

    const { NodeContext, contextProviderValue } = useNodeContextCreator({
        branchId,
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
