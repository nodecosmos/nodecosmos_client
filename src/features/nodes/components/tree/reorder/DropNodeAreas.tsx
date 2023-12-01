import DropNodeArea from './DropNodeArea';
import useTreeContext from '../../../hooks/tree/useTreeContext';
import useTreeNodeVirtualizer, { VirtualizedNode } from '../../../hooks/tree/useTreeNodesVirtualizer';
import { selectDragAndDrop } from '../../../nodes.selectors';
import React from 'react';
import { useSelector } from 'react-redux';

export default function DropNodeAreas() {
    const { treeBranchId } = useTreeContext();
    const dragAndDrop = useSelector(selectDragAndDrop);
    const treeNodeIds: VirtualizedNode[] = useTreeNodeVirtualizer(treeBranchId);

    if (!dragAndDrop) return null;

    return treeNodeIds.map(([id], index) => {
        if (index === 0) return null;
        return (
            <DropNodeArea key={id} id={id} dragAndDrop={dragAndDrop} />
        );
    });
}
