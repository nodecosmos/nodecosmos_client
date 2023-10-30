import useIsInsideViewport from './tree-nodes-virtualizer/useIsInsideViewport';
import { selectOrderedTreeNodeIds, selectTreeNodes } from '../trees.selectors';
import { useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';

export default function useTreeNodeVirtualizer(rootId) {
    const orderedTreeNodeIds = useSelector(selectOrderedTreeNodeIds(rootId));

    const treeNodes = useSelector(selectTreeNodes(rootId));
    const isNodeInViewport = useIsInsideViewport(rootId);

    const prevVirtualizedNodesById = useRef({});
    const treeNodeIdsToViewRef = useRef([]);

    return useMemo(() => {
        treeNodeIdsToViewRef.current = [];

        orderedTreeNodeIds.forEach((treeNodeId) => {
            const {
                isMounted,
                treeParentId,
                isNewlyCreated,
                treeChildIds,
            } = treeNodes[treeNodeId];
            const isLastParentsChild = treeNodes[treeParentId]?.treeLastChildId === treeNodeId;
            const isInViewport = isNodeInViewport(treeNodeId);
            const hasChildInViewport = () => treeChildIds.some((childId) => isNodeInViewport(childId));

            if (isMounted && (isInViewport || isLastParentsChild || hasChildInViewport())) {
                // prevent animation if node is already mounted,
                // so we don't animate nodes that are outside of viewport
                let isAlreadyMounted = !!prevVirtualizedNodesById.current[treeNodeId];
                if (isNewlyCreated) isAlreadyMounted = false;

                treeNodeIdsToViewRef.current.push([treeNodeId, isAlreadyMounted]);
            }

            prevVirtualizedNodesById.current[treeNodeId] = isMounted;
        });

        return treeNodeIdsToViewRef.current;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderedTreeNodeIds, isNodeInViewport]);
}
