import DropNodeArea from './DropNodeArea';
import useNodeVirtualizer from '../../../hooks/tree/useNodeVirtualizer';
import { selectDragAndDrop } from '../../../nodes.selectors';
import React from 'react';
import { useSelector } from 'react-redux';

export default function DropNodeAreas() {
    const visibleNodes = useNodeVirtualizer();
    const dragAndDrop = useSelector(selectDragAndDrop);

    if (!dragAndDrop) return null;

    return visibleNodes?.map(([id], index) => {
        if (index === 0) return null;
        return (
            <DropNodeArea key={id} id={id} dragAndDrop={dragAndDrop} />
        );
    });
}
