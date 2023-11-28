import DraggableNodePoint from './DraggableNodePoint';
import useTreeContext from '../../../hooks/tree/useTreeContext';
import useTreeNodeVirtualizer, { VirtualizedNode } from '../../../hooks/tree/useTreeNodesVirtualizer';
import { selectDragAndDrop } from '../../../nodes.selectors';
import React from 'react';
import { useSelector } from 'react-redux';

export default function DraggableNodePoints() {
    const { branchId } = useTreeContext();
    const dragAndDrop = useSelector(selectDragAndDrop);
    const treeNodeIds: VirtualizedNode[] = useTreeNodeVirtualizer(branchId);

    if (!dragAndDrop?.isDragging) return null;

    return treeNodeIds.map(([id], index) => {
        if (index === 0) return null;
        return (
            <DraggableNodePoint key={id} id={id} />
        );
    });
}
