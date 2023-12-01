import NestedNodesBranch from './NestedNodesBranch';
import NodeBranch from './NodeBranch';
import NodeContent from './NodeContent';
import { UUID } from '../../../../types';
import { useNodeContextCreator } from '../../hooks/tree/useNodeContext';
import { selectNode } from '../../nodes.selectors';
import { TreeNodeKey } from '../../nodes.types';
import React from 'react';
import { useSelector } from 'react-redux';

function Node(props: TreeNodeKey) {
    const { treeBranchId, id } = props;

    const { NodeContext, contextProviderValue } = useNodeContextCreator({
        treeBranchId,
        id,
    });

    const { render } = useSelector(selectNode(treeBranchId, id as UUID));
    if (!render) return null;

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
