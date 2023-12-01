import DropNodeArea from './DropNodeArea';
import useTreeContext from '../../../hooks/tree/useTreeContext';
import { selectDragAndDrop, selectVisibleTreeNodeIds } from '../../../nodes.selectors';
import React from 'react';
import { useSelector } from 'react-redux';

export default function DropNodeAreas() {
    const { treeBranchId } = useTreeContext();
    const treeNodeIds = useSelector(selectVisibleTreeNodeIds(treeBranchId));
    const dragAndDrop = useSelector(selectDragAndDrop);

    if (!dragAndDrop) return null;

    return treeNodeIds?.map((id, index) => {
        if (index === 0) return null;
        return (
            <DropNodeArea key={id} id={id} dragAndDrop={dragAndDrop} />
        );
    });
}
