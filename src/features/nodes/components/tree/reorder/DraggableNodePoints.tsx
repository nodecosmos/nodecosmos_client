import DraggableNodePoint from './DraggableNodePoint';
import useTreeContext from '../../../hooks/tree/useTreeContext';
import { selectDragAndDrop, selectTreeNodeIds } from '../../../nodes.selectors';
import React from 'react';
import { useSelector } from 'react-redux';

export default function DraggableNodePoints() {
    const { branchId } = useTreeContext();
    const dragAndDrop = useSelector(selectDragAndDrop);
    const treeNodeIds = useSelector(selectTreeNodeIds(branchId));

    if (!dragAndDrop?.isDragging) return null;

    return treeNodeIds.map((treeNodeId, index) => {
        if (index === 0) return null;
        return (
            <DraggableNodePoint key={treeNodeId} id={treeNodeId} />
        );
    });
}
