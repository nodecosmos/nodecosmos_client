import Node from './Node';
import DropNodeAreas from './reorder/DropNodeAreas';
import useNodeVirtualizer from '../../hooks/tree/useNodeVirtualizer';
import React from 'react';

export interface TreeNodesProps {
    treeBranchId: string;
}

export default function TreeNodes(props: TreeNodesProps) {
    const { treeBranchId } = props;

    const visibleNodes = useNodeVirtualizer(treeBranchId);

    if (!visibleNodes || visibleNodes.length === 0) return null;

    return (
        <g>
            <g>
                {visibleNodes.map(([id, alreadyMounted]) => (
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
