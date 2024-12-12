import useBooleanStateValue from '../../../../../common/hooks/useBooleanStateValue';
import { NodecosmosTheme } from '../../../../../themes/themes.types';
import { UUID } from '../../../../../types';
import useReorder from '../../../hooks/tree/useReorder';
import useTreeContext from '../../../hooks/tree/useTreeContext';
import { selectNode } from '../../../nodes.selectors';
import { DragAndDrop } from '../../../nodes.types';
import { useTheme } from '@mui/material';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';

export interface DropNodeAreaProps {
    id: UUID;
    dragAndDrop: DragAndDrop;
}

function DropNodeArea(props: DropNodeAreaProps) {
    const { id, dragAndDrop } = props;
    const {
        id: dragAndDropId,
        parentId: dragAndDropParentId,
        siblingIndex: dragAndDropSiblingIndex,
    } = dragAndDrop;
    const {
        branchId, treeNodes, size,
    } = useTreeContext();
    const {
        parentId,
        isTmp,
    } = useSelector(selectNode(branchId, id));
    const {
        upperSiblingId,
        siblingIndex,
        ancestorIds,
        x: nodeX,
        y: nodeY,
    } = treeNodes[id];
    const theme: NodecosmosTheme = useTheme();
    const onDropCapture = useReorder();
    const [hovered, hover, leave] = useBooleanStateValue();
    const isSameParent = dragAndDropParentId === parentId;
    const { dropIndicatorYOffset } = size;

    // handle new sibling index when a node is moved down on the same level
    const newSiblingIndex = siblingIndex as number;
    let newSiblingIndexAfterMove = siblingIndex as number;

    if ((dragAndDropSiblingIndex < newSiblingIndex) && isSameParent) {
        newSiblingIndexAfterMove -= 1;
    }

    const onDragOver = useCallback((e: React.DragEvent<SVGElement>) => {
        e.preventDefault();
        hover();
    }, [hover]);

    const onDrop = useCallback(async () => {
        await onDropCapture({
            newParentId: parentId,
            newSiblingIndex,
            newSiblingIndexAfterMove,
        });
    }, [newSiblingIndex, newSiblingIndexAfterMove, onDropCapture, parentId]);

    if (
        siblingIndex === undefined
        || !nodeX
        || !nodeY
        || dragAndDropId === id
        || isTmp
        || (isSameParent && dragAndDropSiblingIndex === (siblingIndex - 1))
        || ancestorIds.includes(dragAndDropId)
        || upperSiblingId?.includes('tmp')
    ) return null;

    const x = nodeX - 10;
    const y = newSiblingIndex === 0
        ? nodeY - dropIndicatorYOffset + 3 : nodeY - dropIndicatorYOffset;
    const dropZoneY = y - dropIndicatorYOffset / 2 - (newSiblingIndex === 0 ? 4 : 2);

    return (
        <g
            onDragOver={onDragOver}
            onDragLeave={leave}
            onDropCapture={onDrop}
        >
            <rect
                x={x}
                y={y}
                width="20"
                height="5"
                rx="2"
                fill={theme.palette.backgrounds[8]}
            />

            <rect
                x={x - 10}
                y={dropZoneY}
                width="300"
                height="30"
                rx="4"
                fill={theme.palette.backgrounds[8]}
                fillOpacity={hovered ? 0.6 : 0}
            />
        </g>
    );
}

export default React.memo(DropNodeArea);
