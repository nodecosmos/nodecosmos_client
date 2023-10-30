import { selectNodeAttribute } from '../../../nodes/nodes.selectors';
import useNodeDropCapture from '../../hooks/reorderer/useNodeDropCapture';
import useTreeContext from '../../hooks/useTreeContext';
import {
    selectDragAndDrop, selectPosition, selectTreeNodeAttribute,
} from '../../trees.selectors';
import { useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export default function DraggableNodePoint({ treeNodeId }) {
    const theme = useTheme();
    const { rootNodeId } = useTreeContext();

    const { x: NodeX, y: nodeY } = useSelector(selectPosition(rootNodeId, treeNodeId));
    const dragAndDrop = useSelector(selectDragAndDrop);
    const nodeId = useSelector(selectTreeNodeAttribute(treeNodeId, 'nodeId'));
    const siblingIndex = useSelector(selectTreeNodeAttribute(treeNodeId, 'treeSiblingIndex'));
    const treeAncestorIds = useSelector(selectTreeNodeAttribute(treeNodeId, 'treeAncestorIds'));
    const parentId = useSelector(selectNodeAttribute(nodeId, 'parentId'));
    const isTemp = useSelector(selectNodeAttribute(nodeId, 'isTemp'));
    const draggedNodeSiblingIndex = useSelector(selectTreeNodeAttribute(dragAndDrop.treeNodeId, 'treeSiblingIndex'));

    const onDropCapture = useNodeDropCapture();

    const [hovered, setHovered] = useState(false);

    const isSameParent = dragAndDrop.parentId === parentId;

    // handle new sibling index when a node is moved down on the same level
    const newSiblingIndex = siblingIndex;
    let newSiblingIndexAfterMove = siblingIndex;

    if ((draggedNodeSiblingIndex < siblingIndex) && isSameParent) {
        newSiblingIndexAfterMove -= 1;
    }

    if (
        !NodeX
    || !nodeY
    || dragAndDrop.treeNodeId === treeNodeId
    || isTemp
    || (isSameParent && draggedNodeSiblingIndex === siblingIndex - 1)
    || treeAncestorIds.includes(dragAndDrop.treeNodeId)
    ) return null;

    const x = NodeX - 10;
    const y = newSiblingIndex === 0 ? nodeY - 20 : nodeY - 28;
    const dropZoneY = newSiblingIndex === 0 ? nodeY - 40 : y - 15;

    return (
        <g
            onDragOver={(e) => {
                e.preventDefault();
                setHovered(true);
            }}
            onDragLeave={() => setHovered(false)}
            onDropCapture={() => {
                onDropCapture({
                    newParentId: parentId,
                    newSiblingIndex,
                    newSiblingIndexAfterMove,
                });
            }}
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

DraggableNodePoint.propTypes = {
    treeNodeId: PropTypes.string.isRequired,
};
