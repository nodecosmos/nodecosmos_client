import Node from './Node';
import DropNodeAreas from './reorder/DropNodeAreas';
import useTreeNodeVirtualizer, { VirtualizedNode } from '../../hooks/tree/useTreeNodesVirtualizer';
import React from 'react';

export interface TreeNodesProps {
    treeBranchId: string;
}

export default function TreeNodes(props: TreeNodesProps) {
    const { treeBranchId } = props;

    const treeNodeIds: VirtualizedNode[] = useTreeNodeVirtualizer(treeBranchId);

    if (treeNodeIds.length === 0) return null;

    return (
        <g>
            <g>
                {treeNodeIds.map(([id, alreadyMounted]) => (
                    <Node
                        key={id}
                        treeBranchId={treeBranchId}
                        id={id}
                        alreadyMounted={alreadyMounted}
                    />
                ))}
            </g>
            <DropNodeAreas />
        </g>
    );
}
