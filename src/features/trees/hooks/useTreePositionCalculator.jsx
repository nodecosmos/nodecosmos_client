import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import {
    COMPLETE_Y_LENGTH, EDGE_LENGTH, MARGIN_LEFT, MARGIN_TOP,
} from '../trees.constants';
/* nodecosmos */
import { selectOrderedTreeNodeIds, selectTreeNodes } from '../trees.selectors';

export default function useTreePositionCalculator(rootId) {
    const treeNodes = useSelector(selectTreeNodes(rootId));
    const orderedTreeNodeIds = useSelector(selectOrderedTreeNodeIds(rootId));

    return useMemo(() => {
        if (!treeNodes || !orderedTreeNodeIds.length) return {};

        const currentPositionsById = {};

        // calculates the position of a node based on its parent's or upper sibling's position
        orderedTreeNodeIds.forEach((treeNodeId) => {
            const node = treeNodes[treeNodeId];

            const {
                treeUpperSiblingId,
                treeParentId,
                treeAncestorIds,
                isRoot,
            } = node;

            const parentX = currentPositionsById[treeParentId]?.x; // only the root node has no parent
            const parentY = currentPositionsById[treeParentId]?.y;

            const upperSiblingYEnd = currentPositionsById[treeUpperSiblingId]
        && currentPositionsById[treeUpperSiblingId].yEnd;

            const position = {};

            if (isRoot) {
                position.x = EDGE_LENGTH;
                position.y = EDGE_LENGTH + MARGIN_TOP;
            } else {
                position.x = parentX + MARGIN_LEFT + EDGE_LENGTH;
                position.y = (upperSiblingYEnd || parentY) + COMPLETE_Y_LENGTH;
            }

            position.xEnd = position.x + EDGE_LENGTH;
            position.yEnd = position.y;

            if (node.isMounted) {
                treeAncestorIds.forEach((ancestorId) => {
                    currentPositionsById[ancestorId].yEnd += COMPLETE_Y_LENGTH;
                });
            }

            currentPositionsById[treeNodeId] = position;
        });

        return currentPositionsById;
    }, [orderedTreeNodeIds, treeNodes]);
}
