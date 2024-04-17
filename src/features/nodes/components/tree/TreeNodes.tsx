import Node from './node/Node';
import DropNodeAreas from './reorder/DropNodeAreas';
import useTreeContext from '../../hooks/tree/useTreeContext';
import useTreeVirtualizer from '../../hooks/tree/useTreeVirtualizer';
import React from 'react';

export default function TreeNodes() {
    const { currentBranchId } = useTreeContext();
    const visibleNodes = useTreeVirtualizer();

    if (!visibleNodes || visibleNodes.length === 0) return null;

    return (
        <g>
            <g>
                {visibleNodes.map(([id, isAlreadyMounted]) => (
                    <Node
                        key={id}
                        currentBranchId={currentBranchId}
                        id={id}
                        isAlreadyMounted={isAlreadyMounted}
                    />
                ))}
            </g>
            <DropNodeAreas />
        </g>
    );
}
