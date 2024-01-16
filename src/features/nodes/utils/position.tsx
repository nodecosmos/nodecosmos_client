import { UUID } from '../../../types';
import { TreeNode, TreeNodes } from '../hooks/tree/useTreeContext';
import {
    COMPLETE_Y_LENGTH, EDGE_LENGTH, MARGIN_LEFT, MARGIN_TOP,
} from '../nodes.constants';

export function calculatePosition(treeNodes: TreeNodes, node: TreeNode) {
    const {
        upperSiblingId,
        parentId,
        ancestorIds,
        isTreeRoot,
    } = node;

    let upperSiblingYEnd = null;
    if (upperSiblingId) {
        upperSiblingYEnd = treeNodes[upperSiblingId].yEnd as number;
    }

    let x, y;

    if (isTreeRoot) {
        x = EDGE_LENGTH;
        y = EDGE_LENGTH + MARGIN_TOP;
    } else {
        const { x: parentX, y: parentY } = treeNodes[parentId as UUID];

        x = parentX + MARGIN_LEFT + EDGE_LENGTH;
        y = (upperSiblingYEnd || parentY) + COMPLETE_Y_LENGTH;
    }

    node.x = x;
    node.y = y;
    node.xEnd = x + EDGE_LENGTH;
    node.yEnd = y;

    if (node.isMounted) {
        ancestorIds.forEach((ancestorId) => {
            if (treeNodes[ancestorId]) {
                treeNodes[ancestorId].yEnd += COMPLETE_Y_LENGTH;
            }
        });
    }
}

export function calculatePositions(orderedTreeNodeIds: UUID[], treeNodes: TreeNodes) {
    for (let i = 0; i < orderedTreeNodeIds.length; i += 1) {
        const id = orderedTreeNodeIds[i];
        calculatePosition(treeNodes, treeNodes[id]);
    }
}
