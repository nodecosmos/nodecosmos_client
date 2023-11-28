import Node from './Node';
import DraggableNodePoints from './reorder/DraggableNodePoints';
import useTreeNodeVirtualizer, { VirtualizedNode } from '../../hooks/tree/useTreeNodesVirtualizer';
import React from 'react';

export interface TreeNodesProps {
    branchId: string;
}

export default function TreeNodes(props: TreeNodesProps) {
    const { branchId } = props;

    const treeNodeIds: VirtualizedNode[] = useTreeNodeVirtualizer(branchId);

    if (treeNodeIds.length === 0) return null;

    return (
        <g>
            <g>
                {treeNodeIds.map(([id, alreadyMounted]) => (
                    <Node
                        key={id}
                        branchId={branchId}
                        id={id}
                        alreadyMounted={alreadyMounted}
                    />
                ))}
            </g>
            <DraggableNodePoints />
        </g>
    );
}
