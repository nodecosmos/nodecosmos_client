import {
    LowerSiblingId, NodeSize, SiblingIndex, TreeNode, TreeNodes, UpperSiblingId,
} from './useTreeContext';
import { UUID } from '../../../../types';
import { TRANSFORMABLE_ID } from '../../../app/constants';
import { setNodeScrollTo } from '../../nodes.actions';
import {
    selectBranchChildIds, selectExpandedNodes, selectNode, selectScrollTo,
} from '../../nodes.selectors';
import { TreeType } from '../../nodes.types';
import { calculatePosition } from '../../utils/position';
import {
    useCallback, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

type QueueItem = {
    currentId: UUID;
    parentId: UUID | null;
    upperSiblingId: UpperSiblingId;
    lowerSiblingId: LowerSiblingId;
    siblingIndex: SiblingIndex;
    ancestorIds: UUID[];
};
type Queue = QueueItem[];

export interface Tree {
    treeNodes: TreeNodes;
    orderedTreeNodeIds: UUID[];
    setTreeNodes: (treeNodes: TreeNodes) => void;
    buildTree: () => void;
}

type Props = {
    treeRootId: UUID;
    branchId: UUID;
    type: TreeType;
    size: NodeSize;
};

export default function useTreeBuilder(props: Props): Tree {
    const {
        treeRootId,
        branchId,
        type,
        size,
    } = props;
    const { ancestorIds } = useSelector(selectNode(branchId, treeRootId));
    const branchChildIds = useSelector(selectBranchChildIds(branchId));
    const scrollToId = useSelector(selectScrollTo);
    const dispatch = useDispatch();
    const expandedNodes = useSelector(selectExpandedNodes);

    const [treeState, setTreeState] = useState({
        treeNodes: {} as TreeNodes,
        orderedTreeNodeIds: [] as UUID[],
    });

    useEffect(() => {
        if (scrollToId) {
            const transformable = document.getElementById(TRANSFORMABLE_ID);
            const node = treeState.treeNodes[scrollToId];

            if (transformable && node) {
                transformable.scrollTop = node.y - 50;
                transformable.scrollLeft = node.x - 50;

                dispatch(setNodeScrollTo(null));
            }
        }
    }, [dispatch, scrollToId, treeState.treeNodes]);

    const buildTree = useCallback(() => {
        if (!branchChildIds) return;

        const treeNodes = { ...treeState.treeNodes };
        const orderedTreeNodeIds: UUID[] = [];

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
                || (treeNodes[currentId] ? treeNodes[currentId].isExpanded : false)
                || expandedNodes.has(currentId);
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
            calculatePosition(treeNodes, treeNode, size);

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

        // we use `treeNodes` to build tree, but we don't rebuild it if structure is not changed,
        // so we don't need to observe treeNodes here
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ancestorIds, branchChildIds, treeRootId, size]);

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
        buildTree,
    };
}
