import { UUID } from '../../../types';
import {
    NodeSize, TreeNode, TreeNodes,
} from '../hooks/tree/useTreeContext';
import { MARGIN_LEFT, MARGIN_TOP } from '../nodes.constants';

export function calculatePosition(treeNodes: TreeNodes, node: TreeNode, size: NodeSize) {
    const {
        edgeLength,
        yLength,
    } = size;

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
        x = edgeLength;
        y = edgeLength + MARGIN_TOP;
    } else {
        const { x: parentX, y: parentY } = treeNodes[parentId as UUID];

        x = parentX + MARGIN_LEFT + edgeLength;
        y = (upperSiblingYEnd || parentY) + yLength;
    }

    node.x = x;
    node.y = y;
    node.xEnd = x + edgeLength;
    node.yEnd = y;

    if (node.isMounted) {
        ancestorIds.forEach((ancestorId) => {
            if (treeNodes[ancestorId]) {
                treeNodes[ancestorId].yEnd += yLength;
            }
        });
    }
}

export function calculatePositions(orderedTreeNodeIds: UUID[], treeNodes: TreeNodes, size: NodeSize) {
    for (let i = 0; i < orderedTreeNodeIds.length; i += 1) {
        const id = orderedTreeNodeIds[i];
        calculatePosition(treeNodes, treeNodes[id], size);
    }
}
