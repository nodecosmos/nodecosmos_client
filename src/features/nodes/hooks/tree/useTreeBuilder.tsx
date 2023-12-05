import { UUID } from '../../../../types';
import {
    COMPLETE_Y_LENGTH, EDGE_LENGTH, MARGIN_LEFT, MARGIN_TOP,
} from '../../nodes.constants';
import { selectBranchChildIds, selectBranchNodes } from '../../nodes.selectors';
import { AppNode, NodeId } from '../../nodes.types';
import {
    LowerSiblingId, SiblingIndex, TreeNode, TreeNodes, UpperSiblingId,
} from '../useTreeContext';
import { useSelector } from 'react-redux';

type QueueItem = [NodeId, UpperSiblingId, LowerSiblingId, SiblingIndex];
type Queue = QueueItem[];

export default function useTreeBuilder(treeBranchId: UUID) {
    const branchNodes = useSelector(selectBranchNodes(treeBranchId));
    const branchChildIds = useSelector(selectBranchChildIds(treeBranchId));
    const treeNodes = {} as TreeNodes;

    const queue: Queue = [[treeBranchId, null, null, 0]];

    let treeIndex = 0;
    while (queue.length > 0) {
        const [currentId, upperSiblingId, lowerSiblingId, siblingIndex] = queue.pop() as QueueItem;
        const node = branchNodes[currentId];
        const { parentId } = node;
        const childIds = (branchChildIds && branchChildIds[currentId]) || [];
        const isTreeRoot = treeBranchId === currentId;

        // populate ancestor's descendantIds
        node.ancestorIds.forEach((ancestorId) => {
            const ancestor = branchNodes[ancestorId];
            if (ancestor) {
                ancestor.descendantIds.push(currentId);
            }
        });

        let isParentExpanded = false;
        let isParentMounted = false;

        if (!isTreeRoot) {
            const parent = branchNodes[parentId];
            isParentExpanded = parent.isExpanded as boolean;
            isParentMounted = parent.isMounted as boolean;
        }

        const treeNode: TreeNode = {
            childIds,
            upperSiblingId,
            lowerSiblingId,
            lastChildId: childIds[childIds.length - 1],
            isExpanded: false,
            isMounted: isTreeRoot || (isParentMounted && isParentExpanded),
            siblingIndex,
            treeIndex,
            isTreeRoot,
            descendantIds: [],
            ancestorIds: [],
            nestedLevel: 0,
            x: 0,
            y: 0,
            xEnd: 0,
            yEnd: 0,
        };

        calculatePosition(treeNodes, node);

        treeNodes[currentId] = treeNode;

        // reversely populate ancestorIds
        for (let i = childIds.length - 1; i >= 0; i -= 1) {
            const childId = childIds[i];
            const upperSiblingId = childIds[i - 1] || null;
            const lowerSiblingId = childIds[i + 1] || null;

            branchNodes[childId].ancestorIds = [...treeNode.ancestorIds, currentId];
            branchNodes[childId].nestedLevel = treeNode.ancestorIds.length + 1;

            queue.push([childId, upperSiblingId, lowerSiblingId, i]);
        }

        treeIndex += 1;
    }

    return treeNodes;
}

function calculatePosition(treeNodes: TreeNodes, node: AppNode) {
    const {
        id,
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
        const { x: parentX, y: parentY } = treeNodes[parentId];

        x = parentX + MARGIN_LEFT + EDGE_LENGTH;
        y = (upperSiblingYEnd || parentY) + COMPLETE_Y_LENGTH;
    }

    treeNodes[id].x = x;
    treeNodes[id].y = y;
    treeNodes[id].xEnd = x + EDGE_LENGTH;
    treeNodes[id].yEnd = y;

    if (node.isMounted) {
        ancestorIds.forEach((ancestorId) => {
            if (treeNodes[ancestorId]) {
                treeNodes[ancestorId].yEnd += COMPLETE_Y_LENGTH;
            }
        });
    }
}
