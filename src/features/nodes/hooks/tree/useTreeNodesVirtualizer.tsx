import useIsInsideViewport from './virtualizer/useIsInsideViewport';
import { UUID } from '../../../../types';
import { selectBranchNodes, selectTreeNodeIds } from '../../nodes.selectors';
import { useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';

type NodeId = UUID;
type AlreadyMounted = boolean;
export type VirtualizedNode = [NodeId, AlreadyMounted];

export default function useTreeNodeVirtualizer(branchId: UUID): VirtualizedNode[] {
    const treeNodeIds = useSelector(selectTreeNodeIds(branchId));
    const branchNodes = useSelector(selectBranchNodes(branchId));

    const isNodeInViewport = useIsInsideViewport(branchId);

    const prevVirtualizedNodesById = useRef<Record<UUID, boolean>>({});
    const treeNodeIdsToViewRef = useRef<VirtualizedNode[]>([]);

    return useMemo(() => {
        treeNodeIdsToViewRef.current = [];

        treeNodeIds?.forEach((treeNodeId) => {
            const {
                isMounted,
                isTemp,
                parentId,
                childIds,
            } = branchNodes[treeNodeId];
            const isLastParentsChild = branchNodes[parentId]?.lastChildId === treeNodeId;
            const isInViewport = isNodeInViewport(treeNodeId);
            const hasChildInViewport = () => childIds.some((childId) => isNodeInViewport(childId));

            if (isMounted && (isInViewport || isLastParentsChild || hasChildInViewport())) {
                // prevent animation if node is already mounted,
                // so we don't animate nodes that are outside of viewport
                let alreadyMounted = prevVirtualizedNodesById.current[treeNodeId];
                if (isTemp) alreadyMounted = false;

                treeNodeIdsToViewRef.current.push([treeNodeId, alreadyMounted]);
            }

            prevVirtualizedNodesById.current[treeNodeId] = !!isMounted;
        });

        return treeNodeIdsToViewRef.current;
    }, [branchNodes, isNodeInViewport, treeNodeIds]);
}
