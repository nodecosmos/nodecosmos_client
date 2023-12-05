import DropNodeArea from './DropNodeArea';
import useTreeContext from '../../../hooks/useTreeContext';
import { selectDragAndDrop, selectVisibleNodes } from '../../../nodes.selectors';
import React from 'react';
import { useSelector } from 'react-redux';

export default function DropNodeAreas() {
    const { treeBranchId } = useTreeContext();
    const visibleNodes = useSelector(selectVisibleNodes(treeBranchId));
    const dragAndDrop = useSelector(selectDragAndDrop);

    if (!dragAndDrop) return null;

    return visibleNodes?.map((id, index) => {
        if (index === 0) return null;
        return (
            <DropNodeArea key={id} id={id} dragAndDrop={dragAndDrop} />
        );
    });
}
