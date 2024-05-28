import Node from './node/Node';
import DropNodeAreas from './reorder/DropNodeAreas';
import useTreeContext from '../../hooks/tree/useTreeContext';
import useTreeEvents from '../../hooks/tree/useTreeEvents';
import useTreeVirtualizer from '../../hooks/tree/useTreeVirtualizer';
import React from 'react';

function TreeNodes() {
    const { branchId } = useTreeContext();
    const visibleNodes = useTreeVirtualizer();

    useTreeEvents();

    if (!visibleNodes || visibleNodes.length === 0) return null;

    return (
        <g>
            <g>
                {visibleNodes.map(([id, isAlreadyMounted]) => (
                    <Node
                        key={id}
                        branchId={branchId}
                        id={id}
                        isAlreadyMounted={isAlreadyMounted}
                    />
                ))}
            </g>
            <DropNodeAreas />
        </g>
    );
}

export default React.memo(TreeNodes);
