import DropNodeArea from './DropNodeArea';
import useTreeVirtualizer from '../../../hooks/tree/useTreeVirtualizer';
import { selectDragAndDrop } from '../../../nodes.selectors';
import React from 'react';
import { useSelector } from 'react-redux';

export default function DropNodeAreas() {
    const visibleNodes = useTreeVirtualizer();
    const dragAndDrop = useSelector(selectDragAndDrop);

    if (!dragAndDrop) return null;

    return visibleNodes?.map(([id], index) => {
        if (index === 0) return null;
        return (
            <DropNodeArea key={id} id={id} dragAndDrop={dragAndDrop} />
        );
    });
}
