import DraggableNodePoint from './DraggableNodePoint';
import useTreeContext from '../../hooks/useTreeContext';
import useTreeNodeVirtualizer from '../../hooks/useTreeNodesVirtualizer';
import { selectDragAndDrop } from '../../trees.selectors';
import React from 'react';
import { useSelector } from 'react-redux';

export default function DraggableNodePoints() {
    const { rootNodeId } = useTreeContext();
    const dragAndDrop = useSelector(selectDragAndDrop);
    const treeNodeIdsToView = useTreeNodeVirtualizer(rootNodeId);

    if (!dragAndDrop.isDragging) return null;

    return treeNodeIdsToView.map(([treeNodeId, isAlreadyMounted], index) => {
        if (index === 0) return null;
        return (
            <DraggableNodePoint
                key={treeNodeId}
                treeNodeId={treeNodeId}
                isAlreadyMounted={isAlreadyMounted}
            />
        );
    });
}
