import Node from './Node';
import DropNodeAreas from './reorder/DropNodeAreas';
import useNodeVirtualizer from '../../hooks/tree/useNodeVirtualizer';
import useTreeContext from '../../hooks/useTreeContext';
import React from 'react';

export default function TreeNodes() {
    const { treeBranchId } = useTreeContext();

    const visibleNodes = useNodeVirtualizer();

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
