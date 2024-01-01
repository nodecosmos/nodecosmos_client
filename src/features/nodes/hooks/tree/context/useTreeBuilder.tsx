import { calculatePosition } from './position';
import { UUID } from '../../../../../types';
import { selectBranchChildIds, selectNodeAttribute } from '../../../nodes.selectors';
import { NodeId, TreeType } from '../../../nodes.types';
import {
    LowerSiblingId, SiblingIndex, TreeNode, TreeNodes, UpperSiblingId,
} from '../useTreeContext';
import {
    useCallback, useEffect, useState,
} from 'react';
import { useSelector } from 'react-redux';

type QueueItem = {
    currentId: NodeId;
    parentId: NodeId | null;
    upperSiblingId: UpperSiblingId;
    lowerSiblingId: LowerSiblingId;
    siblingIndex: SiblingIndex;
    ancestorIds: NodeId[];
};
type Queue = QueueItem[];

interface Tree {
    treeNodes: TreeNodes;
    orderedTreeNodeIds: NodeId[];
    setTreeNodes: (treeNodes: TreeNodes) => void;
}

type Props = {
    treeRootId: UUID;
    treeBranchId: UUID;
    type: TreeType;
};

export default function useTreeBuilder(props: Props): Tree {
    const {
        treeRootId,
        treeBranchId,
        type,
    } = props;
    const ancestorIds = useSelector(selectNodeAttribute(treeBranchId, treeRootId, 'ancestorIds'));
    const branchChildIds = useSelector(selectBranchChildIds(treeBranchId));
    const [treeState, setTreeState] = useState({
        treeNodes: {} as TreeNodes,
        orderedTreeNodeIds: [] as NodeId[],
    });

    useEffect(() => {
        if (!branchChildIds) return;

        const treeNodes = { ...treeState.treeNodes };
        const orderedTreeNodeIds: NodeId[] = [];

        const queue: Queue = [{
            currentId: treeRootId,
            parentId: null,
            upperSiblingId: null,
            lowerSiblingId: null,
            siblingIndex: 0,
            ancestorIds: ancestorIds ? ancestorIds : [],
        }];

        let treeIndex = 0;

        while (queue.length > 0) {
            const {
                currentId,
                parentId,
                upperSiblingId,
                lowerSiblingId,
                siblingIndex,
                ancestorIds,
            } = queue.pop() as QueueItem;
            const isTreeRoot = treeRootId === currentId;
            const isCheckbox = type === TreeType.Checkbox;
            const isExpanded = isCheckbox
                || isTreeRoot
                || (treeNodes[currentId] ? treeNodes[currentId].isExpanded : false);
            orderedTreeNodeIds.push(currentId);
            const childIds = (branchChildIds && branchChildIds[currentId]) || [];

            let isParentExpanded = false;
            let isParentMounted = false;

            if (!isTreeRoot && parentId) {
                isParentExpanded = isCheckbox || treeNodes[parentId].isExpanded as boolean;
                isParentMounted = isCheckbox || treeNodes[parentId].isMounted as boolean;
            }

            // populate ancestor's descendantIds
            ancestorIds.forEach((ancestorId) => {
                const ancestor = treeNodes[ancestorId];
                if (ancestor) {
                    ancestor.descendantIds.push(currentId);
                }
            });

            const treeNode: TreeNode = {
                id: currentId,
                parentId: parentId || undefined,
                childIds,
                treeRootId,
                upperSiblingId,
                lowerSiblingId,
                lastChildId: childIds[childIds.length - 1],
                isExpanded,
                isMounted: isTreeRoot || (isParentMounted && isParentExpanded),
                siblingIndex,
                treeIndex,
                isTreeRoot,
                ancestorIds,
                nestedLevel: ancestorIds.length,
                descendantIds: [],
                x: 0,
                y: 0,
                xEnd: 0,
                yEnd: 0,
            };

            treeNodes[currentId] = treeNode;
            calculatePosition(treeNodes, treeNode);

            // reversely populate ancestorIds
            for (let i = childIds.length - 1; i >= 0; i -= 1) {
                const childId = childIds[i];
                const upperSiblingId = childIds[i - 1] || null;
                const lowerSiblingId = childIds[i + 1] || null;
                const ancestorIds = [...treeNode.ancestorIds, currentId];

                queue.push({
                    currentId: childId,
                    parentId: currentId,
                    upperSiblingId,
                    lowerSiblingId,
                    siblingIndex: i,
                    ancestorIds,
                });
            }

            treeIndex += 1;
        }

        setTreeState({
            treeNodes,
            orderedTreeNodeIds,
        });

        // we use this to build tree, but we don't rebuild it if structure is not changed,
        // so we don't need to observe treeNodes here
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ancestorIds, branchChildIds, treeRootId]);

    const setTreeNodes = useCallback((treeNodes: TreeNodes) => {
        setTreeState((prev) => ({
            ...prev,
            treeNodes,
        }));
    }, []);

    return {
        treeNodes: treeState.treeNodes,
        orderedTreeNodeIds: treeState.orderedTreeNodeIds,
        setTreeNodes,
    };
}
