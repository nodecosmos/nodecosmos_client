import { UUID } from '../../../../types';
import { selectTransformablePositionAttribute } from '../../../app/app.selectors';
import { CLIENT_VIEWPORT_BUFFER_FACTOR } from '../../nodes.constants';
import { selectBranchNodes, selectTreeNodeIds } from '../../nodes.selectors';
import { useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';

type NodeId = UUID;
type AlreadyMounted = boolean;
export type VirtualizedNode = [NodeId, AlreadyMounted];

const isNodeInViewport = (y: number, scrollTop: number, clientHeight: number) => {
    const bellowTop = y > (scrollTop - clientHeight * CLIENT_VIEWPORT_BUFFER_FACTOR);
    const aboveBottom = y < (scrollTop + clientHeight * CLIENT_VIEWPORT_BUFFER_FACTOR);

    return bellowTop && aboveBottom;
};

export default function useTreeNodeVirtualizer(treeBranchId: UUID): VirtualizedNode[] {
    const treeNodeIds = useSelector(selectTreeNodeIds(treeBranchId));
    const branchNodes = useSelector(selectBranchNodes(treeBranchId));
    const scrollTop = useSelector(selectTransformablePositionAttribute(treeBranchId, 'scrollTop'));
    const clientHeight = useSelector(selectTransformablePositionAttribute(treeBranchId, 'clientHeight'));

    const prevVirtualizedNodesById = useRef<Record<UUID, boolean>>({});
    const treeNodeIdsToViewRef = useRef<VirtualizedNode[]>([]);

    return useMemo(() => {
        treeNodeIdsToViewRef.current = [];

        treeNodeIds?.forEach((treeNodeId) => {
            const {
                y,
                isMounted,
                parentId,
                childIds,
                isJustCreated,
            } = branchNodes[treeNodeId];
            const isLastParentsChild = branchNodes[parentId]?.lastChildId === treeNodeId;
            const isInViewport = isNodeInViewport(y, scrollTop, clientHeight);
            const hasChildInViewport = () => childIds.some((childId) => {
                const { y: childY } = branchNodes[childId];

                return isNodeInViewport(childY, scrollTop, clientHeight);
            });

            if (isMounted && (isInViewport || isLastParentsChild || hasChildInViewport())) {
                // prevent animation if node is already mounted,
                // so we don't animate nodes that are outside of viewport
                const alreadyMounted = isJustCreated || prevVirtualizedNodesById.current[treeNodeId];

                treeNodeIdsToViewRef.current.push([treeNodeId, alreadyMounted]);
            }

            prevVirtualizedNodesById.current[treeNodeId] = !!isMounted;
        });

        return treeNodeIdsToViewRef.current;
    }, [branchNodes, clientHeight, scrollTop, treeNodeIds]);
}
