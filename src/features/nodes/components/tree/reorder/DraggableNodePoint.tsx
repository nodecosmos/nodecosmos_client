import useBooleanStateValue from '../../../../../common/hooks/useBooleanStateValue';
import { NodecosmosTheme } from '../../../../../themes/type';
import { UUID } from '../../../../../types';
import useNodeDropCapture from '../../../hooks/tree/reorder/useNodeDropCapture';
import useTreeContext from '../../../hooks/tree/useTreeContext';
import { selectDragAndDrop, selectNode } from '../../../nodes.selectors';
import { useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';

export default function DraggableNodePoint({ id }: { id: UUID }) {
    const theme: NodecosmosTheme = useTheme();
    const { branchId, rootNodeId } = useTreeContext();

    const {
        x: NodeX,
        y: nodeY,
        parentId,
        isTemp,
        siblingIndex,
        ancestorIds,
    } = useSelector(selectNode(branchId, rootNodeId));
    const dragAndDrop = useSelector(selectDragAndDrop);

    const onDropCapture = useNodeDropCapture();

    const [hovered, hover, leave] = useBooleanStateValue();

    const isSameParent = dragAndDrop?.parentId === parentId;

    // handle new sibling index when a node is moved down on the same level
    const newSiblingIndex = siblingIndex as number;
    let newSiblingIndexAfterMove = siblingIndex as number;

    if (dragAndDrop?.siblingIndex && siblingIndex && (dragAndDrop.siblingIndex < siblingIndex) && isSameParent) {
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
        !NodeX
        || !nodeY
        || dragAndDrop?.id === id
        || isTemp
        || (isSameParent && dragAndDrop?.siblingIndex && siblingIndex && dragAndDrop.siblingIndex === siblingIndex - 1)
        || ancestorIds.includes(dragAndDrop?.id as UUID)
    ) return null;

    const x = NodeX - 10;
    const y = newSiblingIndex === 0 ? nodeY - 20 : nodeY - 28;
    const dropZoneY = newSiblingIndex === 0 ? nodeY - 40 : y - 15;

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
                fill={theme.palette.borders[5]}
            />

            <rect
                x={x}
                y={dropZoneY}
                width="300"
                height="30"
                rx="4"
                fill={theme.palette.background[8]}
                fillOpacity={hovered ? 0.6 : 0}
            />
        </g>
    );
}

DraggableNodePoint.propTypes = { id: PropTypes.string.isRequired };
